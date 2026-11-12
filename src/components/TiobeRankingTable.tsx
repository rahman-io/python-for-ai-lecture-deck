import React, { useState } from 'react';
import { Search, Trophy, TrendingUp, TrendingDown, ExternalLink, Sparkles, ChevronUp, ChevronDown, Minus } from 'lucide-react';

export interface LanguageRank {
  rank: number;
  prevRank: number;
  name: string;
  rating: number; // percentage, e.g. 20.86
  change: number; // percentage change, e.g. -2.51
  category: string;
  isLeader?: boolean;
  useCase: string;
  paradigm: string;
}

// 100% EXACT DATA FROM THE TIOBE INDEX TABLE PROVIDED BY THE USER
export const TIOBE_DATA: LanguageRank[] = [
  { rank: 1, prevRank: 1, name: 'Python', rating: 20.86, change: -2.51, category: 'AI & Data Science', isLeader: true, useCase: 'Artificial Intelligence, Machine Learning, Data Analytics, Web APIs', paradigm: 'Multi-paradigm, Dynamic' },
  { rank: 2, prevRank: 2, name: 'C', rating: 11.48, change: 1.80, category: 'Embedded & Systems', useCase: 'Operating System Kernels, Embedded Devices, Hardware Drivers', paradigm: 'Procedural, Imperative' },
  { rank: 3, prevRank: 4, name: 'Java', rating: 8.89, change: 0.34, category: 'Enterprise & Android', useCase: 'Enterprise Backend, Android Mobile Apps, Financial Systems', paradigm: 'Object-Oriented, JVM' },
  { rank: 4, prevRank: 3, name: 'C++', rating: 8.35, change: -0.60, category: 'Systems & Game Engines', useCase: 'Game Development, Game Engines, High-Frequency Trading', paradigm: 'Object-Oriented, Compiled' },
  { rank: 5, prevRank: 5, name: 'C#', rating: 3.39, change: -4.26, category: '.NET & Desktop', useCase: 'Enterprise Desktop, Web Services, Unity Game Engine', paradigm: 'Object-Oriented, Component' },
  { rank: 6, prevRank: 6, name: 'JavaScript', rating: 2.42, change: -1.00, category: 'Web & Fullstack', useCase: 'Frontend Web Interactivity, Node.js Backends, Web Apps', paradigm: 'Event-driven, Prototype' },
  { rank: 7, prevRank: 12, name: 'R', rating: 2.27, change: 0.60, category: 'Data Analysis & Stats', useCase: 'Statistical Computing, Scientific Graphics, Data Mining', paradigm: 'Multi-paradigm, Functional' },
  { rank: 8, prevRank: 10, name: 'SQL', rating: 1.91, change: 0.11, category: 'Database & Data', useCase: 'Relational Database Management, Data Querying & Analytics', paradigm: 'Declarative, Domain-specific' },
  { rank: 9, prevRank: 7, name: 'Visual Basic', rating: 1.88, change: -1.43, category: 'Desktop & Automation', useCase: 'Legacy Windows Business Applications, Office Automation', paradigm: 'Event-driven, Object-based' },
  { rank: 10, prevRank: 11, name: 'Go', rating: 1.69, change: -0.03, category: 'Cloud Infrastructure', useCase: 'Microservices, Docker, Kubernetes, Distributed Cloud Systems', paradigm: 'Concurrent, Compiled' },
  { rank: 11, prevRank: 14, name: 'Rust', rating: 1.63, change: 0.25, category: 'Memory-Safe Systems', useCase: 'Browser Engines, High-Performance Systems, WebAssembly', paradigm: 'Multi-paradigm, Compiled' },
  { rank: 12, prevRank: 16, name: 'PHP', rating: 1.58, change: 0.27, category: 'Web Backend', useCase: 'Server-side Web Development, Content Management Systems', paradigm: 'Object-Oriented, Scripting' },
  { rank: 13, prevRank: 13, name: 'Fortran', rating: 1.21, change: -0.34, category: 'Supercomputing', useCase: 'High Performance Weather Modeling, Scientific Simulations', paradigm: 'Procedural, Numerical' },
  { rank: 14, prevRank: 19, name: 'Scratch', rating: 1.15, change: 0.13, category: 'Educational Block Coding', useCase: 'Block-based Programming Education, Interactive Visual Games', paradigm: 'Visual, Block-based' },
  { rank: 15, prevRank: 9, name: 'Perl', rating: 1.14, change: -0.69, category: 'Text Processing & Unix', useCase: 'System Administration, CGI Scripting, Text Manipulation', paradigm: 'Multi-paradigm, Dynamic' },
  { rank: 16, prevRank: 15, name: 'MATLAB', rating: 1.08, change: -0.30, category: 'Numeric Matrix Computing', useCase: 'Control Systems, Signal Processing, Algorithm Prototyping', paradigm: 'Matrix, Numerical' },
  { rank: 17, prevRank: 18, name: 'Assembly language', rating: 0.92, change: -0.24, category: 'Low Level Hardware', useCase: 'Direct Processor Registers, Microcontroller Firmware', paradigm: 'Low Level, Hardware' },
  { rank: 18, prevRank: 21, name: 'Swift', rating: 0.89, change: 0.03, category: 'Apple iOS & macOS', useCase: 'iOS Apps, macOS Native Desktop, Apple Watch Applications', paradigm: 'Multi-paradigm, Compiled' },
  { rank: 19, prevRank: 8, name: 'Delphi/Object Pascal', rating: 0.78, change: -1.28, category: 'Rapid Application Dev', useCase: 'Cross-platform GUI Applications, Native Desktop Apps', paradigm: 'Object-Oriented, Structured' },
  { rank: 20, prevRank: 26, name: 'Dart', rating: 0.74, change: 0.05, category: 'Flutter Cross Platform', useCase: 'Flutter Mobile & Desktop Apps, Multiplatform UI', paradigm: 'Object-Oriented, Class-based' },
];

