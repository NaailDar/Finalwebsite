import { useEffect, useRef } from "react";

export type TesseractVariant = "alice" | "solutions" | "infrastructure" | "security" | "insights" | "bespoke";

// ─── Shape definitions ───

// "A" wireframe for ALICE
const depth = 0.3;
const frontOuter: [number, number, number][] = [
  [-0.6, 1, -depth], [-0.2, 1, -depth], [-0.05, 0.45, -depth],
  [0.05, 0.45, -depth], [0.2, 1, -depth], [0.6, 1, -depth], [0.0, -1, -depth],
];
const frontCross: [number, number, number][] = [
  [-0.35, 0.55, -depth], [0.35, 0.55, -depth], [0.3, 0.35, -depth], [-0.3, 0.35, -depth],
];
const backOuter: [number, number, number][] = frontOuter.map(([x, y]) => [x, y, depth]);
const backCross: [number, number, number][] = frontCross.map(([x, y]) => [x, y, depth]);

const aliceVertices: [number, number, number][] = [...frontOuter, ...frontCross, ...backOuter, ...backCross];
const aliceEdges: [number, number][] = [
  [0, 6], [6, 5], [0, 1], [4, 5], [1, 6], [4, 6], [1, 2], [3, 4],
  [7, 8], [8, 9], [9, 10], [10, 7],
  [11, 17], [17, 16], [11, 12], [15, 16], [12, 17], [15, 17], [12, 13], [14, 15],
  [18, 19], [19, 20], [20, 21], [21, 18],
  [0, 11], [1, 12], [2, 13], [3, 14], [4, 15], [5, 16], [6, 17],
  [7, 18], [8, 19], [9, 20], [10, 21],
];
const aliceInternal: [number, number][] = [
  [0, 17], [5, 17], [6, 11], [6, 16], [2, 14], [3, 13], [7, 20], [10, 19],
  [1, 17], [4, 17],
  [6, 2], [6, 3], [6, 7], [6, 10], [6, 9], [6, 8],
  [0, 10], [5, 9], [1, 7], [4, 8],
  [17, 13], [17, 14], [17, 18], [17, 21], [17, 20], [17, 19],
  [11, 21], [16, 20], [12, 18], [15, 19],
  [0, 12], [5, 15], [1, 11], [4, 16],
  [2, 21], [3, 18], [7, 14], [10, 13],
  [9, 18], [8, 21], [0, 18], [5, 21],
  [1, 13], [4, 14], [11, 7], [16, 8],
  [12, 10], [15, 9], [0, 14], [5, 13],
  [0, 13], [5, 14], [1, 14], [4, 13],
  [2, 18], [3, 21], [7, 21], [10, 18],
  [0, 21], [5, 18], [11, 10], [16, 7],
  [12, 9], [15, 8], [11, 8], [16, 9],
  [1, 18], [4, 21], [12, 7], [15, 10],
];

// Icosahedron for Solutions (people/roles — organic, multi-faceted)
function makeIcosahedron(): { vertices: [number, number, number][]; edges: [number, number][]; internal: [number, number][] } {
  const t = (1 + Math.sqrt(5)) / 2;
  const s = 0.6;
  const v: [number, number, number][] = [
    [-1, t, 0], [1, t, 0], [-1, -t, 0], [1, -t, 0],
    [0, -1, t], [0, 1, t], [0, -1, -t], [0, 1, -t],
    [t, 0, -1], [t, 0, 1], [-t, 0, -1], [-t, 0, 1],
  ].map(([x, y, z]) => [x * s, y * s, z * s] as [number, number, number]);
  
  const faces: [number, number, number][] = [
    [0, 11, 5], [0, 5, 1], [0, 1, 7], [0, 7, 10], [0, 10, 11],
    [1, 5, 9], [5, 11, 4], [11, 10, 2], [10, 7, 6], [7, 1, 8],
    [3, 9, 4], [3, 4, 2], [3, 2, 6], [3, 6, 8], [3, 8, 9],
    [4, 9, 5], [2, 4, 11], [6, 2, 10], [8, 6, 7], [9, 8, 1],
  ];
  
  const edgeSet = new Set<string>();
  const edges: [number, number][] = [];
  for (const [a, b, c] of faces) {
    for (const [i, j] of [[a, b], [b, c], [a, c]] as [number, number][]) {
      const key = `${Math.min(i, j)}-${Math.max(i, j)}`;
      if (!edgeSet.has(key)) { edgeSet.add(key); edges.push([i, j]); }
    }
  }
  
  // Internal: connect opposite vertices through center
  const internal: [number, number][] = [
    [0, 3], [1, 2], [4, 7], [5, 6], [8, 11], [9, 10],
    [0, 4], [1, 11], [2, 8], [3, 5], [6, 9], [7, 10],
  ];
  
  return { vertices: v, edges, internal };
}

