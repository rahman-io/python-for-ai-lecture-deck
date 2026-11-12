import React, { useState } from 'react';
import { Globe, Sparkles, Cpu, Code, BarChart3, Rocket } from 'lucide-react';

import aiSectorImg from '../assets/images/python_sector_ai_3d_1794339949580.jpg';
import webSectorImg from '../assets/images/python_sector_web_3d_1794339949702.jpg';
import dataSectorImg from '../assets/images/python_sector_datascience_3d_1794339951304.jpg';
import globalSectorImg from '../assets/images/python_sector_global_industry_3d_1794339950827.jpg';

export interface SectorItem {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  badge: string;
  icon: React.ReactNode;
  detail: string;
}

const PYTHON_SECTORS: SectorItem[] = [
  {
    id: 'ai',
    title: 'AI & Machine Learning',
    subtitle: 'Neural Networks, PyTorch & TensorFlow',
    image: aiSectorImg,
    badge: '> 80% Industry Standard',
    icon: <Cpu className="w-4 h-4 text-amber-500" />,
    detail: 'Powers deep learning models, generative AI LLMs, computer vision, and autonomous neural systems globally.',
  },
  {
    id: 'web',
    title: 'Web & Cloud APIs',
    subtitle: 'FastAPI, Django & Microservices',
    image: webSectorImg,
    badge: 'High Throughput APIs',
    icon: <Code className="w-4 h-4 text-sky-500" />,
    detail: 'High-performance backend web servers, cloud endpoints, microservices, and serverless infrastructure.',
  },
  {
    id: 'datascience',
    title: 'Data Science & Analytics',
    subtitle: 'Pandas, NumPy & Jupyter Ecosystem',
    image: dataSectorImg,
    badge: '#1 Analytics Language',
    icon: <BarChart3 className="w-4 h-4 text-emerald-500" />,
    detail: 'Statistical modeling, financial quant analysis, data mining, and scientific visualization.',
  },
  {
    id: 'global',
    title: 'Diverse Global Industries',
    subtitle: 'NASA Aerospace, Finance & Biotech',
    image: globalSectorImg,
    badge: 'Global Industry Standard',
    icon: <Rocket className="w-4 h-4 text-purple-500" />,
    detail: 'Used by NASA for space telemetry, Wall Street banks for quant trading, and CERN for particle physics.',
  },
];

// Official Python Logo SVG component
export const PythonOfficialLogo: React.FC<{ className?: string }> = ({ className = 'w-12 h-12' }) => (
  <svg className={className} viewBox="0 0 110 110" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M54.12 1.5c-26.17 0-24.54 11.35-24.54 11.35l.03 11.75h24.87v3.52H20.08S1.5 25.9 1.5 52.3c0 26.4 16.14 25.43 16.14 25.43h9.64v-13.6c0-15.33 13.06-15.38 13.06-15.38h24.5s12.56.2 12.56-12.28V14.1s2.05-12.6-23.28-12.6zm-13.2 7.74a3.86 3.86 0 1 1 0 7.72 3.86 3.86 0 0 1 0-7.72z"
      fill="url(#py-blue)"
    />
    <path
      d="M55.88 108.5c26.17 0 24.54-11.35 24.54-11.35l-.03-11.75H55.52v-3.52h34.4s18.58 2.22 18.58-24.18c0-26.4-16.14-25.43-16.14-25.43h-9.64v13.6c0 15.33-13.06 15.38-13.06 15.38h-24.5s-12.56-.2-12.56 12.28V95.9s-2.05 12.6 23.28 12.6zm13.2-7.74a3.86 3.86 0 1 1 0-7.72 3.86 3.86 0 0 1 0 7.72z"
      fill="url(#py-yellow)"
    />
    <defs>
      <linearGradient id="py-blue" x1="1.5" y1="1.5" x2="70" y2="70" gradientUnits="userSpaceOnUse">
        <stop stopColor="#3776AB" />
        <stop offset="1" stopColor="#1E415E" />
      </linearGradient>
      <linearGradient id="py-yellow" x1="40" y1="40" x2="108.5" y2="108.5" gradientUnits="userSpaceOnUse">
        <stop stopColor="#FFD43B" />
        <stop offset="1" stopColor="#FFE873" />
      </linearGradient>
    </defs>
  </svg>
);

