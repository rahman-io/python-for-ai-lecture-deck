import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Zap, ShieldCheck, Flame, Cpu, Code2 } from 'lucide-react';

import convergenceImg from '../assets/images/python_ai_convergence_3d_1794350079537.jpg';

interface PythonAiConvergenceProps {
  slide: any;
  revealedBulletCount: number;
  onNextPointOrSlide?: () => void;
  theme?: string;
}

export const PythonAiConvergence: React.FC<PythonAiConvergenceProps> = ({
  slide,
  revealedBulletCount,
}) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isMerged, setIsMerged] = useState(false);

  const isHookVisible = revealedBulletCount === 0;
  const activeStage = Math.min(revealedBulletCount, 2);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x, y });
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-4 select-none">
      <AnimatePresence mode="wait">
        {isHookVisible ? (
          /* =========================================================================
             STAGE 0: COVER / QUESTION HOOK STAGE (revealedBulletCount === 0)
             Interactive 3D Merging Canvas Artwork
             ========================================================================= */
          <motion.div
            key="convergence-hook"
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -15 }}
            transition={{ duration: 0.45 }}
            onMouseMove={handleMouseMove}
            onMouseLeave={() => setMousePos({ x: 0, y: 0 })}
            className="relative bg-gradient-to-b from-slate-950 via-[#070c1e] to-slate-950 border-2 border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl overflow-hidden min-h-[440px] flex items-center justify-center cursor-pointer"
          >
            {/* Watermark Background Text */}
            <div className="absolute inset-0 pointer-events-none select-none overflow-hidden opacity-[0.06] font-extrabold flex flex-col justify-between p-4 text-white leading-none">
              <span className="text-5xl sm:text-7xl font-black transform -rotate-1 translate-x-8">
                THE CONVERGENCE
              </span>
              <span className="text-4xl sm:text-6xl font-black text-right -translate-x-12">
                PYTHON MEETS ARTIFICIAL INTELLIGENCE
              </span>
              <span className="text-5xl sm:text-7xl font-black translate-x-4">
                THE CONVERGENCE
              </span>
            </div>

            {/* Background Radial Glow Sparks */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              <div className="absolute -top-1/4 -left-1/4 w-96 h-96 bg-amber-500/20 rounded-full blur-3xl" />
              <div className="absolute -bottom-1/4 -right-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl" />
            </div>

            {/* Interactive 3D Perspective Card Layout */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center relative z-10 w-full my-auto">
              {/* Interactive 3D Image Artwork Container (7 cols) */}
              <div className="md:col-span-7 flex justify-center">
                <motion.div
                  style={{
                    rotateX: mousePos.y * -14,
                    rotateY: mousePos.x * 14,
                    transformStyle: 'preserve-3d',
                  }}
                  transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                  className="relative group w-full max-w-lg"
                >
                  {/* Outer Dual Energy Aura */}
                  <div className="absolute -inset-3 bg-gradient-to-r from-amber-500 via-orange-500 to-cyan-500 rounded-3xl opacity-40 blur-2xl group-hover:opacity-70 transition duration-500" />

                  {/* 3D Image Artwork Frame */}
                  <div className="relative rounded-2xl overflow-hidden border-2 border-slate-700/80 shadow-2xl bg-slate-900 aspect-video">
                    <img
                      src={convergenceImg}
                      alt="3D Interactive Artwork: Convergence of Python and AI"
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />
                    {/* Glass Overlay Tag */}
                    <div className="absolute bottom-3 left-3 right-3 p-2.5 rounded-xl bg-slate-950/80 backdrop-blur-md border border-slate-700/60 flex items-center justify-between text-xs font-mono">
                      <span className="text-amber-400 font-bold flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                        Python Gold Energy
                      </span>
                      <span className="text-cyan-400 font-bold flex items-center gap-1.5">
                        AI Neon Neural Energy
                        <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                      </span>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Cover Title Section (5 cols) */}
              <div className="md:col-span-5 space-y-4 text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-700 text-xs font-mono font-bold text-amber-300">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>Section 4 • The Turning Point</span>
                </div>

                <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.05]">
                  The <br />
                  <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-cyan-400 bg-clip-text text-transparent">
                    Convergence
                  </span>
                </h2>

                <p className="text-sm sm:text-base text-slate-300 font-medium leading-relaxed">
                  Where human-friendly programming syntax and high-speed artificial intelligence merge into one standard toolkit.
                </p>
              </div>
            </div>
          </motion.div>
        ) : (
          /* =========================================================================
             STAGE 1 & 2: REVEALED CONVERGENCE CONTENT (revealedBulletCount >= 1)
             ========================================================================= */
          <motion.div
            key="convergence-content"
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.4 }}
            className="space-y-4"
          >
            {/* Header Bar */}
            <div className="bg-slate-900/95 border-2 border-slate-800 rounded-2xl p-3 sm:p-4 shadow-md flex items-center justify-between gap-4 text-white">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl overflow-hidden border-2 border-amber-400 shrink-0 bg-slate-950 shadow-sm">
                  <img src={convergenceImg} alt="Thumbnail" className="w-full h-full object-cover" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-black text-white">
                    The Convergence of Python & Artificial Intelligence
                  </h3>
                  <p className="text-xs text-slate-400 font-medium hidden sm:block">
                    Why human-readable code became the universal catalyst for AI engineering
                  </p>
                </div>
              </div>

              {/* Stage Pill */}
              <div className="px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-amber-300 font-mono text-xs font-bold">
                Stage 0{activeStage} / 02
              </div>
            </div>

            {/* Stage 1: Parallel Worlds Collision */}
            {activeStage === 1 && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="grid grid-cols-1 md:grid-cols-12 gap-5 items-stretch"
              >
                {/* Left Card: Python World (5 cols) */}
                <div className="md:col-span-5 p-6 rounded-3xl bg-slate-900/90 border-2 border-amber-500/80 shadow-2xl text-white space-y-4 flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="px-3 py-1 rounded-full bg-amber-400 text-slate-950 font-mono text-xs font-black">
                        World 01 • Python
                      </span>
                      <Code2 className="w-6 h-6 text-amber-400" />
                    </div>

                    <h4 className="text-xl font-black text-amber-300">
                      Human-Centric Syntax
                    </h4>

                    <p className="text-xs text-slate-300 leading-relaxed font-normal">
                      Designed for rapid prototyping and clean readability. Accessible to scientists, quants, and 18M+ global software developers.
                    </p>
                  </div>

                  <div className="space-y-1.5 pt-3 border-t border-slate-800 text-xs font-mono text-amber-200">
                    <div className="p-2 rounded-lg bg-slate-950/80 border border-slate-800 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                      <span>Zero memory pointer gymnastics</span>
                    </div>
                    <div className="p-2 rounded-lg bg-slate-950/80 border border-slate-800 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                      <span>Expressive high-level abstraction</span>
                    </div>
                  </div>
                </div>

                {/* Central Collision Core (2 cols) */}
                <div className="md:col-span-2 flex flex-col items-center justify-center p-4 rounded-3xl bg-slate-950 border-2 border-slate-800 shadow-xl text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-amber-400 to-cyan-400 p-0.5 animate-pulse">
                    <div className="w-full h-full bg-slate-950 rounded-full flex items-center justify-center">
                      <Zap className="w-6 h-6 text-amber-400" />
                    </div>
                  </div>
                  <span className="text-[11px] font-mono font-black text-slate-400 uppercase tracking-wider">
                    Convergence Collision
                  </span>
                </div>

                {/* Right Card: AI World (5 cols) */}
                <div className="md:col-span-5 p-6 rounded-3xl bg-slate-900/90 border-2 border-cyan-500/80 shadow-2xl text-white space-y-4 flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="px-3 py-1 rounded-full bg-cyan-400 text-slate-950 font-mono text-xs font-black">
                        World 02 • AI
                      </span>
                      <Cpu className="w-6 h-6 text-cyan-400" />
                    </div>

                    <h4 className="text-xl font-black text-cyan-300">
                      Neural Intelligence
                    </h4>

                    <p className="text-xs text-slate-300 leading-relaxed font-normal">
                      Complex linear algebra, multi-dimensional tensor matrices, backpropagation, and parallel GPU execution.
                    </p>
                  </div>

                  <div className="space-y-1.5 pt-3 border-t border-slate-800 text-xs font-mono text-cyan-200">
                    <div className="p-2 rounded-lg bg-slate-950/80 border border-slate-800 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                      <span>High-dimensional matrix math</span>
                    </div>
                    <div className="p-2 rounded-lg bg-slate-950/80 border border-slate-800 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                      <span>Massive parallel GPU acceleration</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Stage 2: The Unified Synthesis (85%+ AI Systems) */}
            {activeStage >= 2 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                className="p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-slate-900 via-[#0a122c] to-slate-950 border-2 border-cyan-500/60 shadow-2xl text-white space-y-6"
              >
                {/* Stat Headline Banner */}
                <div className="p-5 rounded-2xl bg-slate-950/80 border border-cyan-500/40 grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                  <div className="md:col-span-4 text-center md:text-left">
                    <span className="text-4xl sm:text-5xl font-black bg-gradient-to-r from-amber-400 via-orange-400 to-cyan-400 bg-clip-text text-transparent">
                      85%+
                    </span>
                    <p className="text-xs font-mono text-slate-400 font-bold mt-1">
                      Global AI Share
                    </p>
                  </div>

                  <div className="md:col-span-8 text-left space-y-1">
                    <h4 className="text-base sm:text-lg font-extrabold text-white">
                      Python is the Common Tongue of Artificial Intelligence
                    </h4>
                    <p className="text-xs text-slate-300 font-medium leading-relaxed">
                      Over 85% of machine learning research papers and production AI systems are written in Python.
                    </p>
                  </div>
                </div>

                {/* 3 Pillars Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2">
                    <div className="w-8 h-8 rounded-lg bg-amber-400/20 text-amber-400 flex items-center justify-center font-bold">
                      01
                    </div>
                    <h5 className="text-sm font-extrabold text-white">
                      Developer Velocity
                    </h5>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Focus on AI model architecture and mathematical intent without fighting memory syntax.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2">
                    <div className="w-8 h-8 rounded-lg bg-cyan-400/20 text-cyan-400 flex items-center justify-center font-bold">
                      02
                    </div>
                    <h5 className="text-sm font-extrabold text-white">
                      C & CUDA Engine
                    </h5>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      High-level Python code calls pre-compiled C++ and GPU CUDA kernels beneath the hood.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2">
                    <div className="w-8 h-8 rounded-lg bg-emerald-400/20 text-emerald-400 flex items-center justify-center font-bold">
                      03
                    </div>
                    <h5 className="text-sm font-extrabold text-white">
                      Unified Ecosystem
                    </h5>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Instant access to PyTorch, TensorFlow, NumPy, Pandas, and Scikit-Learn.
                    </p>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Bottom Indicator Bar */}
            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-3 flex items-center justify-end font-mono text-xs">
              <div className="px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-amber-300 font-bold">
                {activeStage} / 2
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
