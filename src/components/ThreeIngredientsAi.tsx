import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Database, Binary, HelpCircle } from 'lucide-react';

import polishStudentImg from '../assets/images/curious_polish_female_3d_1794349646044.jpg';

interface ThreeIngredientsAiProps {
  slide: any;
  revealedBulletCount: number;
  onNextPointOrSlide?: () => void;
  theme?: string;
}

export const ThreeIngredientsAi: React.FC<ThreeIngredientsAiProps> = ({
  slide,
  revealedBulletCount,
}) => {
  const [selectedIngredient, setSelectedIngredient] = useState<number | null>(null);

  const isQuestionHookVisible = revealedBulletCount === 0;

  const ingredients = slide.visualData?.ingredients || [
    {
      num: '01',
      title: 'Data',
      desc: 'Examples, images, text, and sensory inputs to learn from',
      status: 'known',
      icon: 'database',
    },
    {
      num: '02',
      title: 'Mathematics',
      desc: 'Linear algebra, calculus, probability, and gradients',
      status: 'known',
      icon: 'math',
    },
    {
      num: '03',
      title: 'And... ?',
      desc: 'The missing engine that connects math to silicon',
      status: 'mystery',
      icon: 'question',
    },
  ];

  return (
    <div className="w-full max-w-5xl mx-auto space-y-4 select-none">
      <AnimatePresence mode="wait">
        {isQuestionHookVisible ? (
          /* =========================================================================
             STAGE 0: QUESTION HOOK SCREEN (revealedBulletCount === 0)
             3D Polish female student avatar
             ========================================================================= */
          <motion.div
            key="ingredients-hook"
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -15 }}
            transition={{ duration: 0.45 }}
            className="relative bg-white/95 border-2 border-slate-200/90 rounded-3xl p-6 sm:p-10 shadow-2xl overflow-hidden min-h-[420px] flex items-center justify-center"
          >
            {/* Watermark Background Text */}
            <div className="absolute inset-0 pointer-events-none select-none overflow-hidden opacity-[0.05] font-extrabold flex flex-col justify-between p-4 text-slate-900 leading-none">
              <span className="text-4xl sm:text-6xl font-black transform -rotate-1 translate-x-4">
                WHAT IS AI ACTUALLY BUILT FROM?
              </span>
              <span className="text-3xl sm:text-5xl font-black text-right -translate-x-8">
                WHAT IS AI ACTUALLY BUILT FROM?
              </span>
              <span className="text-4xl sm:text-6xl font-black translate-x-2">
                WHAT IS AI ACTUALLY BUILT FROM?
              </span>
              <span className="text-3xl sm:text-5xl font-black text-right translate-x-4">
                WHAT IS AI ACTUALLY BUILT FROM?
              </span>
            </div>

            {/* Hook Layout: 3D Avatar Image + Big Typography */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center relative z-10 w-full my-auto">
              <div className="md:col-span-5 flex justify-center">
                <div className="relative group">
                  <div className="absolute -inset-2 bg-gradient-to-r from-amber-400 via-orange-500 to-[#15284f] rounded-[2.5rem] opacity-30 blur-xl group-hover:opacity-50 transition duration-500" />
                  <div className="relative w-56 h-56 sm:w-64 sm:h-64 rounded-[2.2rem] overflow-hidden border-4 border-white shadow-xl bg-slate-950">
                    <img
                      src={polishStudentImg}
                      alt="3D Polish female student examining AI ingredients"
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                </div>
              </div>

              <div className="md:col-span-7 space-y-4 text-left">
                <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-[#15284f] tracking-tight leading-[1.05]">
                  What is AI actually <br />
                  <span className="bg-gradient-to-r from-[#15284f] via-amber-500 to-orange-500 bg-clip-text text-transparent">
                    built from?
                  </span>
                </h2>
                <p className="text-sm sm:text-base text-slate-600 font-medium leading-relaxed max-w-lg">
                  Two of them are obvious. What is the missing catalyst that connects math to silicon?
                </p>
              </div>
            </div>
          </motion.div>
        ) : (
          /* =========================================================================
             STAGE 1-3: THREE INGREDIENTS REVEAL (revealedBulletCount >= 1)
             ========================================================================= */
          <motion.div
            key="ingredients-reveal"
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
                  <img src={polishStudentImg} alt="Avatar" className="w-full h-full object-cover object-top" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-black text-[#15284f]">
                    Three Essential Ingredients of AI
                  </h3>
                  <p className="text-xs text-slate-500 font-medium hidden sm:block">
                    Data, Mathematics, and the Missing Catalyst
                  </p>
                </div>
              </div>

              {/* Progress Stage Dots */}
              <div className="flex items-center gap-1.5 bg-slate-100 p-1.5 rounded-xl border border-slate-200">
                {ingredients.map((_: any, idx: number) => {
                  const isRevealed = revealedBulletCount >= idx + 1;
                  return (
                    <div
                      key={idx}
                      className={`h-2.5 rounded-full transition-all duration-300 ${
                        isRevealed
                          ? 'w-5 bg-gradient-to-r from-amber-400 to-[#15284f]'
                          : 'w-2 bg-slate-300'
                      }`}
                    />
                  );
                })}
              </div>
            </div>

            {/* 3 Ingredients Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {ingredients.map((ing: any, idx: number) => {
                const isRevealed = revealedBulletCount >= idx + 1;
                const isMystery = ing.status === 'mystery';
                const isSelected = selectedIngredient === idx;

                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{
                      opacity: isRevealed ? 1 : 0.35,
                      y: 0,
                    }}
                    transition={{ duration: 0.35, delay: idx * 0.1 }}
                    onClick={() => isRevealed && setSelectedIngredient(isSelected ? null : idx)}
                    className={`relative p-6 rounded-3xl border-2 transition-all flex flex-col justify-between shadow-xl min-h-[220px] ${
                      !isRevealed
                        ? 'bg-slate-100/70 border-slate-200 text-slate-400 pointer-events-none'
                        : isMystery
                        ? 'bg-amber-500/10 border-amber-400/90 text-amber-950 ring-2 ring-amber-300/40 cursor-pointer'
                        : isSelected
                        ? 'bg-white border-[#15284f] ring-2 ring-[#15284f]/20 cursor-pointer shadow-2xl'
                        : 'bg-white border-slate-200/90 text-slate-800 hover:border-[#15284f] cursor-pointer'
                    }`}
                  >
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="w-8 h-8 rounded-full bg-[#15284f] text-amber-300 font-mono text-xs font-black flex items-center justify-center">
                          {ing.num}
                        </span>

                        <div className={`w-9 h-9 rounded-xl flex items-center justify-center border shadow-sm ${
                          isMystery
                            ? 'bg-amber-400 text-slate-950 border-amber-300'
                            : 'bg-slate-100 text-slate-700 border-slate-200'
                        }`}>
                          {idx === 0 && <Database className="w-5 h-5 text-sky-600" />}
                          {idx === 1 && <Binary className="w-5 h-5 text-indigo-600" />}
                          {idx === 2 && <HelpCircle className="w-5 h-5 text-amber-900" />}
                        </div>
                      </div>

                      <div>
                        <h4 className={`text-xl font-black ${isMystery ? 'text-amber-900' : 'text-[#15284f]'}`}>
                          {ing.title}
                        </h4>
                        <p className={`text-xs mt-1.5 leading-relaxed ${isMystery ? 'text-amber-900/80 font-medium' : 'text-slate-600'}`}>
                          {ing.desc}
                        </p>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-slate-200/60 mt-4 flex items-center justify-between text-[11px] font-mono text-slate-400 font-bold">
                      <span>Ingredient {ing.num}</span>
                      <span className={isMystery ? 'text-amber-700 font-extrabold' : 'text-slate-500'}>
                        {isMystery ? 'Mystery Catalyst' : 'Foundation'}
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Bottom Indicator Bar */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-3 flex items-center justify-end font-mono text-xs">
              <div className="px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-amber-300 font-bold">
                {Math.min(revealedBulletCount, 3)} / 3
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
