import React from 'react';
import { motion } from 'motion/react';
import { Sparkles } from 'lucide-react';

import arabHijabAiPythonImg from '../assets/images/arab_hijab_ai_python_3d_1794351700842.jpg';

interface CourseCoverProps {
  slide: any;
  revealedBulletCount: number;
  onNextPointOrSlide?: () => void;
  theme?: string;
}

export const CourseCover: React.FC<CourseCoverProps> = ({
  slide,
}) => {
  return (
    <div className="w-full max-w-5xl mx-auto space-y-4 select-none">
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.45 }}
        className="relative bg-gradient-to-r from-slate-950 via-[#0a1128] to-slate-950 border-2 border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl overflow-hidden min-h-[460px] flex items-center"
      >
        {/* Background Decorative Glow */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/15 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-500/15 rounded-full blur-3xl" />
        </div>

        {/* Layout Grid: 7 Cols Text, 5 Cols 3D Character Artwork */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center relative z-10 w-full my-auto">
          <div className="md:col-span-7 space-y-5 text-left">
            <div className="space-y-2">
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white leading-[1.05]">
                Python for <br />
                <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-cyan-400 bg-clip-text text-transparent">
                  Artificial Intelligence
                </span>
              </h1>
            </div>
          </div>

          {/* 3D Arab Female Student with Hijab, Python & AI Artwork (5 cols) */}
          <div className="md:col-span-5 flex justify-center">
            <div className="relative group max-w-xs sm:max-w-sm w-full">
              <div className="absolute -inset-2 bg-gradient-to-r from-amber-500 to-cyan-500 rounded-[2.5rem] opacity-30 blur-xl group-hover:opacity-50 transition duration-500" />
              <div className="relative rounded-[2.2rem] overflow-hidden border-4 border-slate-800 shadow-2xl bg-slate-900 aspect-square">
                <img
                  src={arabHijabAiPythonImg}
                  alt="3D Arab Female Student with Hijab, Python and AI Symbols"
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
