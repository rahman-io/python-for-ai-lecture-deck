import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Cpu, CheckCircle2, Layers, MessageSquare, HelpCircle } from 'lucide-react';

import futuristicAiRobotImg from '../assets/images/futuristic_ai_robot_3d_1794344220743.jpg';

interface AiDefinitionEntranceProps {
  slide: any;
  revealedBulletCount: number;
  onNextPointOrSlide?: () => void;
  theme?: string;
}

export const AiDefinitionEntrance: React.FC<AiDefinitionEntranceProps> = ({
  slide,
  revealedBulletCount,
}) => {
  const isQuestionHookVisible = revealedBulletCount === 0;

  const factList = slide.visualData?.fact || [
    { icon: 'fa-solid fa-microchip', title: 'Pattern Learning', text: 'Statistical algorithms, decision trees, regression, and data optimization' },
    { icon: 'fa-solid fa-bolt', title: 'Neural & GPU Computing', text: 'High-speed matrix math, linear algebra, and parallel GPU execution' },
  ];

  const applicationList = slide.visualData?.applications || [
    { icon: 'fa-solid fa-chart-pie', title: 'Predictive Analytics & Vision', text: 'Medical image analysis, fraud detection, and recommendation engines' },
    { icon: 'fa-solid fa-robot', title: 'Multimodal LLMs & Systems', text: 'Language models, voice, computer vision, and autonomous robotics' },
  ];

  const fictionList = slide.visualData?.fiction || [
    { icon: 'fa-solid fa-brain', title: 'Sentient Conscious AGI', text: 'Self-aware humanoid machines with feelings and intent' },
  ];

  const renderIcon = (iconVal: any, defaultFa: string) => {
    if (typeof iconVal === 'string' && iconVal.startsWith('fa-')) {
      return <i className={`${iconVal} text-sm`} />;
    }
    if (typeof iconVal === 'string' && iconVal.length <= 4) {
      return <span className="text-sm">{iconVal}</span>;
    }
    return <i className={`${defaultFa} text-sm`} />;
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-4 select-none">
      <AnimatePresence mode="wait">
        {isQuestionHookVisible ? (
          /* =========================================================================
             STAGE 1: SPECTACULAR FUTURISTIC FULL-STAGE AI ENTRANCE (revealedBulletCount === 0)
             ========================================================================= */
          <motion.div
            key="ai-entrance-hook"
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: -20 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="relative bg-gradient-to-br from-slate-950 via-[#0b132b] to-[#1c2541] border-2 border-cyan-500/40 rounded-3xl p-6 sm:p-10 shadow-[0_0_50px_rgba(6,182,212,0.15)] overflow-hidden min-h-[460px] flex items-center justify-center text-white"
          >
            {/* Ambient Background Grid & Glowing Cyber Nodes */}
            <div
              className="absolute inset-0 pointer-events-none opacity-20"
              style={{
                backgroundImage: 'radial-gradient(#06b6d4 1.5px, transparent 1.5px)',
                backgroundSize: '24px 24px',
              }}
            />

            {/* Glowing Corner Accents */}
            <div className="absolute top-0 left-0 w-32 h-32 bg-cyan-500/20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-40 h-40 bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />

            {/* Faint Repeated Watermark Text in Background */}
            <div className="absolute inset-0 pointer-events-none select-none overflow-hidden opacity-[0.05] font-black flex flex-col justify-between p-4 text-cyan-200 leading-none">
              <span className="text-5xl sm:text-7xl tracking-widest transform -rotate-1">
                WHAT IS ARTIFICIAL INTELLIGENCE?
              </span>
              <span className="text-4xl sm:text-6xl tracking-widest text-right">
                WHAT IS ARTIFICIAL INTELLIGENCE?
              </span>
              <span className="text-5xl sm:text-7xl tracking-widest">
                WHAT IS ARTIFICIAL INTELLIGENCE?
              </span>
              <span className="text-4xl sm:text-6xl tracking-widest text-right">
                WHAT IS ARTIFICIAL INTELLIGENCE?
              </span>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center relative z-10 w-full my-auto">
              {/* 3D Cyber AI Robot Image Container (5 cols) */}
              <div className="md:col-span-5 flex justify-center">
                <div className="relative group">
                  {/* Outer Holographic Cyan Glow Ring */}
                  <div className="absolute -inset-3 bg-gradient-to-r from-cyan-400 via-indigo-500 to-purple-500 rounded-[2.5rem] opacity-50 blur-xl group-hover:opacity-80 transition duration-500 animate-pulse" />

                  {/* Glassmorphism Frame with Cyber Cyan Border */}
                  <div className="relative w-60 h-60 sm:w-68 sm:h-68 rounded-[2.2rem] overflow-hidden border-2 border-cyan-400/80 shadow-2xl bg-slate-950">
                    <img
                      src={futuristicAiRobotImg}
                      alt="3D Futuristic AI Robot examining Hologram Neural Brain"
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />

                    {/* Section 03 Badge Overlay */}
                    <div className="absolute bottom-3 left-3 right-3 bg-slate-950/85 backdrop-blur-md border border-cyan-500/40 p-2 rounded-xl text-center">
                      <span className="font-mono text-[10px] uppercase font-bold tracking-widest text-cyan-300 block">
                        Section 03 • Entering AI
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Big Typography Content (7 cols) */}
              <div className="md:col-span-7 space-y-4 text-left">
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/50 text-cyan-300 text-xs font-mono font-bold shadow-inner">
                  <Cpu className="w-3.5 h-3.5 text-cyan-400" />
                  <span>The Landscape of AI</span>
                </div>

                <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.05] text-white">
                  What is AI, <br />
                  <span className="bg-gradient-to-r from-cyan-400 via-teal-300 to-indigo-400 bg-clip-text text-transparent">
                    really?
                  </span>
                </h2>

                <p className="text-sm sm:text-base text-slate-300 font-medium leading-relaxed max-w-lg">
                  Connecting Core Foundations to Modern AI Applications, leading to the Sci-Fi Discussion.
                </p>
              </div>
            </div>
          </motion.div>
        ) : (
          /* =========================================================================
             STAGE 2: CONNECTED PIPELINE WITH FONT AWESOME LINE ICONS & CURVED LINE FLOW
             ========================================================================= */
          <motion.div
            key="ai-line-pipeline"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.4 }}
            className="space-y-4"
          >
            {/* Clean Header Banner (No Step Badge) */}
            <div className="bg-gradient-to-r from-slate-900 via-[#0b132b] to-slate-900 border-2 border-cyan-500/30 rounded-2xl p-3.5 sm:p-4 shadow-xl text-white flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl overflow-hidden border-2 border-cyan-400 shrink-0 bg-slate-950 shadow-md">
                  <img src={futuristicAiRobotImg} alt="AI Avatar" className="w-full h-full object-cover" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-black text-cyan-300">
                    What AI Is vs What AI Is Not
                  </h3>
                  <p className="text-xs text-slate-400 font-medium hidden sm:block">
                    Core Foundations, Modern Applications, and Future Horizon
                  </p>
                </div>
              </div>
            </div>

            {/* Connected Curved Line Pipeline Container */}
            <div className="relative">
              {/* Background Connecting Line (Reference Screenshot Style) */}
              <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-1 z-0 overflow-hidden">
                <div className="w-full h-full bg-gradient-to-r from-emerald-500 via-amber-400 to-rose-500 opacity-40 rounded-full" />
              </div>

              {/* 3 Columns Grid: CORE FOUNDATIONS | MODERN APPLICATIONS | FUTURE HORIZON */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 relative z-10">
                {/* COLUMN 1: CORE FOUNDATIONS */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{
                    opacity: revealedBulletCount >= 1 ? 1 : 0.3,
                    y: 0,
                  }}
                  transition={{ duration: 0.4 }}
                  className={`p-4 sm:p-5 rounded-2xl border-2 transition-all shadow-xl space-y-3 relative overflow-hidden flex flex-col justify-between ${
                    revealedBulletCount >= 1
                      ? 'bg-slate-900/95 border-emerald-500/60 text-white shadow-emerald-950/20'
                      : 'bg-slate-900/40 border-slate-800 text-slate-500 pointer-events-none'
                  }`}
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between border-b border-emerald-500/30 pb-2.5">
                      <div className="flex items-center gap-2.5">
                        {/* Font Awesome Circular Line Icon Node */}
                        <div className="w-9 h-9 rounded-full bg-emerald-950 border-2 border-emerald-400 text-emerald-300 flex items-center justify-center shadow-md">
                          <i className="fa-solid fa-microchip text-sm" />
                        </div>
                        <h4 className="font-black text-emerald-300 text-sm">
                          1. Core Foundations
                        </h4>
                      </div>
                    </div>

                    <p className="text-[11px] text-emerald-200/90 font-mono font-semibold">
                      Engineering reality:
                    </p>

                    <div className="space-y-2">
                      {factList.map((item: any, idx: number) => (
                        <div key={idx} className="p-2.5 rounded-xl bg-slate-950/80 border border-emerald-900/40 space-y-1">
                          <div className="flex items-center gap-2 text-emerald-200 font-bold text-xs">
                            <span className="w-6 h-6 rounded-full bg-emerald-950/90 border border-emerald-500/50 flex items-center justify-center text-emerald-300 shrink-0">
                              {renderIcon(item.icon, 'fa-solid fa-microchip')}
                            </span>
                            <span>{item.title}</span>
                          </div>
                          <p className="text-[11px] text-slate-300 leading-normal font-normal pl-8">
                            {item.text}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {!revealedBulletCount && (
                    <div className="absolute inset-0 bg-slate-950/70 backdrop-blur-[2px] flex items-center justify-center">
                      <span className="px-2.5 py-1 rounded-full bg-slate-900 border border-emerald-500/50 text-[11px] font-mono font-bold text-emerald-300">
                        Next Point to unlock
                      </span>
                    </div>
                  )}
                </motion.div>

                {/* COLUMN 2: MODERN APPLICATIONS */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{
                    opacity: revealedBulletCount >= 2 ? 1 : 0.3,
                    y: 0,
                  }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                  className={`p-4 sm:p-5 rounded-2xl border-2 transition-all shadow-xl space-y-3 relative overflow-hidden flex flex-col justify-between ${
                    revealedBulletCount >= 2
                      ? 'bg-slate-900/95 border-amber-500/60 text-white shadow-amber-950/20'
                      : 'bg-slate-900/40 border-slate-800 text-slate-500 pointer-events-none'
                  }`}
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between border-b border-amber-500/30 pb-2.5">
                      <div className="flex items-center gap-2.5">
                        {/* Font Awesome Circular Line Icon Node */}
                        <div className="w-9 h-9 rounded-full bg-amber-950 border-2 border-amber-400 text-amber-300 flex items-center justify-center shadow-md">
                          <i className="fa-solid fa-layer-group text-sm" />
                        </div>
                        <h4 className="font-black text-amber-300 text-sm">
                          2. Modern Applications
                        </h4>
                      </div>
                    </div>

                    <p className="text-[11px] text-amber-200/90 font-mono font-semibold">
                      Real-world systems:
                    </p>

                    <div className="space-y-2">
                      {applicationList.map((item: any, idx: number) => (
                        <div key={idx} className="p-2.5 rounded-xl bg-slate-950/80 border border-amber-900/40 space-y-1">
                          <div className="flex items-center gap-2 text-amber-200 font-bold text-xs">
                            <span className="w-6 h-6 rounded-full bg-amber-950/90 border border-amber-500/50 flex items-center justify-center text-amber-300 shrink-0">
                              {renderIcon(item.icon, 'fa-solid fa-layer-group')}
                            </span>
                            <span>{item.title}</span>
                          </div>
                          <p className="text-[11px] text-slate-300 leading-normal font-normal pl-8">
                            {item.text}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {revealedBulletCount < 2 && (
                    <div className="absolute inset-0 bg-slate-950/70 backdrop-blur-[2px] flex items-center justify-center">
                      <span className="px-2.5 py-1 rounded-full bg-slate-900 border border-amber-500/50 text-[11px] font-mono font-bold text-amber-300">
                        Next Point to unlock
                      </span>
                    </div>
                  )}
                </motion.div>

                {/* COLUMN 3: FUTURE HORIZON (ONLY 1 ITEM + BOTTOM CHAT BOX) */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{
                    opacity: revealedBulletCount >= 3 ? 1 : 0.3,
                    y: 0,
                  }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                  className={`p-4 sm:p-5 rounded-2xl border-2 transition-all shadow-xl space-y-3 relative overflow-hidden flex flex-col justify-between ${
                    revealedBulletCount >= 3
                      ? 'bg-slate-900/95 border-rose-500/60 text-white shadow-rose-950/20'
                      : 'bg-slate-900/40 border-slate-800 text-slate-500 pointer-events-none'
                  }`}
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between border-b border-rose-500/30 pb-2.5">
                      <div className="flex items-center gap-2.5">
                        {/* Font Awesome Circular Line Icon Node */}
                        <div className="w-9 h-9 rounded-full bg-rose-950 border-2 border-rose-400 text-rose-300 flex items-center justify-center shadow-md">
                          <i className="fa-solid fa-brain text-sm" />
                        </div>
                        <h4 className="font-black text-rose-300 text-sm">
                          3. Future Horizon
                        </h4>
                      </div>
                    </div>

                    <p className="text-[11px] text-rose-200/90 font-mono font-semibold">
                      Sci-Fi vs future:
                    </p>

                    <div className="space-y-2">
                      {fictionList.map((item: any, idx: number) => (
                        <div key={idx} className="p-2.5 rounded-xl bg-slate-950/80 border border-rose-900/40 space-y-1">
                          <div className="flex items-center gap-2 text-rose-200 font-bold text-xs">
                            <span className="w-6 h-6 rounded-full bg-rose-950/90 border border-rose-500/50 flex items-center justify-center text-rose-300 shrink-0">
                              {renderIcon(item.icon, 'fa-solid fa-brain')}
                            </span>
                            <span>{item.title}</span>
                          </div>
                          <p className="text-[11px] text-slate-300 leading-normal font-normal pl-8">
                            {item.text}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Single Discussion Prompt with Chat Icon */}
                  <div className="p-3 rounded-xl bg-rose-950/80 border border-rose-500/50 text-xs text-rose-200 flex items-center gap-2.5 shadow-md">
                    <div className="w-7 h-7 rounded-full bg-rose-900/90 border border-rose-400 flex items-center justify-center shrink-0 text-rose-300">
                      <i className="fa-solid fa-comments text-xs" />
                    </div>
                    <span className="font-semibold leading-snug text-[11px]">
                      Will conscious AGI remain fiction forever, or will engineering bridge this gap?
                    </span>
                  </div>

                  {revealedBulletCount < 3 && (
                    <div className="absolute inset-0 bg-slate-950/70 backdrop-blur-[2px] flex items-center justify-center">
                      <span className="px-2.5 py-1 rounded-full bg-slate-900 border border-rose-500/50 text-[11px] font-mono font-bold text-rose-300">
                        Next Point to unlock
                      </span>
                    </div>
                  )}
                </motion.div>
              </div>
            </div>

            {/* Bottom Stage Progress Bar */}
            <div className="bg-gradient-to-r from-cyan-950/80 via-slate-900 to-indigo-950/80 border border-cyan-500/30 rounded-xl p-3 text-xs text-cyan-200 flex items-center justify-between font-medium">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>
                  {revealedBulletCount < 3
                    ? `Click Next Point to unlock stage ${revealedBulletCount + 1} of 3.`
                    : 'All 3 stages unlocked! Click Next Slide to explore the AI timeline.'}
                </span>
              </div>
              <span className="font-mono text-[11px] font-bold text-cyan-400">
                {revealedBulletCount} / 3 Stages
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
