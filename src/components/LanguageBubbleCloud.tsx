import React, { useState, useEffect, useRef } from 'react';

export interface LangItem {
  id: string;
  name: string;
  tagline: string;
  size: number; // diameter in px
  color: string;
  border: string;
  textColor: string;
  initialX: number; // offset % from center (-40 to 40)
  initialY: number; // offset % from center (-30 to 30)
}

// Language hierarchy: Python #1 largest, Java #2, C #3, followed by others scaling down
const LANGUAGES: LangItem[] = [
  { id: 'python', name: 'Python', tagline: 'AI, ML & Data Science King', size: 130, color: 'bg-purple-500/90', border: 'border-purple-600 shadow-purple-200', textColor: 'text-white font-black', initialX: 0, initialY: 10 },
  { id: 'java', name: 'Java', tagline: 'Enterprise Systems & JVM Standard', size: 110, color: 'bg-rose-300/95', border: 'border-rose-400 shadow-rose-200', textColor: 'text-rose-950 font-black', initialX: 26, initialY: 4 },
  { id: 'c', name: 'C', tagline: 'Mother of Modern Systems Programming', size: 96, color: 'bg-sky-400/95', border: 'border-sky-500 shadow-sky-200', textColor: 'text-sky-950 font-black', initialX: -24, initialY: -10 },
  { id: 'cpp', name: 'C++', tagline: 'High-Performance Engine Core', size: 84, color: 'bg-teal-300/95', border: 'border-teal-400', textColor: 'text-teal-950 font-black', initialX: -32, initialY: 16 },
  { id: 'js', name: 'JavaScript', tagline: 'The Universal Web Language', size: 78, color: 'bg-amber-300/95', border: 'border-amber-400', textColor: 'text-amber-950 font-black', initialX: 12, initialY: -20 },
  { id: 'assembly', name: 'Assembly', tagline: 'Low-Level CPU Instructions', size: 72, color: 'bg-indigo-500/90', border: 'border-indigo-600', textColor: 'text-white font-bold', initialX: -22, initialY: -26 },
  { id: 'lisp', name: 'Lisp', tagline: 'Pioneer of AI Symbol Logic (1958)', size: 68, color: 'bg-purple-400/90', border: 'border-purple-500', textColor: 'text-purple-950 font-bold', initialX: 28, initialY: -20 },
  { id: 'php', name: 'PHP', tagline: 'Web Server Backend Classic', size: 64, color: 'bg-blue-400/90', border: 'border-blue-500', textColor: 'text-blue-950 font-bold', initialX: -14, initialY: 22 },
  { id: 'ruby', name: 'Ruby', tagline: 'Designed for Developer Happiness', size: 62, color: 'bg-rose-400/90', border: 'border-rose-500', textColor: 'text-white font-bold', initialX: 16, initialY: 26 },
  { id: 'go', name: 'Go', tagline: 'Google Cloud Concurrency', size: 58, color: 'bg-cyan-400/90', border: 'border-cyan-500', textColor: 'text-cyan-950 font-bold', initialX: -2, initialY: -28 },
  { id: 'rust', name: 'Rust', tagline: 'Memory Safety Without GC', size: 56, color: 'bg-orange-400/90', border: 'border-orange-500', textColor: 'text-orange-950 font-bold', initialX: 34, initialY: -6 },
  { id: 'pascal', name: 'Pascal', tagline: 'Structured Academic Classic', size: 54, color: 'bg-pink-300/90', border: 'border-pink-400', textColor: 'text-pink-950 font-bold', initialX: -18, initialY: -32 },
  { id: 'algol', name: 'ALGOL', tagline: 'Father of Algorithmic Structure', size: 54, color: 'bg-violet-400/90', border: 'border-violet-500', textColor: 'text-white font-bold', initialX: -34, initialY: -18 },
  { id: 'ts', name: 'TypeScript', tagline: 'Typed JavaScript at Scale', size: 52, color: 'bg-blue-500/90', border: 'border-blue-600', textColor: 'text-white font-bold', initialX: 18, initialY: -8 },
  { id: 'vb', name: 'VB', tagline: 'Visual Basic Rapid Builder', size: 50, color: 'bg-purple-300/90', border: 'border-purple-400', textColor: 'text-purple-950 font-bold', initialX: 38, initialY: 14 },
  { id: 'swift', name: 'Swift', tagline: 'Apple iOS & macOS Native', size: 48, color: 'bg-orange-500/90', border: 'border-orange-600', textColor: 'text-white font-bold', initialX: 32, initialY: -24 },
  { id: 'shell', name: 'Shell', tagline: 'UNIX CLI Command Automation', size: 48, color: 'bg-slate-600/90', border: 'border-slate-700', textColor: 'text-white font-bold', initialX: -8, initialY: 8 },
  { id: 'prolog', name: 'Prolog', tagline: 'Logic Programming for AI', size: 48, color: 'bg-fuchsia-400/90', border: 'border-fuchsia-500', textColor: 'text-fuchsia-950 font-bold', initialX: 22, initialY: -30 },
  { id: 'kotlin', name: 'Kotlin', tagline: 'Modern Android & Multiplatform', size: 46, color: 'bg-indigo-400/90', border: 'border-indigo-500', textColor: 'text-indigo-950 font-bold', initialX: -2, initialY: 32 },
  { id: 'fortran', name: 'FORTRAN', tagline: 'Scientific High-Level Pioneer (1957)', size: 46, color: 'bg-blue-300/90', border: 'border-blue-400', textColor: 'text-blue-950 font-bold', initialX: -36, initialY: 10 },
  { id: 'cobol', name: 'COBOL', tagline: 'Business Data Processing Classic', size: 44, color: 'bg-slate-400/90', border: 'border-slate-500', textColor: 'text-slate-950 font-bold', initialX: -26, initialY: 26 },
  { id: 'scala', name: 'Scala', tagline: 'Functional + Object JVM', size: 44, color: 'bg-red-400/90', border: 'border-red-500', textColor: 'text-white font-bold', initialX: 8, initialY: -32 },
  { id: 'haskell', name: 'Haskell', tagline: 'Pure Functional Logic', size: 44, color: 'bg-purple-600/90', border: 'border-purple-700', textColor: 'text-white font-bold', initialX: -32, initialY: 22 },
  { id: 'julia', name: 'Julia', tagline: 'High Performance Math & AI', size: 44, color: 'bg-emerald-400/90', border: 'border-emerald-500', textColor: 'text-emerald-950 font-bold', initialX: 28, initialY: 28 },
];