export const TiobeRankingTable: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRank, setSelectedRank] = useState<number | null>(1);
  const [sortField, setSortField] = useState<'rank' | 'rating' | 'change'>('rank');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  // Filter
  const filteredData = TIOBE_DATA.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.useCase.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Sort
  const sortedData = [...filteredData].sort((a, b) => {
    let aVal = a[sortField];
    let bVal = b[sortField];
    if (sortDirection === 'asc') {
      return aVal > bVal ? 1 : -1;
    } else {
      return aVal < bVal ? 1 : -1;
    }
  });

  const handleSort = (field: 'rank' | 'rating' | 'change') => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection(field === 'rank' ? 'asc' : 'desc');
    }
  };

  const selectedItem = TIOBE_DATA.find((item) => item.rank === selectedRank);
  const maxRating = Math.max(...TIOBE_DATA.map((d) => d.rating));

  return (
    <div className="w-full max-w-5xl mx-auto space-y-3 select-none">
      {/* Table Control Header */}
      <div className="bg-white/90 backdrop-blur border-2 border-slate-200/90 rounded-2xl p-2.5 sm:p-3 shadow-md flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <div className="px-3 py-1.5 rounded-xl bg-[#15284f] text-white text-xs font-mono font-bold flex items-center gap-1.5 shadow-sm">
            <Trophy className="w-4 h-4 text-[#f59e0b]" />
            <span>TIOBE Index Official Rankings</span>
          </div>
          <span className="text-xs text-slate-500 font-mono hidden sm:inline-block">
            Top 20 Languages (Official Census)
          </span>
        </div>

        {/* Search Bar & Source Link */}
        <div className="flex items-center gap-2 shrink-0 ml-auto">
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search language..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8 pr-3 py-1 text-xs rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:border-amber-400 transition w-36 sm:w-48 font-medium text-slate-800"
            />
          </div>

          <a
            href="https://www.tiobe.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-2.5 py-1 rounded-xl bg-amber-50 hover:bg-amber-100 border border-amber-300 text-amber-900 text-xs font-mono font-bold flex items-center gap-1 transition shadow-xs"
            title="Open official TIOBE website"
          >
            <span>Source: https://www.tiobe.com/</span>
            <ExternalLink className="w-3 h-3 text-amber-600" />
          </a>
        </div>
      </div>

      {/* Main Interactive Table Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 lg:grid-cols-12 gap-3.5 items-start">
        {/* Left Column: Interactive Data Table (8 Cols) */}
        <div className="md:col-span-8 lg:col-span-8 bg-white/95 border-2 border-slate-200/90 rounded-2xl p-3 shadow-md overflow-hidden">
          <div className="overflow-x-auto max-h-[350px] overflow-y-auto pr-0.5">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 text-[11px] font-mono font-bold text-slate-500 uppercase tracking-wider bg-slate-50/90 sticky top-0 z-10">
                  <th
                    onClick={() => handleSort('rank')}
                    className="py-2 px-2 cursor-pointer hover:text-[#15284f] transition"
                  >
                    <div className="flex items-center gap-1">
                      <span>Nov 2026</span>
                      {sortField === 'rank' && (sortDirection === 'asc' ? <ChevronUp className="w-3 h-3 text-[#f59e0b]" /> : <ChevronDown className="w-3 h-3 text-[#f59e0b]" />)}
                    </div>
                  </th>
                  <th className="py-2 px-2 text-center">Nov 2025</th>
                  <th className="py-2 px-2 text-center">Trend</th>
                  <th className="py-2 px-3">Programming Language</th>
                  <th
                    onClick={() => handleSort('rating')}
                    className="py-2 px-3 cursor-pointer hover:text-[#15284f] transition"
                  >
                    <div className="flex items-center gap-1">
                      <span>Ratings</span>
                      {sortField === 'rating' && (sortDirection === 'desc' ? <ChevronDown className="w-3 h-3 text-[#f59e0b]" /> : <ChevronUp className="w-3 h-3 text-[#f59e0b]" />)}
                    </div>
                  </th>
                  <th
                    onClick={() => handleSort('change')}
                    className="py-2 px-2.5 text-right cursor-pointer hover:text-[#15284f] transition"
                  >
                    <div className="flex items-center justify-end gap-1">
                      <span>Change</span>
                      {sortField === 'change' && (sortDirection === 'desc' ? <ChevronDown className="w-3 h-3 text-[#f59e0b]" /> : <ChevronUp className="w-3 h-3 text-[#f59e0b]" />)}
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs">
                {sortedData.map((item) => {
                  const isSelected = selectedRank === item.rank;
                  const ratingPercent = Math.min(100, Math.max(5, (item.rating / maxRating) * 100));

                  return (
                    <tr
                      key={item.rank}
                      onClick={() => setSelectedRank(item.rank)}
                      className={`cursor-pointer transition-all ${
                        isSelected
                          ? 'bg-amber-50/90 font-semibold text-slate-900 border-l-4 border-l-[#f59e0b]'
                          : item.isLeader
                          ? 'bg-gradient-to-r from-amber-50/40 via-white to-white hover:bg-amber-50/70 text-slate-800'
                          : 'hover:bg-slate-50 text-slate-700'
                      }`}
                    >
                      {/* Nov 2026 Rank Cell */}
                      <td className="py-2 px-2 font-mono">
                        <span
                          className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs ${
                            item.isLeader
                              ? 'bg-[#f59e0b] text-white shadow-sm'
                              : 'bg-slate-200 text-slate-700'
                          }`}
                        >
                          {item.rank}
                        </span>
                      </td>

                      {/* Nov 2025 Rank Cell */}
                      <td className="py-2 px-2 text-center font-mono text-slate-500">
                        {item.prevRank}
                      </td>

                      {/* Trend Icon Cell */}
                      <td className="py-2 px-2 text-center">
                        {item.rank < item.prevRank ? (
                          <span className="inline-flex items-center justify-center text-emerald-600 font-bold" title={`Climbed up from #${item.prevRank}`}>
                            <TrendingUp className="w-3.5 h-3.5" />
                          </span>
                        ) : item.rank > item.prevRank ? (
                          <span className="inline-flex items-center justify-center text-rose-500 font-bold" title={`Dropped down from #${item.prevRank}`}>
                            <TrendingDown className="w-3.5 h-3.5" />
                          </span>
                        ) : (
                          <span className="inline-flex items-center justify-center text-slate-300">
                            <Minus className="w-3.5 h-3.5" />
                          </span>
                        )}
                      </td>

                      {/* Name & Category Cell */}
                      <td className="py-2 px-3">
                        <div className="flex items-center gap-2">
                          <span className={`font-bold text-xs ${item.isLeader ? 'text-[#b45309] font-black' : 'text-[#15284f]'}`}>
                            {item.name}
                          </span>
                          {item.isLeader && (
                            <span className="px-1.5 py-0.5 rounded text-[10px] font-mono font-black bg-[#15284f] text-amber-400 border border-amber-500/40">
                              #1 Leader
                            </span>
                          )}
                          <span className="text-[10px] text-slate-400 font-mono hidden sm:inline-block">
                            {item.category}
                          </span>
                        </div>
                      </td>

                      {/* Ratings % Progress Bar Cell */}
                      <td className="py-2 px-3">
                        <div className="space-y-1 max-w-[150px]">
                          <div className="flex justify-between items-center text-[11px] font-mono">
                            <span className={`font-bold ${item.isLeader ? 'text-[#b45309]' : 'text-slate-700'}`}>
                              {item.rating.toFixed(2)}%
                            </span>
                          </div>
                          <div className="w-full h-1.5 rounded-full bg-slate-200 overflow-hidden">
                            <div
                              className={`h-full rounded-full transition-all duration-500 ${
                                item.isLeader
                                  ? 'bg-gradient-to-r from-amber-500 to-orange-500 shadow-sm'
                                  : 'bg-slate-600'
                              }`}
                              style={{ width: `${ratingPercent}%` }}
                            />
                          </div>
                        </div>
                      </td>

                      {/* Change % Cell */}
                      <td className="py-2 px-2.5 text-right font-mono font-bold text-xs">
                        <span
                          className={`inline-block px-1.5 py-0.5 rounded ${
                            item.change > 0
                              ? 'bg-emerald-100 text-emerald-800'
                              : item.change < 0
                              ? 'bg-rose-100 text-rose-800'
                              : 'bg-slate-100 text-slate-600'
                          }`}
                        >
                          {item.change > 0 ? `+${item.change.toFixed(2)}%` : `${item.change.toFixed(2)}%`}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Column: Selected Language Deep Dive Card (4 Cols) */}
        <div className="md:col-span-4 lg:col-span-4 bg-gradient-to-br from-[#15284f] to-[#0f1d3a] border-2 border-[#15284f] rounded-2xl p-4 text-white shadow-xl flex flex-col justify-between space-y-3 min-h-[350px]">
          {selectedItem ? (
            <>
              <div className="space-y-2">
                <div className="flex items-center justify-between border-b border-slate-700/80 pb-2">
                  <span className="text-xs font-mono font-bold text-amber-400 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    Rank #{selectedItem.rank} Spotlight
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                    {selectedItem.category}
                  </span>
                </div>

                <div className="pt-1">
                  <h3 className="text-2xl font-black text-white flex items-center gap-2">
                    {selectedItem.name}
                    {selectedItem.isLeader && <span className="text-xl">👑</span>}
                  </h3>
                  <div className="flex items-center gap-3 mt-1 font-mono text-xs">
                    <span className="text-amber-300 font-extrabold text-sm">
                      {selectedItem.rating.toFixed(2)}% Ratings
                    </span>
                    <span className={`font-bold ${selectedItem.change >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                      {selectedItem.change >= 0 ? `+${selectedItem.change.toFixed(2)}% YoY` : `${selectedItem.change.toFixed(2)}% YoY`}
                    </span>
                  </div>
                </div>

                <div className="space-y-2 pt-2 text-xs text-slate-200">
                  <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-700/60 space-y-1">
                    <span className="text-[10px] font-mono uppercase font-bold text-amber-400 tracking-wider">
                      Primary Use Cases:
                    </span>
                    <p className="leading-snug text-slate-300 font-medium">
                      {selectedItem.useCase}
                    </p>
                  </div>

                  <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-700/60 space-y-1">
                    <span className="text-[10px] font-mono uppercase font-bold text-slate-400 tracking-wider">
                      Programming Paradigm:
                    </span>
                    <p className="leading-snug text-slate-300 font-medium">
                      {selectedItem.paradigm}
                    </p>
                  </div>
                </div>
              </div>

              {/* Bottom Attribution Footer */}
              <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-[11px] font-mono text-slate-400">
                <span>Official TIOBE Index Census</span>
                <a
                  href="https://www.tiobe.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-amber-400 hover:underline flex items-center gap-1 font-bold"
                >
                  <span>tiobe.com</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </>
          ) : (
            <div className="flex items-center justify-center h-full text-slate-400 text-xs">
              Select a language row to view metrics
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
