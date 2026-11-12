import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Terminal, CheckCircle2, AlertTriangle, Plus, Equal } from 'lucide-react';
import {
  BurgerIllustration,
  SushiIllustration,
  RamenIllustration,
  SaladIllustration,
} from './VariablesLunchboxDrag';

// Additional custom-drawn SVG drink & dessert illustrations (Zero Emojis)
const MatchaDrinkIllustration: React.FC<{ className?: string }> = ({ className = 'w-14 h-14' }) => (
  <svg viewBox="0 0 120 120" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="60" cy="106" rx="30" ry="6" fill="#0f172a" opacity="0.25" />
    {/* Straw */}
    <path d="M66 12 L56 44" stroke="#f59e0b" strokeWidth="6" strokeLinecap="round" />
    {/* Cup Body */}
    <path d="M34 38 L86 38 L78 98 L42 98 Z" fill="#dcfce7" stroke="#22c55e" strokeWidth="3" />
    {/* Matcha Green Layer */}
    <path d="M36 52 L84 52 L78 96 L42 96 Z" fill="#4ade80" />
    {/* Tapioca Pearls at Bottom */}
    <circle cx="48" cy="90" r="4" fill="#1e293b" />
    <circle cx="58" cy="91" r="4" fill="#1e293b" />
    <circle cx="68" cy="90" r="4" fill="#1e293b" />
    <circle cx="53" cy="83" r="4" fill="#1e293b" />
    <circle cx="64" cy="83" r="4" fill="#1e293b" />
    {/* Dome Lid */}
    <path d="M32 38 C32 22 88 22 88 38 Z" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="3" />
  </svg>
);

const BerrySmoothieIllustration: React.FC<{ className?: string }> = ({ className = 'w-14 h-14' }) => (
  <svg viewBox="0 0 120 120" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="60" cy="106" rx="30" ry="6" fill="#0f172a" opacity="0.25" />
    <path d="M54 12 L62 42" stroke="#38bdf8" strokeWidth="6" strokeLinecap="round" />
    <path d="M34 38 L86 38 L78 98 L42 98 Z" fill="#fce7f3" stroke="#ec4899" strokeWidth="3" />
    <path d="M36 48 L84 48 L78 96 L42 96 Z" fill="#f43f5e" />
    {/* Whipped Cream Dome */}
    <path d="M34 38 C36 20 84 20 86 38 Z" fill="#fff1f2" stroke="#fecdd3" strokeWidth="3" />
    <circle cx="60" cy="24" r="5" fill="#e11d48" />
  </svg>
);

interface ComboOption {
  id: string;
  name: string;
  calories: number;
  price: number;
  renderArt: (cls?: string) => React.ReactNode;
}

const MAIN_BOX_OPTIONS: ComboOption[] = [
  { id: 'burger', name: 'Beef Burger', calories: 620, price: 8.5, renderArt: (c) => <BurgerIllustration className={c} /> },
  { id: 'sushi', name: 'Salmon Nigiri', calories: 380, price: 9.0, renderArt: (c) => <SushiIllustration className={c} /> },
  { id: 'ramen', name: 'Tonkotsu Ramen', calories: 540, price: 10.5, renderArt: (c) => <RamenIllustration className={c} /> },
];

const SIDE_BOX_OPTIONS: ComboOption[] = [
  { id: 'matcha', name: 'Matcha Boba', calories: 210, price: 4.5, renderArt: (c) => <MatchaDrinkIllustration className={c} /> },
  { id: 'smoothie', name: 'Berry Smoothie', calories: 180, price: 5.0, renderArt: (c) => <BerrySmoothieIllustration className={c} /> },
  { id: 'salad', name: 'Avocado Salad', calories: 290, price: 5.5, renderArt: (c) => <SaladIllustration className={c} /> },
];

interface LabelRuleItem {
  label: string;
  isValid: boolean;
  reason: string;
  exampleCode: string;
}

const LABEL_RULES: LabelRuleItem[] = [
  {
    label: 'lunch_box_1',
    isValid: true,
    reason: 'Valid snake_case! Starts with a letter and uses underscores instead of spaces.',
    exampleCode: 'lunch_box_1 = "Beef Burger"\nprint(lunch_box_1)  # Works!',
  },
  {
    label: 'totalCalories',
    isValid: true,
    reason: 'Valid camelCase! Letters only, no spaces or special symbols.',
    exampleCode: 'totalCalories = 830\nprint(totalCalories)  # Works!',
  },
  {
    label: '1_lunch_box',
    isValid: false,
    reason: 'SyntaxError: Variable names in Python CANNOT start with a number (1).',
    exampleCode: '1_lunch_box = "Sushi"\n# SyntaxError: invalid decimal literal',
  },
  {
    label: 'lunch-box',
    isValid: false,
    reason: 'SyntaxError: Hyphens (-) are interpreted by Python as subtraction (minus)! Use _ instead.',
    exampleCode: 'lunch-box = "Ramen"\n# SyntaxError: cannot assign to expression',
  },
  {
    label: 'lunch box',
    isValid: false,
    reason: 'SyntaxError: Spaces are not allowed inside variable names. Use underscores (_).',
    exampleCode: 'lunch box = "Salad"\n# SyntaxError: invalid syntax',
  },
];