interface NodeState {
  x: number; // px relative to center
  y: number; // px relative to center
  vx: number;
  vy: number;
  baseX: number;
  baseY: number;
  phase: number;
  pulseSpeed: number;
  isDragging?: boolean;
}

export const LanguageBubbleCloud: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [draggingId, setDraggingId] = useState<string | null>(null);

  // Physics animation state stored in ref for 60fps performance
  const nodesRef = useRef<Map<string, NodeState>>(new Map());

  // Initialize node positions
  useEffect(() => {
    const nodes = new Map<string, NodeState>();
    LANGUAGES.forEach((lang, i) => {
      const baseX = (lang.initialX / 50) * 240;
      const baseY = (lang.initialY / 50) * 110;
      nodes.set(lang.id, {
        x: baseX,
        y: baseY,
        vx: 0,
        vy: 0,
        baseX,
        baseY,
        phase: i * 0.45,
        pulseSpeed: 0.8 + (i % 5) * 0.2,
      });
    });
    nodesRef.current = nodes;
  }, []);

  // Animation Loop: Orbit, Soft Collisions, Spring Return, Breathing
  const [, setTick] = useState(0);

  useEffect(() => {
    let animFrame: number;
    let startTime = performance.now();

    const updatePhysics = () => {
      const t = (performance.now() - startTime) / 1000;
      const nodes = nodesRef.current;

      nodes.forEach((node, id) => {
        // Skip physics spring update if currently being dragged by user
        if (node.isDragging) return;

        // 1. Sinusoidal Floating around home
        const floatX = Math.sin(t * node.pulseSpeed + node.phase) * 5;
        const floatY = Math.cos(t * node.pulseSpeed * 0.8 + node.phase) * 5;

        const targetX = node.baseX + floatX;
        const targetY = node.baseY + floatY;

        // 2. Spring force returning node back to base position
        const k = 0.04;
        const damping = 0.88;

        node.vx += (targetX - node.x) * k;
        node.vy += (targetY - node.y) * k;

        node.vx *= damping;
        node.vy *= damping;

        node.x += node.vx;
        node.y += node.vy;
      });

      // 3. Soft Collision Nudge between neighboring bubbles
      const nodeList = Array.from(nodes.entries());
      for (let i = 0; i < nodeList.length; i++) {
        for (let j = i + 1; j < nodeList.length; j++) {
          const [idA, nodeA] = nodeList[i];
          const [idB, nodeB] = nodeList[j];

          const langA = LANGUAGES.find((l) => l.id === idA)!;
          const langB = LANGUAGES.find((l) => l.id === idB)!;

          const dx = nodeB.x - nodeA.x;
          const dy = nodeB.y - nodeA.y;
          const dist = Math.hypot(dx, dy) || 1;
          const minDist = (langA.size + langB.size) * 0.42;

          if (dist < minDist) {
            const overlap = minDist - dist;
            const nx = dx / dist;
            const ny = dy / dist;

            const push = overlap * 0.1;
            if (!nodeA.isDragging) {
              nodeA.x -= nx * push;
              nodeA.y -= ny * push;
            }
            if (!nodeB.isDragging) {
              nodeB.x += nx * push;
              nodeB.y += ny * push;
            }
          }
        }
      }

      setTick((prev) => (prev + 1) % 1000);
      animFrame = requestAnimationFrame(updatePhysics);
    };

    animFrame = requestAnimationFrame(updatePhysics);
    return () => cancelAnimationFrame(animFrame);
  }, []);

  // Pointer / Drag and Drop handlers (Drag bubbles anywhere)
  const handlePointerDown = (id: string, e: React.PointerEvent<HTMLDivElement>) => {
    e.stopPropagation();
    (e.target as HTMLElement).setPointerCapture(e.pointerId);

    setDraggingId(id);
    const node = nodesRef.current.get(id);
    if (node) {
      node.isDragging = true;
      node.vx = 0;
      node.vy = 0;
    }
  };

  const handlePointerMove = (id: string, e: React.PointerEvent<HTMLDivElement>) => {
    if (draggingId !== id || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const currentX = e.clientX - (rect.left + rect.width / 2);
    const currentY = e.clientY - (rect.top + rect.height / 2);

    const node = nodesRef.current.get(id);
    if (node) {
      node.x = currentX;
      node.y = currentY;
      node.baseX = currentX; // Update home to new dragged location
      node.baseY = currentY;
    }
  };

  const handlePointerUp = (id: string, e: React.PointerEvent<HTMLDivElement>) => {
    if (draggingId === id) {
      (e.target as HTMLElement).releasePointerCapture(e.pointerId);
      setDraggingId(null);
      const node = nodesRef.current.get(id);
      if (node) {
        node.isDragging = false;
      }
    }
  };

  const hoveredLang = LANGUAGES.find((l) => l.id === hoveredId);

  return (
    <div className="w-full max-w-5xl mx-auto">
      {/* Main Floating & Draggable Bubble Container */}
      <div
        ref={containerRef}
        className="relative w-full h-[270px] sm:h-[295px] rounded-3xl bg-gradient-to-b from-slate-50/80 via-white to-amber-50/30 border-2 border-slate-200/90 shadow-lg overflow-hidden flex items-center justify-center select-none"
      >
        {/* Subtle grid background pattern */}
        <div
          className="absolute inset-0 pointer-events-none opacity-15"
          style={{
            backgroundImage: 'radial-gradient(#15284f 1px, transparent 1px)',
            backgroundSize: '24px 24px',
          }}
        />

        {/* Top Floating Spotlight Badge (Only shows name & tagline when hovered) */}
        {hoveredLang && (
          <div className="absolute top-2.5 inset-x-4 z-30 flex justify-center pointer-events-none animate-fade-in">
            <div className="px-4 py-1.5 rounded-full bg-[#15284f] text-white border border-[#f59e0b] shadow-xl text-xs font-mono flex items-center gap-2">
              <span className="font-extrabold text-[#f59e0b] text-sm">{hoveredLang.name}:</span>
              <span className="text-slate-200 font-medium">{hoveredLang.tagline}</span>
            </div>
          </div>
        )}

        {/* Floating & Draggable Language Bubbles */}
        {LANGUAGES.map((lang, idx) => {
          const node = nodesRef.current.get(lang.id) || { x: 0, y: 0 };
          const isHovered = hoveredId === lang.id;
          const isDragging = draggingId === lang.id;

          // Breathing pulsation scale factor
          const breatheScale = 1 + Math.sin(Date.now() * 0.002 + idx) * 0.05;
          const displayScale = isHovered || isDragging ? 1.35 : breatheScale;

          return (
            <div
              key={lang.id}
              onPointerDown={(e) => handlePointerDown(lang.id, e)}
              onPointerMove={(e) => handlePointerMove(lang.id, e)}
              onPointerUp={(e) => handlePointerUp(lang.id, e)}
              onPointerCancel={(e) => handlePointerUp(lang.id, e)}
              onMouseEnter={() => setHoveredId(lang.id)}
              onMouseLeave={() => setHoveredId(null)}
              className={`absolute rounded-full flex flex-col items-center justify-center transition-transform duration-150 cursor-grab active:cursor-grabbing shadow-md border ${lang.color} ${lang.border} ${lang.textColor}`}
              style={{
                width: `${lang.size}px`,
                height: `${lang.size}px`,
                transform: `translate3d(${node.x}px, ${node.y}px, 0px) scale(${displayScale})`,
                zIndex: isHovered || isDragging ? 50 : Math.round(lang.size),
                boxShadow: isHovered || isDragging
                  ? '0 20px 25px -5px rgba(21, 40, 79, 0.35), 0 8px 10px -6px rgba(245, 158, 11, 0.5)'
                  : '0 4px 6px -1px rgba(0, 0, 0, 0.08)',
                touchAction: 'none',
              }}
            >
              <span
                className="font-black tracking-tight leading-none text-center"
                style={{
                  fontSize: `${Math.max(12, Math.min(34, lang.size * 0.32))}px`,
                }}
              >
                {lang.name}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
