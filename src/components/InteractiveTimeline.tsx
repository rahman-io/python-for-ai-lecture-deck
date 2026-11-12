import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Play, Pause, Cpu, Globe, Cloud, Bot, Clock } from 'lucide-react';

import era1Img from '../assets/images/timeline_era1_3d_1794338174721.jpg';
import era2Img from '../assets/images/timeline_era2_3d_1794338175823.jpg';
import era3Img from '../assets/images/timeline_era3_3d_1794338176929.jpg';
import era4Img from '../assets/images/timeline_era4_3d_1794338177123.jpg';
import era5Img from '../assets/images/timeline_era5_3d_1794338176301.jpg';

export interface MilestoneItem {
  year: string;
  lang: string;
  desc: string;
  tag?: string;
  isHighlight?: boolean;
}

export interface TimelineEra {
  id: number;
  period: string;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  image: string;
  accent: string;
  badgeBg: string;
  milestones: MilestoneItem[];
}

export const TIMELINE_ERAS: TimelineEra[] = [
  {
    id: 1,
    period: '1940s - 1950s',
    title: 'Early Era & First High-Level Languages',
    subtitle: 'From Machine Code and Vacuum Tubes to FORTRAN & LISP',
    icon: <Cpu className="w-4 h-4 text-amber-500" />,
    image: era1Img,
    accent: '#f59e0b',
    badgeBg: 'bg-amber-100 text-amber-900 border-amber-300',
    milestones: [
      { year: '1940s', lang: 'Machine Code (1GL)', desc: 'Computers read raw binary code directly (0s and 1s).', tag: '1GL Hardware' },
      { year: '1942-1945', lang: 'Plankalkül', desc: 'Created by Konrad Zuse; considered the first high-level language in history.', tag: 'First High Level', isHighlight: true },
      { year: '1949', lang: 'Assembly (2GL)', desc: 'Introduced mnemonic symbols (like MOV and ADD) to simplify hardware instructions.', tag: 'Mnemonics' },
      { year: '1957', lang: 'FORTRAN', desc: 'Developed by John Backus at IBM; the first successful commercial high-level language for science and math.', tag: 'IBM Commercial', isHighlight: true },
      { year: '1958', lang: 'LISP', desc: 'Created by John McCarthy, focusing on early artificial intelligence research.', tag: 'Early AI Pioneer' },
      { year: '1959', lang: 'COBOL', desc: 'Developed by a team including Grace Hopper for business and administrative applications.', tag: 'Business Standard' },
    ],
  },
  {
    id: 2,
    period: '1960s - 1980s',
    title: 'Minicomputer Era & New Paradigms',
    subtitle: 'Structured Programming, C Language, and Object-Oriented Pioneers',
    icon: <Clock className="w-4 h-4 text-sky-500" />,
    image: era2Img,
    accent: '#0284c7',
    badgeBg: 'bg-sky-100 text-sky-900 border-sky-300',
    milestones: [
      { year: '1964', lang: 'BASIC', desc: 'Designed by John G. Kemeny & Thomas E. Kurtz for beginners to learn programming easily.', tag: 'Beginner Friendly' },
      { year: '1970', lang: 'Pascal', desc: 'Created by Niklaus Wirth for structured programming education.', tag: 'Structured Code' },
      { year: '1972', lang: 'C', desc: 'Created by Dennis Ritchie at Bell Labs; became the main foundation for operating systems and future languages.', tag: 'System Foundation', isHighlight: true },
      { year: '1972', lang: 'Prolog & Smalltalk', desc: 'Prolog for logic and AI; Smalltalk pioneered object-oriented programming (OOP).', tag: 'OOP & Logic AI' },
      { year: '1980-1983', lang: 'C++', desc: 'Developed by Bjarne Stroustrup as an extension of C with object-oriented features.', tag: 'OOP Extension', isHighlight: true },
      { year: '1984', lang: 'MATLAB & Objective-C', desc: 'MATLAB for numerical computing; Objective-C for Apple application development.', tag: 'Math & Apple' },
    ],
  },
  {
    id: 3,
    period: '1990s',
    title: 'Internet and Web Revolution Era',
    subtitle: 'The Birth of Python, Java, JavaScript & Web Backends',
    icon: <Globe className="w-4 h-4 text-emerald-500" />,
    image: era3Img,
    accent: '#10b981',
    badgeBg: 'bg-emerald-100 text-emerald-900 border-emerald-300',
    milestones: [
      { year: '1990', lang: 'Haskell', desc: 'Pure functional programming language with strong static typing.', tag: 'Pure Functional' },
      { year: '1991', lang: 'Python', desc: 'Released by Guido van Rossum, prioritizing code readability and clean syntax.', tag: 'Clean Syntax', isHighlight: true },
      { year: '1993', lang: 'Lua & R', desc: 'Lua for lightweight embedded scripting; R for statistical data computing.', tag: 'Embedded & Stats' },
      { year: '1995', lang: 'Java, JS, PHP, Ruby', desc: 'The web revolution year: Java (cross-platform), JS (browser interactivity), PHP (web backend), Ruby (elegant syntax).', tag: 'Web Revolution', isHighlight: true },
    ],
  },
  {
    id: 4,
    period: '2000s - 2010s',
    title: 'Cloud, Mobile, and Modern Systems Era',
    subtitle: 'Distributed Systems, Memory Safety & Strict Typing',
    icon: <Cloud className="w-4 h-4 text-purple-500" />,
    image: era4Img,
    accent: '#8b5cf6',
    badgeBg: 'bg-purple-100 text-purple-900 border-purple-300',
    milestones: [
      { year: '2001', lang: 'C#', desc: 'Developed by Microsoft for the .NET application ecosystem.', tag: '.NET Enterprise' },
      { year: '2006', lang: 'Rust', desc: 'Initial development by Mozilla focusing on memory safety without garbage collection.', tag: 'Memory Safe', isHighlight: true },
      { year: '2007', lang: 'Swift (Early) & Clojure', desc: 'Enriched the ecosystem with concurrency and functional scripting.', tag: 'Concurrency' },
      { year: '2009', lang: 'Go & Julia', desc: 'Go by Google for cloud server efficiency; Julia for fast scientific computing.', tag: 'Cloud & Science' },
      { year: '2011', lang: 'Kotlin & Dart', desc: 'Kotlin became the official Android language; Dart developed by Google.', tag: 'Mobile Platforms' },
      { year: '2012', lang: 'TypeScript', desc: 'Released by Microsoft as a JavaScript superset with strict typing support.', tag: 'Strict Types', isHighlight: true },
      { year: '2014-2015', lang: 'Solidity, Swift & Zig', desc: 'Solidity (blockchain smart contracts), Swift (native iOS), Zig (modern C alternative).', tag: 'Blockchain & Systems' },
    ],
  },
  {
    id: 5,
    period: '2020s - 2026',
    title: 'Artificial Intelligence Era & Current Trends',
    subtitle: 'AI Integration Dominance, Mojo, PyScript & Future Computing',
    icon: <Bot className="w-4 h-4 text-rose-500" />,
    image: era5Img,
    accent: '#f43f5e',
    badgeBg: 'bg-rose-100 text-rose-900 border-rose-300',
    milestones: [
      { year: '2020', lang: 'Carbon', desc: 'Experimental language designed as a successor to C++.', tag: 'C++ Successor' },
      { year: '2022', lang: 'PyScript', desc: 'Allows Python to run directly inside client-side web browsers.', tag: 'Python in Browser' },
      { year: '2023', lang: 'Mojo', desc: 'Designed specifically for high-performance AI hardware and compatible with Python.', tag: 'AI Accelerator', isHighlight: true },
      { year: '2024', lang: 'Pkl', desc: 'New data configuration language created by Apple.', tag: 'Data Config' },
      { year: '2026', lang: 'Global AI Integration Dominance', desc: 'Programming landscape dominated by AI integration; Python, JS/TS, Go, Rust, and Java remain top industry choices.', tag: 'Global AI Standard', isHighlight: true },
    ],
  },
];