// Tesseract (4D hypercube) for Infrastructure (systems, architecture)
function makeTesseract(): { vertices: [number, number, number][]; edges: [number, number][]; internal: [number, number][] } {
  const s = 0.55;
  // Generate 4D hypercube vertices, project to 3D
  const verts4d: number[][] = [];
  for (let i = 0; i < 16; i++) {
    verts4d.push([
      (i & 1 ? 1 : -1) * s,
      (i & 2 ? 1 : -1) * s,
      (i & 4 ? 1 : -1) * s,
      (i & 8 ? 1 : -1) * s,
    ]);
  }
  
  // Project 4D to 3D via perspective
  const w_dist = 3;
  const vertices: [number, number, number][] = verts4d.map(([x, y, z, w]) => {
    const scale = w_dist / (w_dist + w);
    return [x * scale, y * scale, z * scale] as [number, number, number];
  });
  
  // Edges: connect vertices that differ in exactly one coordinate
  const edges: [number, number][] = [];
  for (let i = 0; i < 16; i++) {
    for (let j = i + 1; j < 16; j++) {
      const diff = i ^ j;
      if (diff === 1 || diff === 2 || diff === 4 || diff === 8) {
        edges.push([i, j]);
      }
    }
  }
  
  // Internal: face diagonals
  const internal: [number, number][] = [];
  for (let i = 0; i < 16; i++) {
    for (let j = i + 1; j < 16; j++) {
      const diff = i ^ j;
      const bits = diff.toString(2).split("").filter(b => b === "1").length;
      if (bits === 2) internal.push([i, j]);
    }
  }
  
  return { vertices, edges, internal };
}

// Lock wireframe for Security
function makeLock(): { vertices: [number, number, number][]; edges: [number, number][]; internal: [number, number][] } {
  const vertices: [number, number, number][] = [];
  const edges: [number, number][] = [];
  const internal: [number, number][] = [];

  const d = 0.25; // depth

  // Body: rectangle (indices 0-7, front 0-3, back 4-7)
  const bw = 0.7, bh = 0.55;
  const by = 0.25; // body top y (negative = up)
  // front face: TL, TR, BR, BL
  vertices.push([-bw, -by, -d]);       // 0
  vertices.push([bw, -by, -d]);        // 1
  vertices.push([bw, -by + bh * 2, -d]); // 2
  vertices.push([-bw, -by + bh * 2, -d]); // 3
  // back face
  vertices.push([-bw, -by, d]);        // 4
  vertices.push([bw, -by, d]);         // 5
  vertices.push([bw, -by + bh * 2, d]); // 6
  vertices.push([-bw, -by + bh * 2, d]); // 7

  // Body edges
  edges.push([0, 1], [1, 2], [2, 3], [3, 0]); // front
  edges.push([4, 5], [5, 6], [6, 7], [7, 4]); // back
  edges.push([0, 4], [1, 5], [2, 6], [3, 7]); // connecting

  // Shackle: semicircular arch (indices 8+)
  const shackleR = 0.45;
  const shackleBase = -by;
  const segments = 12;
  const frontArc: number[] = [];
  const backArc: number[] = [];

  for (let i = 0; i <= segments; i++) {
    const angle = Math.PI * (i / segments);
    const x = shackleR * Math.cos(angle);
    const y = shackleBase - shackleR * Math.sin(angle);
    const fi = vertices.length;
    vertices.push([x, y, -d * 0.6]);
    frontArc.push(fi);
    const bi = vertices.length;
    vertices.push([x, y, d * 0.6]);
    backArc.push(bi);
  }

  // Shackle edges
  for (let i = 0; i < segments; i++) {
    edges.push([frontArc[i], frontArc[i + 1]]);
    edges.push([backArc[i], backArc[i + 1]]);
  }
  // Connect front/back arcs
  for (let i = 0; i <= segments; i++) {
    edges.push([frontArc[i], backArc[i]]);
  }

  // Keyhole: small diamond in center of body (internal lines)
  const ky = -by + bh;
  const ks = 0.12;
  const ki = vertices.length;
  vertices.push([0, ky - ks * 1.5, -d * 0.5]); // top
  vertices.push([ks, ky, -d * 0.5]);            // right
  vertices.push([0, ky + ks * 2, -d * 0.5]);    // bottom
  vertices.push([-ks, ky, -d * 0.5]);           // left
  internal.push([ki, ki + 1], [ki + 1, ki + 2], [ki + 2, ki + 3], [ki + 3, ki]);
  internal.push([ki, ki + 2], [ki + 1, ki + 3]); // cross

  // Body face diagonals as internal
  internal.push([0, 2], [1, 3], [4, 6], [5, 7]);
  internal.push([0, 6], [1, 7], [2, 4], [3, 5]);

  return { vertices, edges, internal };
}

