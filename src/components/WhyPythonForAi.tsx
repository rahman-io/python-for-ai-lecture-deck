import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Cpu, CheckCircle2 } from 'lucide-react';

import africanStudentImg from '../assets/images/curious_african_male_3d_1794350499079.jpg';

// Official Vector Brand Logos based on user's exact screenshots
const NumpyLogo: React.FC<{ className?: string }> = ({ className = 'w-10 h-10' }) => (
  <svg viewBox="0 0 100 100" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
    {/* NumPy Isometric Cubes (Cyan/Blue Theme) */}
    {/* Top center cube */}
    <path d="M50 12 L68 22 L50 32 L32 22 Z" fill="#4dabf7" />
    <path d="M32 22 L50 32 L50 48 L32 38 Z" fill="#228be6" />
    <path d="M68 22 L50 32 L50 48 L68 38 Z" fill="#1c7ed6" />
    {/* Left top cube */}
    <path d="M30 24 L48 34 L30 44 L12 34 Z" fill="#339af0" />
    <path d="M12 34 L30 44 L30 60 L12 50 Z" fill="#1971c2" />
    <path d="M48 34 L30 44 L30 60 L48 50 Z" fill="#1864ab" />
    {/* Right top cube */}
    <path d="M70 24 L88 34 L70 44 L52 34 Z" fill="#74c0fc" />
    <path d="M52 34 L70 44 L70 60 L52 50 Z" fill="#339af0" />
    <path d="M88 34 L70 44 L70 60 L88 50 Z" fill="#1c7ed6" />
    {/* Center cube */}
    <path d="M50 36 L68 46 L50 56 L32 46 Z" fill="#4dabf7" />
    <path d="M32 46 L50 56 L50 72 L32 62 Z" fill="#1c7ed6" />
    <path d="M68 46 L50 56 L50 72 L68 62 Z" fill="#1864ab" />
    {/* Left bottom cube */}
    <path d="M30 48 L48 58 L30 68 L12 58 Z" fill="#228be6" />
    <path d="M12 58 L30 68 L30 84 L12 74 Z" fill="#1864ab" />
    <path d="M48 58 L30 68 L30 84 L48 74 Z" fill="#0c4a6e" />
    {/* Right bottom cube */}
    <path d="M70 48 L88 58 L70 68 L52 58 Z" fill="#339af0" />
    <path d="M52 58 L70 68 L70 84 L52 74 Z" fill="#1971c2" />
    <path d="M88 58 L70 68 L70 84 L88 74 Z" fill="#1864ab" />
    {/* Bold Stylized N overlay */}
    <path d="M32 30 L44 37 L44 65 L32 58 Z" fill="#1e3a8a" opacity="0.95" />
    <path d="M44 37 L60 69 L72 62 L44 37 Z" fill="#172554" opacity="0.9" />
    <path d="M60 41 L72 34 L72 62 L60 69 Z" fill="#1e3a8a" opacity="0.95" />
  </svg>
);

const PandasLogo: React.FC<{ className?: string }> = ({ className = 'w-10 h-10' }) => (
  <svg viewBox="0 0 100 100" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
    {/* Pandas Official Vertical Bar Graphic with Accent Squares */}
    {/* Left navy bar */}
    <rect x="22" y="18" width="10" height="42" rx="3" fill="#130754" />
    {/* Left orange accent */}
    <rect x="22" y="65" width="10" height="10" rx="2" fill="#ff4d4d" />
    {/* Middle-left navy bar */}
    <rect x="38" y="28" width="10" height="48" rx="3" fill="#130754" />
    {/* Middle-left yellow accent */}
    <rect x="38" y="14" width="10" height="10" rx="2" fill="#eab308" />
    {/* Middle-right pink accent */}
    <rect x="54" y="68" width="10" height="10" rx="2" fill="#e11d48" />
    {/* Middle-right navy bar */}
    <rect x="54" y="18" width="10" height="44" rx="3" fill="#130754" />
    {/* Right navy bar */}
    <rect x="70" y="24" width="10" height="52" rx="3" fill="#130754" />
  </svg>
);