export const InteractiveTimeline: React.FC = () => {
  const [activeEraId, setActiveEraId] = useState<number>(1);
  const [selectedMilestoneIdx, setSelectedMilestoneIdx] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const activeEra = TIMELINE_ERAS.find((e) => e.id === activeEraId) || TIMELINE_ERAS[0];

  // Auto slideshow timer
  React.useEffect(() => {
    let timer: any;
    if (isPlaying) {
      timer = setInterval(() => {
        setActiveEraId((prev) => (prev % TIMELINE_ERAS.length) + 1);
        setSelectedMilestoneIdx(null);
      }, 4500);
    }
    return () => clearInterval(timer);
  }, [isPlaying]);

  const handleNext = () => {
    setActiveEraId((prev) => (prev % TIMELINE_ERAS.length) + 1);
    setSelectedMilestoneIdx(null);
  };

  const handlePrev = () => {
    setActiveEraId((prev) => (prev === 1 ? TIMELINE_ERAS.length : prev - 1));
    setSelectedMilestoneIdx(null);
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-3 sm:space-y-4 select-none">
      {/* Top Era Selector Tabs / Progress Bar */}
      <div className="bg-white/90 backdrop-blur border-2 border-slate-200/90 rounded-2xl p-2 sm:p-2.5 shadow-md flex flex-wrap items-center justify-between gap-1.5 sm:gap-2">
        <div className="flex items-center gap-1 sm:gap-1.5 overflow-x-auto py-1 px-0.5 no-scrollbar max-w-full">
          {TIMELINE_ERAS.map((era) => {
            const isActive = era.id === activeEraId;
            return (
              <button
                key={era.id}
                onClick={() => {
                  setActiveEraId(era.id);
                  setSelectedMilestoneIdx(null);
                }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap shrink-0 border ${
                  isActive
                    ? 'bg-[#15284f] text-white border-[#f59e0b] shadow-md scale-[1.02]'
                    : 'bg-slate-100/80 text-slate-700 border-slate-200 hover:bg-amber-50 hover:border-amber-300'
                }`}
              >
                {era.icon}
                <span>{era.period}</span>
              </button>
            );
          })}
        </div>

        {/* Controls */}
        <div className="flex items-center gap-1 shrink-0 ml-auto">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className={`p-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition ${
              isPlaying ? 'bg-amber-500 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
            title={isPlaying ? 'Pause Auto-Play' : 'Play Auto-Play'}
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
          </button>
          <button
            onClick={handlePrev}
            className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition"
            title="Previous Era"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={handleNext}
            className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition"
            title="Next Era"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Active Era Grid (Left: 3D Illustration, Right: Milestones) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5 sm:gap-4 items-stretch">
        {/* Left Column: 3D Animated Illustration Visual Card (5 Cols) */}
        <div className="lg:col-span-5 relative rounded-2xl overflow-hidden border-2 border-slate-200/90 bg-gradient-to-br from-slate-900 to-slate-950 shadow-xl flex flex-col justify-between p-3.5 sm:p-4 text-white group">
          {/* Background 3D Image with Smooth Motion Zoom Effect */}
          <div className="absolute inset-0 z-0">
            <img
              src={activeEra.image}
              alt={activeEra.title}
              className="w-full h-full object-cover object-center opacity-85 group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
          </div>

          {/* Top Era Badge Overlay */}
          <div className="relative z-10 flex items-center justify-between">
            <span className={`px-3 py-1 rounded-full text-xs font-extrabold border ${activeEra.badgeBg} shadow-sm flex items-center gap-1.5`}>
              {activeEra.icon}
              {activeEra.period}
            </span>
            <span className="text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-md bg-black/60 backdrop-blur text-amber-400 border border-amber-500/40">
              Era {activeEra.id} / 5
            </span>
          </div>

          {/* Bottom Card Title & Subtitle Overlay */}
          <div className="relative z-10 space-y-1.5 pt-20">
            <h3 className="text-lg sm:text-xl font-extrabold text-white leading-tight drop-shadow-md">
              {activeEra.title}
            </h3>
            <p className="text-xs text-slate-300 font-medium leading-relaxed drop-shadow-sm">
              {activeEra.subtitle}
            </p>
          </div>
        </div>

        {/* Right Column: Complete Interactive Milestones List (7 Cols) */}
        <div className="lg:col-span-7 bg-white/95 border-2 border-slate-200/90 rounded-2xl p-4 sm:p-5 shadow-md flex flex-col justify-between space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#f59e0b] animate-pulse" />
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#15284f]">
                Language Evolution Chronology ({activeEra.period})
              </h4>
            </div>
            <span className="text-[11px] text-slate-500 font-mono">
              {activeEra.milestones.length} Milestones
            </span>
          </div>

          {/* Milestone Cards Grid with generous internal padding so borders and rings are never clipped */}
          <div className="overflow-y-auto max-h-[320px] p-2.5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
              {activeEra.milestones.map((item, idx) => {
                const isSelected = selectedMilestoneIdx === idx;
                return (
                  <div
                    key={idx}
                    onClick={() => setSelectedMilestoneIdx(isSelected ? null : idx)}
                    className={`p-3 rounded-xl border-2 transition-all cursor-pointer flex flex-col justify-between space-y-1.5 ${
                      isSelected
                        ? 'bg-amber-50/90 border-amber-400 shadow-md ring-2 ring-amber-400/40'
                        : item.isHighlight
                        ? 'bg-gradient-to-r from-amber-50/60 to-white border-amber-200 hover:border-amber-400 shadow-sm'
                        : 'bg-slate-50/80 border-slate-200/90 hover:bg-white hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-1">
                      <span className="px-2 py-0.5 rounded-md text-[11px] font-mono font-extrabold bg-[#15284f] text-white">
                        {item.year}
                      </span>
                      {item.tag && (
                        <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-amber-100 text-amber-900 font-semibold">
                          {item.tag}
                        </span>
                      )}
                    </div>
                    <div>
                      <h5 className="text-xs font-extrabold text-[#15284f] flex items-center gap-1">
                        {item.lang}
                      </h5>
                      <p className="text-[11px] text-slate-600 leading-snug line-clamp-2 mt-0.5 font-normal">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
