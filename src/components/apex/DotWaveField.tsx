import { useEffect, useRef } from "react";

const DotWaveField = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let startTime = performance.now();

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = canvas.offsetWidth * dpr;
      canvas.height = canvas.offsetHeight * dpr;
      ctx.scale(dpr, dpr);
    };
    resize();
    window.addEventListener("resize", resize);

    const cols = 50;
    const rows = 30;

    const draw = (now: number) => {
      const t = (now - startTime) * 0.0004;
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      const dpr = window.devicePixelRatio || 1;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);

      const spacingX = w / (cols - 1);
      const spacingY = h / (rows - 1);

      // Read CSS variable for primary color
      const style = getComputedStyle(canvas);
      const primary = style.getPropertyValue("--primary").trim();

      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const baseX = col * spacingX;
          const baseY = row * spacingY;

          // Normalized positions
          const nx = col / cols;
          const ny = row / rows;

          // Wave distortion
          const wave1 = Math.sin(nx * 6 + ny * 3 + t * 1.2) * 8;
          const wave2 = Math.cos(ny * 5 - nx * 2 + t * 0.8) * 6;
          const wave3 = Math.sin((nx + ny) * 4 + t * 0.6) * 4;

          const x = baseX + wave1 + wave3;
          const y = baseY + wave2;

          // Size modulation: halftone density effect
          const sizeWave =
            Math.sin(nx * 8 + ny * 4 + t * 1.0) * 0.5 +
            Math.cos(ny * 6 - nx * 3 + t * 0.7) * 0.3 +
            Math.sin((nx - ny) * 5 + t * 1.3) * 0.2;

          const size = Math.max(0.3, 1 + sizeWave * 2.5);

          // Opacity: fade edges, modulate with waves
          const edgeFadeX = Math.min(nx, 1 - nx) * 4;
          const edgeFadeY = Math.min(ny, 1 - ny) * 4;
          const edgeFade = Math.min(1, Math.min(edgeFadeX, edgeFadeY));
          const opacityWave = 0.15 + (0.5 + sizeWave * 0.5) * 0.45;
          const opacity = opacityWave * edgeFade;

          if (opacity < 0.02 || size < 0.2) continue;

          ctx.beginPath();
          ctx.arc(x, y, size, 0, Math.PI * 2);
          ctx.fillStyle = `hsl(${primary} / ${opacity})`;
          ctx.fill();
        }
      }

      animId = requestAnimationFrame(draw);
    };

    animId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div className="pointer-events-none absolute top-0 right-0 h-full w-1/2" style={{ perspective: '800px' }}>
      <canvas
        ref={canvasRef}
        className="h-full w-full"
        style={{ transform: 'rotateX(25deg) rotateY(-15deg) rotateZ(2deg)', transformOrigin: 'center center' }}
      />
    </div>
  );
};

export default DotWaveField;
