import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Code, Cpu } from 'lucide-react';

import turkishStudentImg from '../assets/images/curious_hijab_female_3d_1794348778492.jpg';

interface HowAiIsSmartProps {
  slide: any;
  revealedBulletCount: number;
  onNextPointOrSlide?: () => void;
  theme?: string;
}

export const HowAiIsSmart: React.FC<HowAiIsSmartProps> = ({
  slide,
  revealedBulletCount,
}) => {
  const [selectedCard, setSelectedCard] = useState<'old' | 'ai' | null>(null);

  const isQuestionHookVisible = revealedBulletCount === 0;
  const isOldWayRevealed = revealedBulletCount >= 1;
  const isAiWayRevealed = revealedBulletCount >= 2;

  const oldWay = slide.visualData?.oldWay || {
    title: 'Traditional Programming',
    subtitle: 'Write every rule by hand',
    formula: 'Rules + Data  ➔  Answers',
    analogy: 'Like writing a 10,000-page cooking manual with every possible kitchen scenario.',
  };

  const aiWay = slide.visualData?.aiWay || {
    title: 'Machine Learning (AI)',
    subtitle: 'Show it examples, it discovers the rules',
    formula: 'Data + Answers  ➔  Rules (Patterns)',
    analogy: 'Like tasting 500 great soups until your taste buds know the secret spice ratio.',
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-4 select-none">
      <AnimatePresence mode="wait">
        {isQuestionHookVisible ? (
          /* =========================================================================
             STAGE 0: QUESTION HOOK SCREEN (revealedBulletCount === 0)
             3D Turkish female student with hijab avatar
             ========================================================================= */
          <motion.div
            key="how-ai-smart-hook"
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -15 }}
            transition={{ duration: 0.45 }}
            className="relative bg-white/95 border-2 border-slate-200/90 rounded-3xl p-6 sm:p-10 shadow-2xl overflow-hidden min-h-[420px] flex items-center justify-center"
          >
            {/* Watermark Background Text */}
            <div className="absolute inset-0 pointer-events-none select-none overflow-hidden opacity-[0.05] font-extrabold flex flex-col justify-between p-4 text-slate-900 leading-none">
              <span className="text-5xl sm:text-7xl font-black transform -rotate-1 translate-x-8">
                HOW CAN AI BE SMART?
              </span>
              <span className="text-4xl sm:text-6xl font-black text-right -translate-x-12">
                HOW CAN AI BE SMART?
              </span>
              <span className="text-5xl sm:text-7xl font-black translate-x-4">
                HOW CAN AI BE SMART?
              </span>
              <span className="text-4xl sm:text-6xl font-black text-right translate-x-8">
                HOW CAN AI BE SMART?
              </span>
            </div>

            {/* Hook Layout: 3D Avatar Image + Big Typography */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center relative z-10 w-full my-auto">
              <div className="md:col-span-5 flex justify-center">
                <div className="relative group">
                  <div className="absolute -inset-2 bg-gradient-to-r from-cyan-500 to-indigo-600 rounded-[2.5rem] opacity-30 blur-xl group-hover:opacity-50 transition duration-500" />
                  <div className="relative w-56 h-56 sm:w-64 sm:h-64 rounded-[2.2rem] overflow-hidden border-4 border-white shadow-xl bg-slate-950">
                    <img
                      src={turkishStudentImg}
                      alt="3D Turkish female student examining AI paradigm shift"
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                </div>
              </div>

              <div className="md:col-span-7 space-y-4 text-left">
                <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-[#15284f] tracking-tight leading-[1.05]">
                  How can AI be <br />
                  <span className="bg-gradient-to-r from-[#15284f] via-cyan-600 to-indigo-600 bg-clip-text text-transparent">
                    "smart"?
                  </span>
                </h2>
                <p className="text-sm sm:text-base text-slate-600 font-medium leading-relaxed max-w-lg">
                  Inverting the traditional computer engineering formula: from writing 10,000 fragile rules to inferring patterns directly from data.
                </p>
              </div>
            </div>
          </motion.div>
        ) : (
          /* =========================================================================
             STAGE 1 & 2: PARADIGM COMPARISON (TRADITIONAL VS MACHINE LEARNING)
             ========================================================================= */
          <motion.div
            key="how-ai-smart-comparison"
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.4 }}
            className="space-y-4"
          >
            {/* Header Bar */}
            <div className="bg-white/95 border-2 border-slate-200/90 rounded-2xl p-3 sm:p-4 shadow-md flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl overflow-hidden border-2 border-cyan-400 shrink-0 bg-slate-900 shadow-sm">
                  <img src={turkishStudentImg} alt="Avatar" className="w-full h-full object-cover object-top" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-black text-[#15284f]">
                    The Programming Paradigm Shift
                  </h3>
                  <p className="text-xs text-slate-500 font-medium hidden sm:block">
                    Traditional Rule-Based Code vs Machine Learning Pattern Recognition
                  </p>
                </div>
              </div>

              {/* Progress Stage Indicator */}
              <div className="flex items-center gap-1.5 bg-slate-100 p-1.5 rounded-xl border border-slate-200 font-mono text-xs font-bold text-slate-700">
                <span className={isOldWayRevealed ? 'text-amber-600' : 'text-slate-400'}>Traditional</span>
                <span className="text-slate-400">➔</span>
                <span className={isAiWayRevealed ? 'text-cyan-600 font-black' : 'text-slate-400'}>Machine Learning</span>
              </div>
            </div>

            {/* 2 Paradigm Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Card 1: Traditional Programming */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4 }}
                onClick={() => setSelectedCard(selectedCard === 'old' ? null : 'old')}
                className={`p-6 rounded-3xl border-2 transition-all cursor-pointer shadow-xl flex flex-col justify-between ${
                  selectedCard === 'old'
                    ? 'bg-white border-amber-500 ring-2 ring-amber-300 shadow-2xl'
                    : 'bg-white/95 border-slate-200 text-slate-800 hover:border-[#15284f]'
                }`}
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-700 font-mono text-xs font-black border border-slate-200">
                      Traditional Paradigm
                    </span>
                    <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-800 border border-amber-300 flex items-center justify-center">
                      <Code className="w-4 h-4" />
                    </div>
                  </div>

                  <div>
                    <h4 className="text-lg font-black text-[#15284f]">
                      {oldWay.title}
                    </h4>
                    <p className="text-xs text-slate-500 font-medium">
                      {oldWay.subtitle}
                    </p>
                  </div>

                  {/* Formula Box */}
                  <div className="p-4 rounded-2xl bg-slate-900 text-amber-300 font-mono text-sm font-bold text-center border-2 border-slate-800 shadow-inner">
                    {oldWay.formula}
                  </div>

                  {/* Analogy */}
                  <div className="p-3.5 rounded-xl bg-amber-50/80 border border-amber-200/80 text-xs text-amber-950 italic leading-relaxed">
                    "{oldWay.analogy}"
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 mt-4 flex items-center justify-between text-[11px] font-mono text-slate-500 font-bold">
                  <span>Paradigm 01</span>
                  <span className="text-amber-600 font-extrabold">Hand-Written Rules</span>
                </div>
              </motion.div>

              {/* Card 2: Machine Learning (AI) */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{
                  opacity: isAiWayRevealed ? 1 : 0.35,
                  x: 0,
                }}
                transition={{ duration: 0.4, delay: 0.1 }}
                onClick={() => isAiWayRevealed && setSelectedCard(selectedCard === 'ai' ? null : 'ai')}
                className={`relative p-6 rounded-3xl border-2 transition-all shadow-xl flex flex-col justify-between ${
                  !isAiWayRevealed
                    ? 'bg-slate-100/70 border-slate-200 text-slate-400 pointer-events-none'
                    : selectedCard === 'ai'
                    ? 'bg-slate-900 text-white border-cyan-400 ring-2 ring-cyan-400/40 shadow-2xl cursor-pointer'
                    : 'bg-slate-900 text-white border-slate-800 hover:border-cyan-400 cursor-pointer'
                }`}
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 rounded-full bg-cyan-950 text-cyan-300 font-mono text-xs font-black border border-cyan-800">
                      Machine Learning (AI)
                    </span>
                    <div className="w-8 h-8 rounded-full bg-cyan-900/60 text-cyan-300 border border-cyan-700 flex items-center justify-center">
                      <Cpu className="w-4 h-4" />
                    </div>
                  </div>

                  <div>
                    <h4 className="text-lg font-black text-white">
                      {aiWay.title}
                    </h4>
                    <p className="text-xs text-slate-400 font-medium">
                      {aiWay.subtitle}
                    </p>
                  </div>

                  {/* Formula Box */}
                  <div className="p-4 rounded-2xl bg-slate-950 text-cyan-300 font-mono text-sm font-bold text-center border-2 border-cyan-500/40 shadow-inner">
                    {aiWay.formula}
                  </div>

                  {/* Analogy */}
                  <div className="p-3.5 rounded-xl bg-cyan-950/60 border border-cyan-800/80 text-xs text-cyan-200 italic leading-relaxed">
                    "{aiWay.analogy}"
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-800 mt-4 flex items-center justify-between text-[11px] font-mono text-slate-400 font-bold">
                  <span>Paradigm 02</span>
                  <span className="text-cyan-400 font-extrabold">Inferred Patterns</span>
                </div>
              </motion.div>
            </div>

            {/* Bottom Indicator Bar */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-3 flex items-center justify-end font-mono text-xs">
              <div className="px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-cyan-300 font-bold">
                {isAiWayRevealed ? '2 / 2' : '1 / 2'}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
