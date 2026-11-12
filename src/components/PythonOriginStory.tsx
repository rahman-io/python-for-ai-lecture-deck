import React, { useState } from 'react';
import { Sparkles, Calendar, BookOpen, User, Globe, CheckCircle2, ShieldCheck, Heart, Award } from 'lucide-react';

import retroCoder3dImg from '../assets/images/retro_coder_3d_1794332824886.jpg';

export const PythonOriginStory: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'origin' | 'versions' | 'zen'>('origin');

  return (
    <div className="w-full max-w-5xl mx-auto space-y-3.5 select-none">
      {/* Top Header Card: Guido van Rossum & Origin Overview */}
      <div className="bg-white/95 border-2 border-slate-200/90 rounded-3xl p-4 sm:p-5 shadow-xl relative overflow-hidden">
        {/* Background Grid Pattern */}
        <div
          className="absolute inset-0 pointer-events-none opacity-10"
          style={{
            backgroundImage: 'radial-gradient(#15284f 1px, transparent 1px)',
            backgroundSize: '20px 20px',
          }}
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center relative z-10">
          {/* Creator Profile Box (7 Cols) */}
          <div className="lg:col-span-7 space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-[#15284f] text-amber-400 border-2 border-amber-400 flex items-center justify-center text-2xl shadow-md shrink-0">
                👨‍💻
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-xl sm:text-2xl font-black text-[#15284f]">
                    Guido van Rossum
                  </h3>
                  <span className="px-2 py-0.5 rounded-md bg-amber-100 text-amber-900 border border-amber-300 text-[10px] font-mono font-bold">
                    Python Creator
                  </span>
                </div>
                <p className="text-xs text-slate-600 font-medium mt-0.5">
                  Centrum Wiskunde &amp; Informatica (CWI), Netherlands
                </p>
              </div>
            </div>

            {/* Quick Fact Badges Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs font-mono">
              <div className="p-2 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-[10px] text-slate-400 block font-bold">Conceived</span>
                <span className="font-extrabold text-[#15284f]">Late 1980s</span>
              </div>
              <div className="p-2 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-[10px] text-slate-400 block font-bold">First Code</span>
                <span className="font-extrabold text-[#15284f]">Dec 1989</span>
              </div>
              <div className="p-2 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-[10px] text-slate-400 block font-bold">v0.9.0 Release</span>
                <span className="font-extrabold text-[#15284f]">1991</span>
              </div>
            </div>

            {/* Naming Origin Note */}
            <div className="p-2.5 rounded-xl bg-amber-50/80 border border-amber-200 text-xs text-amber-950 flex items-center gap-2">
              <Heart className="w-4 h-4 text-amber-600 shrink-0" />
              <p className="leading-snug font-medium">
                Named after the British comedy series <strong className="font-bold">Monty Python's Flying Circus</strong>, not the snake.
              </p>
            </div>
          </div>

          {/* 3D Diorama Image (5 Cols) */}
          <div className="lg:col-span-5 relative rounded-2xl overflow-hidden border-2 border-slate-200/90 shadow-md h-40 sm:h-44 group bg-slate-950">
            <img
              src={retroCoder3dImg}
              alt="Guido van Rossum Coding Python in Amsterdam 1989"
              className="w-full h-full object-cover object-center opacity-90 group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent flex items-end p-3">
              <span className="text-[11px] font-mono text-amber-300 font-bold bg-slate-950/80 px-2 py-1 rounded border border-amber-500/40">
                3D Diorama: CWI Amsterdam (1989)
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive History Tabs Selector */}
      <div className="bg-white/90 backdrop-blur border-2 border-slate-200/90 rounded-2xl p-2 shadow-md flex items-center justify-between gap-1 overflow-x-auto no-scrollbar">
        <button
          onClick={() => setActiveTab('origin')}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 whitespace-nowrap border ${
            activeTab === 'origin'
              ? 'bg-[#15284f] text-white border-[#f59e0b] shadow-sm'
              : 'bg-slate-100 text-slate-700 hover:bg-amber-50 border-slate-200'
          }`}
        >
          <BookOpen className="w-3.5 h-3.5" />
          <span>Origin &amp; BDFL Leadership</span>
        </button>

        <button
          onClick={() => setActiveTab('versions')}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 whitespace-nowrap border ${
            activeTab === 'versions'
              ? 'bg-[#15284f] text-white border-[#f59e0b] shadow-sm'
              : 'bg-slate-100 text-slate-700 hover:bg-amber-50 border-slate-200'
          }`}
        >
          <Calendar className="w-3.5 h-3.5" />
          <span>Major Versions (2.0 to 3.15+)</span>
        </button>

        <button
          onClick={() => setActiveTab('zen')}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 whitespace-nowrap border ${
            activeTab === 'zen'
              ? 'bg-[#15284f] text-white border-[#f59e0b] shadow-sm'
              : 'bg-slate-100 text-slate-700 hover:bg-amber-50 border-slate-200'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Zen of Python (PEP 20)</span>
        </button>
      </div>

      {/* Tab 1: Origin & BDFL Leadership */}
      {activeTab === 'origin' && (
        <div className="bg-white border-2 border-slate-200/90 rounded-2xl p-4 shadow-md space-y-3 animate-fade-in text-xs text-slate-700 leading-relaxed">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
              <h4 className="font-bold text-[#15284f] flex items-center gap-1.5 text-xs">
                <ShieldCheck className="w-4 h-4 text-amber-500" />
                Successor to ABC Language
              </h4>
              <p className="text-[11px] text-slate-600">
                Designed at CWI as a successor to the ABC programming language (inspired by SETL), with exception handling and interfacing for the Amoeba operating system.
              </p>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
              <h4 className="font-bold text-[#15284f] flex items-center gap-1.5 text-xs">
                <Award className="w-4 h-4 text-amber-500" />
                BDFL Title and Steering Council
              </h4>
              <p className="text-[11px] text-slate-600">
                Guido served as Benevolent Dictator for Life (BDFL) until July 12, 2018. In January 2019, active core developers elected a 5-member Steering Council to lead the project.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Major Version Milestones */}
      {activeTab === 'versions' && (
        <div className="bg-white border-2 border-slate-200/90 rounded-2xl p-4 shadow-md space-y-2.5 animate-fade-in text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
              <span className="px-2 py-0.5 rounded bg-[#15284f] text-white font-mono text-[10px] font-bold">
                Python 2.0 (Oct 2000)
              </span>
              <p className="text-[11px] text-slate-600 leading-snug">
                Introduced list comprehensions, cycle-detecting garbage collection, and Unicode support. Reached official end of life in 2020 with 2.7.18.
              </p>
            </div>

            <div className="p-3 rounded-xl bg-amber-50/80 border border-amber-300 space-y-1">
              <span className="px-2 py-0.5 rounded bg-amber-500 text-slate-950 font-mono text-[10px] font-extrabold">
                Python 3.0 (Dec 2008)
              </span>
              <p className="text-[11px] text-amber-950 leading-snug">
                Major language revision prioritizing clean syntax, removing legacy redundancies, and modernizing unicode and core semantics.
              </p>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
              <span className="px-2 py-0.5 rounded bg-[#15284f] text-white font-mono text-[10px] font-bold">
                Python 3.15+ (2026 Release)
              </span>
              <p className="text-[11px] text-slate-600 leading-snug">
                Python 3.15 adds frozendict and sentinel built-in types with soft keyword lazy imports. Official Android binaries available since 3.14.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Zen of Python (PEP 20) */}
      {activeTab === 'zen' && (
        <div className="bg-gradient-to-br from-[#15284f] to-[#0f1d3a] text-white border-2 border-[#15284f] rounded-2xl p-4 shadow-xl space-y-2.5 animate-fade-in">
          <div className="flex items-center justify-between border-b border-slate-700/80 pb-2">
            <span className="text-xs font-mono font-bold text-amber-400 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              The Zen of Python (PEP 20) by Tim Peters
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-amber-300">
              Core Philosophy
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono">
            <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-700/60 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Explicit is better than implicit.</span>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-700/60 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Simple is better than complex.</span>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-700/60 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Readability counts.</span>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-700/60 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
              <span>There should be one obvious way to do it.</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