interface VariablesMultiBoxLabProps {
  slide: any;
  theme?: string;
}

let cachedMainDishId: string = (() => {
  try {
    return localStorage.getItem('py_ai_slide23_main_id') || MAIN_BOX_OPTIONS[0].id;
  } catch {
    return MAIN_BOX_OPTIONS[0].id;
  }
})();

let cachedSideDishId: string = (() => {
  try {
    return localStorage.getItem('py_ai_slide23_side_id') || SIDE_BOX_OPTIONS[0].id;
  } catch {
    return SIDE_BOX_OPTIONS[0].id;
  }
})();

let cachedRuleIdx: number = (() => {
  try {
    const val = Number(localStorage.getItem('py_ai_slide23_rule_idx'));
    return !Number.isNaN(val) && val >= 0 && val < LABEL_RULES.length ? val : 0;
  } catch {
    return 0;
  }
})();

export const VariablesMultiBoxLab: React.FC<VariablesMultiBoxLabProps> = () => {
  const [mainDish, setMainDishState] = useState<ComboOption>(
    () => MAIN_BOX_OPTIONS.find((m) => m.id === cachedMainDishId) || MAIN_BOX_OPTIONS[0]
  );
  const [sideDish, setSideDishState] = useState<ComboOption>(
    () => SIDE_BOX_OPTIONS.find((s) => s.id === cachedSideDishId) || SIDE_BOX_OPTIONS[0]
  );
  const [selectedRuleIdx, setSelectedRuleIdxState] = useState<number>(() => cachedRuleIdx);

  const setMainDish = (item: ComboOption) => {
    cachedMainDishId = item.id;
    try {
      localStorage.setItem('py_ai_slide23_main_id', item.id);
    } catch {
      // ignore
    }
    setMainDishState(item);
  };

  const setSideDish = (item: ComboOption) => {
    cachedSideDishId = item.id;
    try {
      localStorage.setItem('py_ai_slide23_side_id', item.id);
    } catch {
      // ignore
    }
    setSideDishState(item);
  };

  const setSelectedRuleIdx = (idx: number) => {
    cachedRuleIdx = idx;
    try {
      localStorage.setItem('py_ai_slide23_rule_idx', String(idx));
    } catch {
      // ignore
    }
    setSelectedRuleIdxState(idx);
  };

  const totalCalories = mainDish.calories + sideDish.calories;
  const totalPrice = (mainDish.price + sideDish.price).toFixed(2);
  const currentRule = LABEL_RULES[selectedRuleIdx];

  return (
    <div className="w-full max-w-5xl mx-auto space-y-5 select-none">
      {/* Header Bar */}
      <div className="bg-white/95 border-2 border-slate-200/90 rounded-2xl p-4 shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-[#15284f]">
            Combining Variables &amp; Box Labeling Rules
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 font-medium">
            See how Python combines multiple variable boxes into new ones, and test which box labels are legal in Python.
          </p>
        </div>
        <span className="px-3 py-1 rounded-full bg-[#15284f] text-white font-mono text-xs font-bold shrink-0">
          Multi-Variable Operations
        </span>
      </div>

      {/* Top Section: Multi-Box Bento Calculator (Box A + Box B = Combo Box C) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
        {/* Left 7 Cols: Interactive 2-Box Selector + Result Box */}
        <div className="lg:col-span-7 bg-white/95 border-2 border-slate-200 rounded-3xl p-5 shadow-xl flex flex-col justify-between space-y-4">
          <div className="flex items-center justify-between text-xs font-mono text-slate-500">
            <span className="font-bold text-[#15284f] uppercase">
              Part 1: Combining Two Variable Boxes
            </span>
            <span>Click items to swap box contents</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-11 gap-3 items-center">
            {/* Box 1: main_cal */}
            <div className="sm:col-span-4 p-3.5 rounded-2xl bg-slate-900 text-white border-2 border-amber-400 shadow-lg flex flex-col items-center text-center space-y-2">
              <span className="px-2.5 py-0.5 rounded bg-amber-400 text-slate-950 font-mono text-[11px] font-black">
                main_cal = {mainDish.calories}
              </span>
              {mainDish.renderArt('w-14 h-14')}
              <p className="text-xs font-bold text-slate-200">{mainDish.name}</p>
              <div className="flex gap-1.5 pt-1">
                {MAIN_BOX_OPTIONS.map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => setMainDish(opt)}
                    className={`px-2 py-1 rounded text-[10px] font-mono font-bold transition ${
                      mainDish.id === opt.id
                        ? 'bg-amber-400 text-slate-950'
                        : 'bg-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    {opt.name.split(' ')[1]}
                  </button>
                ))}
              </div>
            </div>

            {/* Plus Operator */}
            <div className="sm:col-span-1 flex justify-center">
              <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-800 border border-amber-300 flex items-center justify-center font-black">
                <Plus className="w-4 h-4" />
              </div>
            </div>

            {/* Box 2: drink_cal */}
            <div className="sm:col-span-4 p-3.5 rounded-2xl bg-slate-900 text-white border-2 border-cyan-400 shadow-lg flex flex-col items-center text-center space-y-2">
              <span className="px-2.5 py-0.5 rounded bg-cyan-400 text-slate-950 font-mono text-[11px] font-black">
                drink_cal = {sideDish.calories}
              </span>
              {sideDish.renderArt('w-14 h-14')}
              <p className="text-xs font-bold text-slate-200">{sideDish.name}</p>
              <div className="flex gap-1.5 pt-1">
                {SIDE_BOX_OPTIONS.map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => setSideDish(opt)}
                    className={`px-2 py-1 rounded text-[10px] font-mono font-bold transition ${
                      sideDish.id === opt.id
                        ? 'bg-cyan-400 text-slate-950'
                        : 'bg-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    {opt.name.split(' ')[0]}
                  </button>
                ))}
              </div>
            </div>

            {/* Equals Result */}
            <div className="sm:col-span-2 flex flex-col items-center justify-center p-3 rounded-2xl bg-emerald-950 border-2 border-emerald-500 text-center">
              <span className="text-[10px] font-mono text-emerald-300 font-bold">total_cal</span>
              <motion.span
                key={totalCalories}
                initial={{ scale: 1.3 }}
                animate={{ scale: 1 }}
                className="text-lg font-mono font-black text-white mt-1"
              >
                {totalCalories}
              </motion.span>
              <span className="text-[10px] font-mono text-emerald-400">kcal</span>
            </div>
          </div>

          {/* Live Code Sync for Multi-Box Math */}
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 font-mono text-xs space-y-1 text-slate-200">
            <div className="text-slate-400"># Python calculates using the values inside each box:</div>
            <div>
              <span className="text-amber-300">main_cal</span> = {mainDish.calories}{' '}
              <span className="text-slate-500"># {mainDish.name}</span>
            </div>
            <div>
              <span className="text-cyan-300">drink_cal</span> = {sideDish.calories}{' '}
              <span className="text-slate-500"># {sideDish.name}</span>
            </div>
            <div>
              <span className="text-emerald-400 font-bold">total_cal</span> = main_cal + drink_cal{' '}
              <span className="text-amber-300 font-bold">➔ {totalCalories} kcal (${totalPrice})</span>
            </div>
          </div>
        </div>

        {/* Right 5 Cols: Interactive Box Naming Rules Tester */}
        <div className="lg:col-span-5 bg-slate-900 border-2 border-slate-800 rounded-3xl p-5 shadow-2xl text-white flex flex-col justify-between space-y-4">
          <div className="space-y-1">
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-amber-400">
              Part 2: Variable Box Labeling Rules
            </span>
            <h3 className="text-base sm:text-lg font-extrabold text-white">
              Which Lunchbox Labels Are Legal in Python?
            </h3>
            <p className="text-xs text-slate-400">
              Click a label sticker below to test if Python accepts or rejects the variable name:
            </p>
          </div>

          {/* 5 Label Sticker Buttons */}
          <div className="flex flex-wrap gap-2">
            {LABEL_RULES.map((item, idx) => {
              const isSelected = selectedRuleIdx === idx;
              return (
                <button
                  key={item.label}
                  onClick={() => setSelectedRuleIdx(idx)}
                  className={`px-3 py-1.5 rounded-xl font-mono text-xs font-bold border-2 transition-all flex items-center gap-1.5 ${
                    isSelected
                      ? item.isValid
                        ? 'bg-emerald-950 border-emerald-400 text-emerald-200 shadow-lg scale-105'
                        : 'bg-rose-950 border-rose-400 text-rose-200 shadow-lg scale-105'
                      : 'bg-slate-800 border-slate-700 text-slate-300 hover:border-slate-500'
                  }`}
                >
                  {item.isValid ? (
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  ) : (
                    <AlertTriangle className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                  )}
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>

          {/* Diagnostic Result Box */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentRule.label}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2 }}
              className={`p-4 rounded-2xl border-2 space-y-2.5 ${
                currentRule.isValid
                  ? 'bg-emerald-950/40 border-emerald-500/60'
                  : 'bg-rose-950/40 border-rose-500/60'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-black uppercase tracking-wider flex items-center gap-1.5">
                  {currentRule.isValid ? (
                    <span className="text-emerald-300">✓ VALID PYTHON IDENTIFIER</span>
                  ) : (
                    <span className="text-rose-300">✕ INVALID SYNTAX ERROR</span>
                  )}
                </span>
              </div>

              <p className="text-xs text-slate-200 leading-relaxed">
                {currentRule.reason}
              </p>

              <pre className="p-3 rounded-xl bg-slate-950 border border-slate-800 font-mono text-[11px] text-amber-300 overflow-x-auto">
                <code>{currentRule.exampleCode}</code>
              </pre>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
