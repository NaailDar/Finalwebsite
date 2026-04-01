import { useEffect, useRef, useCallback } from "react";

const PARTICLE_COUNT = 120;
const TRANSITION_DURATION = 3000; // ms chaos→order
const HOLD_DURATION = 2000; // ms hold ordered state
const CHAOS_HOLD = 1500; // ms hold chaos before re-transitioning

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  targetX: number;
  targetY: number;
  radius: number;
}

const ChaosToOrderParticles = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animRef = useRef<number>(0);
  const isInViewRef = useRef(false);
  const phaseRef = useRef<"chaos" | "transitioning" | "ordered" | "resetting">("chaos");
  const phaseStartRef = useRef<number>(0);
  const tRef = useRef(0); // current transition progress 0-1

  const initParticles = useCallback((w: number, h: number) => {
    const pad = 20;
    const innerW = w - pad * 2;
    const innerH = h - pad * 2;

    const cols = Math.ceil(Math.sqrt(PARTICLE_COUNT * (innerW / innerH)));
    const rows = Math.ceil(PARTICLE_COUNT / cols);
    const cellW = innerW / cols;
    const cellH = innerH / rows;

    const particles: Particle[] = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const col = i % cols;
      const row = Math.floor(i / cols);
      particles.push({
        x: pad + Math.random() * innerW,
        y: pad + Math.random() * innerH,
        vx: (Math.random() - 0.5) * 3,
        vy: (Math.random() - 0.5) * 3,
        targetX: pad + col * cellW + cellW / 2,
        targetY: pad + row * cellH + cellH / 2,
        radius: 2 + Math.random() * 1.5,
      });
    }
    return particles;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const parentEl = canvas.parentElement;
    if (!parentEl) return;

    const resize = () => {
      const rect = parentEl.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      particlesRef.current = initParticles(rect.width, rect.height);
    };

    resize();
    phaseRef.current = "chaos";
    phaseStartRef.current = performance.now();

    const ro = new ResizeObserver(resize);
    ro.observe(parentEl);

    // IntersectionObserver — trigger when fully in view
    const io = new IntersectionObserver(
      ([entry]) => {
        const wasInView = isInViewRef.current;
        isInViewRef.current = entry.isIntersecting;

        // When section comes fully into view and we're in chaos, start transitioning
        if (!wasInView && entry.isIntersecting && phaseRef.current === "chaos") {
          phaseRef.current = "transitioning";
          phaseStartRef.current = performance.now();
        }
      },
      { threshold: 0.7 }
    );
    io.observe(parentEl);

    const animate = (now: number) => {
      const rect = parentEl.getBoundingClientRect();
      if (!rect) { animRef.current = requestAnimationFrame(animate); return; }

      const w = rect.width;
      const h = rect.height;
      const phaseElapsed = now - phaseStartRef.current;

      // Phase state machine
      if (phaseRef.current === "transitioning") {
        const rawT = Math.min(phaseElapsed / TRANSITION_DURATION, 1);
        tRef.current = rawT < 0.5
          ? 4 * rawT * rawT * rawT
          : 1 - Math.pow(-2 * rawT + 2, 3) / 2;
        if (rawT >= 1) {
          phaseRef.current = "ordered";
          phaseStartRef.current = now;
        }
      } else if (phaseRef.current === "ordered") {
        tRef.current = 1;
        if (phaseElapsed >= HOLD_DURATION) {
          phaseRef.current = "resetting";
          phaseStartRef.current = now;
        }
      } else if (phaseRef.current === "resetting") {
        const rawT = Math.min(phaseElapsed / TRANSITION_DURATION, 1);
        const eased = rawT < 0.5
          ? 4 * rawT * rawT * rawT
          : 1 - Math.pow(-2 * rawT + 2, 3) / 2;
        tRef.current = 1 - eased;
        if (rawT >= 1) {
          phaseRef.current = "chaos";
          phaseStartRef.current = now;
        }
      } else {
        // chaos phase
        tRef.current = 0;
        // If in view and chaos has held long enough, start transitioning again
        if (isInViewRef.current && phaseElapsed >= CHAOS_HOLD) {
          phaseRef.current = "transitioning";
          phaseStartRef.current = now;
        }
      }

      const t = tRef.current;

      ctx.clearRect(0, 0, w, h);

      const particles = particlesRef.current;
      const pad = 20;

      for (const p of particles) {
        const chaosScale = 1 - t;
        p.vx += (Math.random() - 0.5) * 0.8 * chaosScale;
        p.vy += (Math.random() - 0.5) * 0.8 * chaosScale;
        p.vx *= 0.96;
        p.vy *= 0.96;
        const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        const maxSpeed = 2.5 * chaosScale + 0.01;
        if (speed > maxSpeed) {
          p.vx = (p.vx / speed) * maxSpeed;
          p.vy = (p.vy / speed) * maxSpeed;
        }

        const chaosX = p.x + p.vx;
        const chaosY = p.y + p.vy;

        if (chaosX < pad || chaosX > w - pad) p.vx *= -1;
        if (chaosY < pad || chaosY > h - pad) p.vy *= -1;

        p.x = Math.max(pad, Math.min(w - pad, chaosX));
        p.y = Math.max(pad, Math.min(h - pad, chaosY));

        const drawX = p.x + (p.targetX - p.x) * t;
        const drawY = p.y + (p.targetY - p.y) * t;

        const alpha = 0.2 + t * 0.5;

        ctx.beginPath();
        ctx.arc(drawX, drawY, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(174, 42%, 45%, ${alpha})`;
        ctx.fill();
      }

      // Draw connections in ordered state
      if (t > 0.6) {
        const connAlpha = (t - 0.6) / 0.4 * 0.15;
        ctx.strokeStyle = `hsla(174, 42%, 45%, ${connAlpha})`;
        ctx.lineWidth = 0.5;
        for (let i = 0; i < particles.length; i++) {
          const a = particles[i];
          const ax = a.x + (a.targetX - a.x) * t;
          const ay = a.y + (a.targetY - a.y) * t;
          for (let j = i + 1; j < particles.length; j++) {
            const b = particles[j];
            const bx = b.x + (b.targetX - b.x) * t;
            const by = b.y + (b.targetY - b.y) * t;
            const dist = Math.sqrt((ax - bx) ** 2 + (ay - by) ** 2);
            if (dist < 50) {
              ctx.beginPath();
              ctx.moveTo(ax, ay);
              ctx.lineTo(bx, by);
              ctx.stroke();
            }
          }
        }
      }

      animRef.current = requestAnimationFrame(animate);
    };

    animRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animRef.current);
      ro.disconnect();
      io.disconnect();
    };
  }, [initParticles]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 h-full w-full"
      style={{ pointerEvents: "none" }}
    />
  );
};

export default ChaosToOrderParticles;