const ScikitLearnLogo: React.FC<{ className?: string }> = ({ className = 'w-10 h-10' }) => (
  <svg viewBox="0 0 100 100" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
    {/* Scikit-Learn Iconic Blue & Orange Ellipses with script font */}
    {/* Blue circle on bottom-left */}
    <circle cx="34" cy="54" r="22" fill="#38bdf8" />
    {/* Big Orange egg shape on right */}
    <ellipse cx="60" cy="46" rx="28" ry="24" fill="#f97316" />
    {/* Text simulation */}
    <text x="58" y="44" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="800" fontFamily="sans-serif">scikit</text>
    <text x="60" y="56" textAnchor="middle" fill="#1c1917" fontSize="13" fontWeight="900" fontStyle="italic" fontFamily="serif">learn</text>
  </svg>
);

const TensorFlowLogo: React.FC<{ className?: string }> = ({ className = 'w-10 h-10' }) => (
  <svg viewBox="0 0 100 100" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
    {/* TensorFlow Isometric 3D 'T' & 'F' in Orange Gradient */}
    {/* Left wing (T top left) */}
    <path d="M50 14 L20 31 L32 38 L50 28 Z" fill="#ff8f00" />
    {/* Left pillar side */}
    <path d="M20 31 L32 38 L32 64 L20 57 Z" fill="#e65100" />
    {/* Right wing (T top right) */}
    <path d="M50 14 L80 31 L68 38 L50 28 Z" fill="#ffa726" />
    {/* Right pillar side */}
    <path d="M80 31 L68 38 L68 64 L80 57 Z" fill="#f57c00" />
    {/* Center vertical pillar top */}
    <path d="M50 28 L62 35 L50 42 L38 35 Z" fill="#ffb74d" />
    {/* Center vertical pillar left */}
    <path d="M38 35 L50 42 L50 86 L38 79 Z" fill="#f57c00" />
    {/* Center vertical pillar right */}
    <path d="M50 42 L62 35 L62 79 L50 86 Z" fill="#e65100" />
    {/* F crossbar right */}
    <path d="M50 50 L68 40 L68 49 L50 59 Z" fill="#ffa726" />
    <path d="M68 40 L78 46 L78 55 L68 49 Z" fill="#f57c00" />
  </svg>
);

const PyTorchLogo: React.FC<{ className?: string }> = ({ className = 'w-10 h-10' }) => (
  <svg viewBox="0 0 100 100" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
    {/* PyTorch Flame Circle with Dot */}
    {/* Circular flame outline with opening at top */}
    <path
      d="M50 18 C30 18 16 33 16 52 C16 71 31 86 50 86 C69 86 84 71 84 52 C84 39 77 28 66 22 L62 29 C70 34 76 42 76 52 C76 66 64 78 50 78 C36 78 24 66 24 52 C24 38 35 26 50 26 Z"
      fill="#ee4c2c"
    />
    {/* Top Right Flame Spurt & Dot */}
    <path d="M50 18 L64 24 L56 31 Z" fill="#ee4c2c" />
    <circle cx="72" cy="27" r="5" fill="#ee4c2c" />
  </svg>
);

interface WhyPythonForAiProps {
  slide: any;
  revealedBulletCount: number;
  onNextPointOrSlide?: () => void;
  theme?: string;
}