export const PythonZoomReveal: React.FC = () => {
  const [activeSectorId, setActiveSectorId] = useState<string>('ai');

  const activeSector = PYTHON_SECTORS.find((s) => s.id === activeSectorId) || PYTHON_SECTORS[0];

  return (
    <div className="w-full max-w-5xl mx-auto space-y-3.5 select-none">
      {/* Central Interactive Hub: Official Python Logo + Global Standard Badge Side-by-Side */}
      <div className="relative bg-white/95 border-2 border-slate-200/90 rounded-3xl p-4 sm:p-5 shadow-xl overflow-hidden">
        {/* Background Grid Pattern */}
        <div
          className="absolute inset-0 pointer-events-none opacity-10"
          style={{
            backgroundImage: 'radial-gradient(#15284f 1px, transparent 1px)',
            backgroundSize: '20px 20px',
          }}
        />

        {/* Central Logo Header with Global Standard Badge placed alongside without overlap */}
        <div className="relative z-10 text-center space-y-1.5 max-w-2xl mx-auto">
          <div className="flex items-center justify-center gap-3 flex-wrap">
            <div className="p-2.5 rounded-2xl bg-gradient-to-tr from-[#15284f] to-[#1e3a8a] border-2 border-amber-400 shadow-xl flex items-center justify-center">
              <PythonOfficialLogo className="w-10 h-10 sm:w-12 sm:h-12 drop-shadow-md" />
            </div>

            {/* Straight single-line Global Standard badge beside logo */}
            <div className="px-3.5 py-1.5 rounded-xl bg-[#f59e0b] text-white text-xs font-mono font-black shadow-md flex items-center gap-1.5 border border-white/80 whitespace-nowrap">
              <Globe className="w-4 h-4 text-white shrink-0 animate-pulse" />
              <span>Global Standard</span>
            </div>
          </div>

          <h2 className="text-3xl sm:text-4xl font-black text-[#15284f] tracking-tight">
            Python
          </h2>
          <p className="text-xs sm:text-sm font-medium text-slate-600 italic">
            "One name keeps rising to the top across every major technology sector."
          </p>
        </div>

        {/* 4 Crisp 3D Sector Cards Surrounding the Hub */}
        <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-3">
          {PYTHON_SECTORS.map((sector) => {
            const isActive = activeSectorId === sector.id;
            return (
              <div
                key={sector.id}
                onClick={() => setActiveSectorId(sector.id)}
                className={`relative rounded-2xl overflow-hidden border-2 transition-all cursor-pointer flex flex-col justify-between group bg-white ${
                  isActive
                    ? 'border-[#f59e0b] shadow-xl ring-2 ring-amber-400/50 scale-[1.02]'
                    : 'border-slate-200/90 hover:border-amber-300 shadow-sm hover:shadow-md'
                }`}
              >
                {/* Top Badge Label Header */}
                <div className="p-2 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
                  <span className={`px-2 py-0.5 rounded-md text-[10px] font-mono font-extrabold flex items-center gap-1.5 border ${
                    isActive
                      ? 'bg-[#15284f] text-amber-400 border-[#15284f]'
                      : 'bg-white text-slate-700 border-slate-200'
                  }`}>
                    {sector.icon}
                    <span>{sector.badge}</span>
                  </span>
                  {isActive && <Sparkles className="w-3.5 h-3.5 text-amber-500" />}
                </div>

                {/* 3D Visual Image Container (Vivid 3D Render without text overlay inside image) */}
                <div className="relative w-full h-28 sm:h-32 overflow-hidden bg-slate-100">
                  <img
                    src={sector.image}
                    alt={sector.title}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                  {isActive && (
                    <div className="absolute inset-0 border-2 border-amber-400 pointer-events-none" />
                  )}
                </div>

                {/* Card Footer Selection Status */}
                <div className={`p-2 text-center text-[10px] font-mono font-bold border-t ${
                  isActive
                    ? 'bg-[#15284f] text-amber-400 border-[#15284f]'
                    : 'bg-slate-50 text-slate-500 border-slate-100 group-hover:text-slate-800'
                }`}>
                  {isActive ? 'Active Sector' : sector.title}
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Active Sector Spotlight Panel */}
        <div className="relative z-10 mt-3 p-3.5 rounded-2xl bg-[#15284f] text-white border-2 border-amber-400 shadow-lg flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2.5">
            <span className="p-2 rounded-xl bg-amber-500 text-slate-950 font-bold shrink-0">
              {activeSector.icon}
            </span>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-extrabold text-amber-400">
                  {activeSector.title}
                </span>
                <span className="text-[11px] font-mono text-slate-300">
                  ({activeSector.subtitle})
                </span>
              </div>
              <p className="text-xs text-slate-200 font-medium leading-snug mt-0.5">
                {activeSector.detail}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Global Adoption Metrics Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-4xl mx-auto">
        <div className="p-3.5 rounded-2xl bg-white border-2 border-slate-200/90 shadow-md text-center space-y-0.5">
          <div className="text-xl sm:text-2xl font-black font-mono text-[#f59e0b]">
            18+ Million
          </div>
          <p className="text-xs font-bold text-[#15284f]">
            Active Global Engineers
          </p>
        </div>

        <div className="p-3.5 rounded-2xl bg-white border-2 border-slate-200/90 shadow-md text-center space-y-0.5">
          <div className="text-xl sm:text-2xl font-black font-mono text-[#f59e0b]">
            &gt; 80%
          </div>
          <p className="text-xs font-bold text-[#15284f]">
            AI &amp; Data Science Market Share
          </p>
        </div>

        <div className="p-3.5 rounded-2xl bg-white border-2 border-slate-200/90 shadow-md text-center space-y-0.5">
          <div className="text-xl sm:text-2xl font-black font-mono text-[#f59e0b]">
            #1 Globally
          </div>
          <p className="text-xs font-bold text-[#15284f]">
            First-Language Choice for Developers
          </p>
        </div>
      </div>
    </div>
  );
};