const icoData = makeIcosahedron();
const tesData = makeTesseract();
const lockData = makeLock();

function getShapeData(variant: TesseractVariant) {
  switch (variant) {
    case "solutions":
      return { vertices: icoData.vertices, edges: icoData.edges, internal: icoData.internal };
    case "infrastructure":
      return { vertices: tesData.vertices, edges: tesData.edges, internal: tesData.internal };
    case "security":
      return { vertices: lockData.vertices, edges: lockData.edges, internal: lockData.internal };
    default:
      return { vertices: aliceVertices, edges: aliceEdges, internal: aliceInternal };
  }
}

function rotateY(v: [number, number, number], a: number): [number, number, number] {
  const c = Math.cos(a), s = Math.sin(a);
  return [v[0] * c + v[2] * s, v[1], -v[0] * s + v[2] * c];
}

function rotateX(v: [number, number, number], a: number): [number, number, number] {
  const c = Math.cos(a), s = Math.sin(a);
  return [v[0], v[1] * c - v[2] * s, v[1] * s + v[2] * c];
}

function projectPt(v: [number, number, number], dist: number): [number, number, number] {
  const perspective = dist / (dist + v[2]);
  return [v[0] * perspective, v[1] * perspective, perspective];
}

interface Props {
  variant?: TesseractVariant;
}

const TesseractAnimation = ({ variant = "alice" }: Props) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const { vertices, edges, internal } = getShapeData(variant);
    const allEdges = [...edges, ...internal];

    let animId: number;
    const startTime = performance.now();

    // Variant-specific rotation speeds
    const rotSpeedY = variant === "security" ? 0.1 : variant === "infrastructure" ? 0.12 : variant === "solutions" ? 0.18 : 0.15;
    const tiltAmp = variant === "security" ? 0.15 : variant === "infrastructure" ? 0.25 : variant === "solutions" ? 0.2 : 0.15;
    const tiltSpeed = variant === "security" ? 0.05 : variant === "infrastructure" ? 0.06 : variant === "solutions" ? 0.1 : 0.08;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = canvas.offsetWidth * dpr;
      canvas.height = canvas.offsetHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const draw = (now: number) => {
      const t = (now - startTime) * 0.001;
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      const dpr = window.devicePixelRatio || 1;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);

      const angleY = t * rotSpeedY;
      const angleX = Math.sin(t * tiltSpeed) * tiltAmp;

      const scale = Math.min(w, h) * 0.38;
      const cx = w * 0.5;
      const cy = h * 0.5;

      const projected = vertices.map((v) => {
        let rv = rotateY(v, angleY);
        rv = rotateX(rv, angleX);
        const [px, py, d] = projectPt(rv, 4);
        return [cx + px * scale, cy + py * scale, d] as [number, number, number];
      });

      // Draw internal edges (dimmer)
      for (let i = edges.length; i < allEdges.length; i++) {
        const [a, b] = allEdges[i];
        const [x1, y1, d1] = projected[a];
        const [x2, y2, d2] = projected[b];
        const avgDepth = (d1 + d2) / 2;
        const opacity = Math.min(0.2, Math.max(0.05, (avgDepth - 0.7) * 0.5));

        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.strokeStyle = `rgba(67, 163, 153, ${opacity})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }

      // Draw main edges
      for (let i = 0; i < edges.length; i++) {
        const [a, b] = allEdges[i];
        const [x1, y1, d1] = projected[a];
        const [x2, y2, d2] = projected[b];
        const avgDepth = (d1 + d2) / 2;
        const opacity = Math.min(0.55, Math.max(0.1, (avgDepth - 0.5) * 0.8));

        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.strokeStyle = `rgba(67, 163, 153, ${opacity})`;
        ctx.lineWidth = Math.max(0.8, avgDepth * 1.2);
        ctx.stroke();
      }

      // Draw vertices
      for (const [px, py, d] of projected) {
        const opacity = Math.min(0.6, Math.max(0.1, (d - 0.5) * 0.8));
        const radius = Math.max(1, d * 2);

        ctx.beginPath();
        ctx.arc(px, py, radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(67, 163, 153, ${opacity})`;
        ctx.fill();
      }

      animId = requestAnimationFrame(draw);
    };

    animId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, [variant]);

  return (
    <div className="pointer-events-none absolute top-0 right-0 h-full w-[55%]">
      <canvas ref={canvasRef} className="h-full w-full" />
    </div>
  );
};

export default TesseractAnimation;