export const WhyPythonForAi: React.FC<WhyPythonForAiProps> = ({
  slide,
  revealedBulletCount,
}) => {
  const [activeToolIdx, setActiveToolIdx] = useState<number | null>(null);

  const isQuestionHookVisible = revealedBulletCount === 0;
  const activeStage = Math.min(revealedBulletCount, 2);

  const tools = [
    {
      name: 'NumPy',
      tag: 'Fast Array & Matrix Math',
      logo: <NumpyLogo className="w-12 h-12" />,
      color: '#0284c7',
      bgGlow: 'from-sky-500/20 to-blue-600/10',
      badgeBorder: 'border-sky-500/50',
      detail: 'Foundation for all n-dimensional array computing and linear algebra in Python.',
    },
    {
      name: 'Pandas',
      tag: 'Data Wrangling & Tables',
      logo: <PandasLogo className="w-12 h-12" />,
      color: '#1e1b4b',
      bgGlow: 'from-indigo-500/20 to-rose-500/10',
      badgeBorder: 'border-indigo-400/50',
      detail: 'Ultra-fast structured DataFrames for data filtering, cleaning, and preparation.',
    },
    {
      name: 'Scikit-learn',
      tag: 'Classical Machine Learning',
      logo: <ScikitLearnLogo className="w-12 h-12" />,
      color: '#f97316',
      bgGlow: 'from-amber-500/20 to-orange-600/10',
      badgeBorder: 'border-orange-500/50',
      detail: 'Industry standard for classification, regression, clustering, and decision trees.',
    },
    {
      name: 'TensorFlow',
      tag: 'Production Neural Networks',
      logo: <TensorFlowLogo className="w-12 h-12" />,
      color: '#ea580c',
      bgGlow: 'from-orange-500/20 to-amber-600/10',
      badgeBorder: 'border-amber-500/50',
      detail: 'Google flagship platform for training and deploying scalable production neural nets.',
    },
    {
      name: 'PyTorch',
      tag: 'Research & Generative AI',
      logo: <PyTorchLogo className="w-12 h-12" />,
      color: '#ef4444',
      bgGlow: 'from-rose-500/20 to-red-600/10',
      badgeBorder: 'border-rose-500/50',
      detail: 'Dynamic computational graphs powering OpenAI, Meta, and modern LLM innovations.',
    },
  ];

  const reasons = slide.visualData?.reasons || [
    'Researchers publish ideas in code that any university student can run with one click.',
    'Pre-compiled C/CUDA engines beneath elegant, readable Python syntax.',
  ];

  return (
    <div className="w-full max-w-5xl mx-auto space-y-4 select-none">
      <AnimatePresence mode="wait">
        {isQuestionHookVisible ? (
          /* =========================================================================
             STAGE 0: QUESTION HOOK SCREEN (revealedBulletCount === 0)
             3D Handsome African male student avatar
             ========================================================================= */
          <motion.div
            key="why-python-hook"
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -15 }}
            transition={{ duration: 0.45 }}
            className="relative bg-white/95 border-2 border-slate-200/90 rounded-3xl p-6 sm:p-10 shadow-2xl overflow-hidden min-h-[420px] flex items-center justify-center"
          >
            {/* Watermark Background Text */}
            <div className="absolute inset-0 pointer-events-none select-none overflow-hidden opacity-[0.05] font-extrabold flex flex-col justify-between p-4 text-slate-900 leading-none">
              <span className="text-4xl sm:text-6xl font-black transform -rotate-1 translate-x-4">
                WHY PYTHON SPECIFICALLY FOR AI?
              </span>
              <span className="text-3xl sm:text-5xl font-black text-right -translate-x-8">
                WHY PYTHON SPECIFICALLY FOR AI?
              </span>
              <span className="text-4xl sm:text-6xl font-black translate-x-2">
                WHY PYTHON SPECIFICALLY FOR AI?
              </span>
              <span className="text-3xl sm:text-5xl font-black text-right translate-x-4">
                WHY PYTHON SPECIFICALLY FOR AI?
              </span>
            </div>

            {/* Hook Layout: 3D Avatar Image + Big Typography */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center relative z-10 w-full my-auto">
              <div className="md:col-span-5 flex justify-center">
                <div className="relative group">
                  <div className="absolute -inset-2 bg-gradient-to-r from-[#15284f] via-amber-500 to-emerald-500 rounded-[2.5rem] opacity-30 blur-xl group-hover:opacity-50 transition duration-500" />
                  <div className="relative w-56 h-56 sm:w-64 sm:h-64 rounded-[2.2rem] overflow-hidden border-4 border-white shadow-xl bg-slate-950">
                    <img
                      src={africanStudentImg}
                      alt="3D African female student examining why Python dominates AI"
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                </div>
              </div>

              <div className="md:col-span-7 space-y-4 text-left">
                <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-[#15284f] tracking-tight leading-[1.05]">
                  Why Python, <br />
                  <span className="bg-gradient-to-r from-[#15284f] via-amber-500 to-emerald-600 bg-clip-text text-transparent">
                    specifically, for AI?
                  </span>
                </h2>
                <p className="text-sm sm:text-base text-slate-600 font-medium leading-relaxed max-w-lg">
                  The greatest scientific library ecosystem in human history combined with pre-compiled C and CUDA execution engines.
                </p>
              </div>
            </div>
          </motion.div>
        ) : (
          /* =========================================================================
             STAGE 1 & 2: REVEALED CONTENT (Decisive Reasons & Ecosystem Engine)
             ========================================================================= */
          <motion.div
            key="why-python-content"
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.4 }}
            className="space-y-4"
          >
            {/* Header Bar */}
            <div className="bg-white/95 border-2 border-slate-200/90 rounded-2xl p-3 sm:p-4 shadow-md flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl overflow-hidden border-2 border-amber-400 shrink-0 bg-slate-900 shadow-sm">
                  <img src={africanStudentImg} alt="Avatar" className="w-full h-full object-cover object-top" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-black text-[#15284f]">
                    Why Python Dominates Artificial Intelligence
                  </h3>
                  <p className="text-xs text-slate-500 font-medium hidden sm:block">
                    {activeStage === 1
                      ? 'Stage 01: Core Engineering Decisive Reasons'
                      : 'Stage 02: The Scientific Library Ecosystem Engine'}
                  </p>
                </div>
              </div>

              {/* Stage Pill */}
              <div className="px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-700 font-mono text-xs font-bold">
                0{activeStage} / 02
              </div>
            </div>

            {/* Stage 1: Core Decisive Reasons (2 Distinct Architectural Pillars) */}
            {activeStage === 1 && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-5"
              >
                <div className="p-6 rounded-3xl bg-white border-2 border-slate-200 shadow-xl space-y-4 flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-900 border border-amber-300 flex items-center justify-center font-bold">
                      <i className="fa-solid fa-diagram-project text-lg" />
                    </div>

                    <h4 className="text-lg font-extrabold text-[#15284f]">
                      Open Scientific Collaboration
                    </h4>

                    <p className="text-xs text-slate-600 leading-relaxed font-normal">
                      {reasons[0]}
                    </p>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-mono text-slate-700 flex items-center gap-2 font-semibold">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Instant reproducible research globally</span>
                  </div>
                </div>

                <div className="p-6 rounded-3xl bg-slate-900 text-white border-2 border-slate-800 shadow-xl space-y-4 flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="w-10 h-10 rounded-2xl bg-cyan-900/60 text-cyan-300 border border-cyan-700 flex items-center justify-center font-bold">
                      <Cpu className="w-5 h-5" />
                    </div>

                    <h4 className="text-lg font-extrabold text-white">
                      C & CUDA Engine Speed
                    </h4>

                    <p className="text-xs text-slate-300 leading-relaxed font-normal">
                      {reasons[1]}
                    </p>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-cyan-300 flex items-center gap-2 font-semibold">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                    <span>C speed with Python human comfort</span>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Stage 2: Ecosystem Engine Hub (5 Scientific Libraries) */}
            {activeStage >= 2 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                className="p-6 sm:p-8 rounded-3xl bg-slate-900 border-2 border-slate-800 shadow-2xl text-white space-y-6"
              >
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
                  <div>
                    <h4 className="text-lg font-extrabold text-white">
                      The Unrivaled Scientific Library Ecosystem
                    </h4>
                    <p className="text-xs text-slate-400 font-medium">
                      Five fundamental building blocks that power modern global AI infrastructure
                    </p>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-amber-300 font-mono text-xs font-bold">
                    5 Core Libraries
                  </span>
                </div>

                {/* 5 Scientific Ecosystem Brand Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
                  {tools.map((tool: any, idx: number) => {
                    const isSelected = activeToolIdx === idx;
                    return (
                      <motion.div
                        key={idx}
                        whileHover={{ scale: 1.03 }}
                        onClick={() => setActiveToolIdx(isSelected ? null : idx)}
                        className={`p-4 rounded-2xl border-2 transition-all cursor-pointer shadow-xl flex flex-col justify-between ${
                          isSelected
                            ? 'bg-slate-800 border-amber-400 ring-2 ring-amber-400/40 shadow-amber-500/10'
                            : 'bg-slate-950/90 border-slate-800 hover:border-slate-700'
                        }`}
                      >
                        <div className="space-y-3">
                          {/* Official Logo Container with Subtle White/Glass Backplate for Contrast */}
                          <div className="w-16 h-16 mx-auto rounded-2xl bg-white p-2.5 shadow-md flex items-center justify-center transition-transform group-hover:scale-105">
                            {tool.logo}
                          </div>

                          <div className="text-center space-y-1">
                            <h5 className="text-base font-extrabold text-white">
                              {tool.name}
                            </h5>

                            <p className="text-[11px] font-mono text-amber-300 font-semibold leading-tight">
                              {tool.tag}
                            </p>
                          </div>

                          <p className="text-[11px] text-slate-300 leading-relaxed text-center font-normal pt-1">
                            {tool.detail}
                          </p>
                        </div>

                        <div className="pt-2.5 border-t border-slate-800/80 mt-3 flex items-center justify-between text-[10px] font-mono">
                          <span className="text-slate-400 font-bold">Tool 0{idx + 1}</span>
                          <span className="text-amber-400/90 font-medium">Standard</span>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {/* Bottom Indicator Bar */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-3 flex items-center justify-end font-mono text-xs">
              <div className="px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-amber-300 font-bold">
                0{activeStage} / 02
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
