import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Terminal, RefreshCw, ArrowDown, Sparkles, Layers } from 'lucide-react';

// ============================================================================
// CUSTOM HAND-CRAFTED 3D-STYLE VECTOR ILLUSTRATIONS (ZERO EMOJIS)
// ============================================================================

export const BurgerIllustration: React.FC<{ className?: string }> = ({ className = 'w-14 h-14' }) => (
  <svg viewBox="0 0 120 120" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="bunTop" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#fbbf24" />
        <stop offset="100%" stopColor="#d97706" />
      </linearGradient>
      <linearGradient id="pattyGrad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#78350f" />
        <stop offset="100%" stopColor="#451a03" />
      </linearGradient>
    </defs>
    {/* Drop shadow */}
    <ellipse cx="60" cy="104" rx="44" ry="8" fill="#0f172a" opacity="0.25" />
    {/* Bottom Bun */}
    <path d="M20 82 C20 94 35 98 60 98 C85 98 100 94 100 82 L96 76 L24 76 Z" fill="url(#bunTop)" />
    {/* Melted Cheese */}
    <path d="M18 66 L102 66 L94 74 L76 68 L60 78 L44 68 L26 74 Z" fill="#facc15" />
    {/* Grilled Beef Patty */}
    <rect x="16" y="56" width="88" height="14" rx="7" fill="url(#pattyGrad)" />
    {/* Fresh Tomato Slice */}
    <rect x="22" y="49" width="76" height="8" rx="4" fill="#ef4444" />
    {/* Crisp Lettuce Wave */}
    <path d="M14 48 Q24 41 34 48 T54 48 T74 48 T94 48 T106 48 L102 53 L18 53 Z" fill="#22c55e" />
    {/* Top Dome Bun */}
    <path d="M18 46 C18 20 40 14 60 14 C80 14 102 20 102 46 Z" fill="url(#bunTop)" />
    {/* Sesame Seeds */}
    <ellipse cx="45" cy="26" rx="3.5" ry="1.8" transform="rotate(-15 45 26)" fill="#fef3c7" />
    <ellipse cx="60" cy="22" rx="3.5" ry="1.8" fill="#fef3c7" />
    <ellipse cx="75" cy="27" rx="3.5" ry="1.8" transform="rotate(15 75 27)" fill="#fef3c7" />
    <ellipse cx="52" cy="34" rx="3.5" ry="1.8" transform="rotate(8 52 34)" fill="#fef3c7" />
    <ellipse cx="68" cy="35" rx="3.5" ry="1.8" transform="rotate(-10 68 35)" fill="#fef3c7" />
  </svg>
);

export const SushiIllustration: React.FC<{ className?: string }> = ({ className = 'w-14 h-14' }) => (
  <svg viewBox="0 0 120 120" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="salmonGrad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#fb7185" />
        <stop offset="50%" stopColor="#f97316" />
        <stop offset="100%" stopColor="#ea580c" />
      </linearGradient>
    </defs>
    <ellipse cx="60" cy="102" rx="44" ry="8" fill="#0f172a" opacity="0.25" />
    {/* Wooden Geta Board Base */}
    <path d="M14 78 L106 78 L100 92 L20 92 Z" fill="#d97706" />
    <rect x="26" y="92" width="12" height="7" rx="2" fill="#92400e" />
    <rect x="82" y="92" width="12" height="7" rx="2" fill="#92400e" />
    {/* Sushi Rice Cushion */}
    <rect x="28" y="48" width="64" height="30" rx="14" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="2" />
    {/* Salmon Nigiri Topping */}
    <path d="M22 46 C22 30 42 26 60 26 C78 26 98 30 98 46 C98 54 90 56 60 56 C30 56 22 54 22 46 Z" fill="url(#salmonGrad)" />
    {/* White Marbling Stripes on Salmon */}
    <path d="M36 32 Q44 42 38 54" stroke="#ffedd5" strokeWidth="2.5" strokeLinecap="round" opacity="0.8" />
    <path d="M54 28 Q62 40 56 55" stroke="#ffedd5" strokeWidth="2.5" strokeLinecap="round" opacity="0.8" />
    <path d="M72 30 Q80 42 74 54" stroke="#ffedd5" strokeWidth="2.5" strokeLinecap="round" opacity="0.8" />
    {/* Nori Seaweed Belt */}
    <rect x="52" y="25" width="16" height="53" rx="3" fill="#0f172a" />
    <rect x="55" y="25" width="3" height="53" fill="#1e293b" />
  </svg>
);

export const RamenIllustration: React.FC<{ className?: string }> = ({ className = 'w-14 h-14' }) => (
  <svg viewBox="0 0 120 120" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="bowlGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#e11d48" />
        <stop offset="100%" stopColor="#881337" />
      </linearGradient>
    </defs>
    <ellipse cx="60" cy="104" rx="40" ry="7" fill="#0f172a" opacity="0.25" />
    {/* Chopsticks */}
    <path d="M20 20 L108 12" stroke="#fcd34d" strokeWidth="4" strokeLinecap="round" />
    <path d="M20 28 L108 22" stroke="#f59e0b" strokeWidth="4" strokeLinecap="round" />
    {/* Nori Sheets */}
    <rect x="28" y="30" width="18" height="26" rx="3" transform="rotate(-12 28 30)" fill="#064e3b" />
    <rect x="44" y="28" width="18" height="26" rx="3" transform="rotate(-4 44 28)" fill="#047857" />
    {/* Soup & Noodles Surface */}
    <ellipse cx="60" cy="54" rx="42" ry="14" fill="#fbbf24" stroke="#1e293b" strokeWidth="3" />
    {/* Noodle Waves */}
    <path d="M30 54 Q40 48 50 54 T70 54 T90 54" stroke="#fef08a" strokeWidth="3" strokeLinecap="round" fill="none" />
    <path d="M36 59 Q46 53 56 59 T76 59" stroke="#fef08a" strokeWidth="3" strokeLinecap="round" fill="none" />
    {/* Soft Boiled Egg Half */}
    <ellipse cx="76" cy="48" rx="11" ry="8" fill="#ffffff" />
    <circle cx="76" cy="48" r="5" fill="#f97316" />
    {/* Ceramic Ramen Bowl Body */}
    <path d="M18 54 C18 84 36 96 60 96 C84 96 102 84 102 54 Z" fill="url(#bowlGrad)" />
    {/* Gold Rim Pattern */}
    <path d="M21 63 L99 63" stroke="#fbbf24" strokeWidth="2.5" strokeDasharray="6 4" />
    {/* Bowl Foot */}
    <rect x="44" y="94" width="32" height="7" rx="3" fill="#1e293b" />
  </svg>
);

export const SaladIllustration: React.FC<{ className?: string }> = ({ className = 'w-14 h-14' }) => (
  <svg viewBox="0 0 120 120" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="60" cy="102" rx="40" ry="7" fill="#0f172a" opacity="0.25" />
    {/* Fresh Greens Leaves */}
    <circle cx="42" cy="46" r="16" fill="#16a34a" />
    <circle cx="60" cy="40" r="18" fill="#22c55e" />
    <circle cx="78" cy="46" r="16" fill="#15803d" />
    <circle cx="50" cy="52" r="14" fill="#4ade80" />
    <circle cx="70" cy="52" r="14" fill="#22c55e" />
    {/* Cherry Tomatoes & Avocado Slices */}
    <circle cx="44" cy="44" r="6" fill="#ef4444" />
    <circle cx="42" cy="42" r="1.5" fill="#fecaca" />
    <circle cx="74" cy="48" r="6" fill="#ef4444" />
    <path d="M54 34 C60 26 70 30 66 42 Z" fill="#a3e635" stroke="#365314" strokeWidth="2" />
    {/* Modern White/Teal Salad Bowl */}
    <path d="M20 54 C20 84 36 96 60 96 C84 96 100 84 100 54 Z" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="3" />
    <path d="M24 64 C36 72 84 72 96 64" stroke="#0d9488" strokeWidth="4" strokeLinecap="round" />
  </svg>
);

export const PizzaIllustration: React.FC<{ className?: string }> = ({ className = 'w-14 h-14' }) => (
  <svg viewBox="0 0 120 120" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="60" cy="104" rx="38" ry="7" fill="#0f172a" opacity="0.25" />
    {/* Golden Crust Rim */}
    <path d="M24 28 C46 14 74 14 96 28 L88 38 C68 26 52 26 32 38 Z" fill="#d97706" />
    {/* Melted Mozzarella Triangle */}
    <path d="M30 34 C50 23 70 23 90 34 L60 98 Z" fill="#facc15" stroke="#ca8a04" strokeWidth="2" />
    {/* Pepperoni Slices */}
    <circle cx="52" cy="46" r="8" fill="#dc2626" />
    <circle cx="50" cy="44" r="1.5" fill="#fca5a5" />
    <circle cx="70" cy="52" r="7.5" fill="#dc2626" />
    <circle cx="68" cy="50" r="1.5" fill="#fca5a5" />
    <circle cx="58" cy="68" r="7" fill="#dc2626" />
    <circle cx="56" cy="66" r="1.5" fill="#fca5a5" />
    {/* Basil Leaf */}
    <path d="M58 52 Q64 46 66 54 Q60 60 58 52 Z" fill="#16a34a" />
  </svg>
);

// Custom 3D Open Lunchbox Container SVG
const LunchboxContainerIllustration: React.FC<{
  foodItem: FoodItem;
  isDraggingOver: boolean;
  variableName: string;
}> = ({ foodItem, isDraggingOver, variableName }) => (
  <div className="relative w-full max-w-sm mx-auto flex flex-col items-center">
    {/* Animated Open Top Lid */}
    <motion.div
      animate={{
        rotateX: isDraggingOver ? 25 : 0,
        y: isDraggingOver ? -8 : 0,
        scale: isDraggingOver ? 1.03 : 1,
      }}
      transition={{ type: 'spring', stiffness: 260, damping: 20 }}
      className="w-64 h-12 rounded-t-3xl bg-gradient-to-r from-amber-400 via-amber-300 to-orange-400 border-4 border-slate-800 shadow-lg flex items-center justify-between px-5 relative z-10"
    >
      <div className="w-8 h-2.5 rounded-full bg-slate-900/30" />
      <span className="font-mono text-[11px] font-black uppercase tracking-widest text-slate-900">
        Memory Address • 0x7F4A
      </span>
      <div className="w-8 h-2.5 rounded-full bg-slate-900/30" />
    </motion.div>

    {/* Main 3D Bento Box Compartment */}
    <motion.div
      animate={{
        scale: isDraggingOver ? 1.05 : 1,
        borderColor: isDraggingOver ? '#38bdf8' : '#1e293b',
      }}
      className={`w-72 sm:w-80 min-h-[210px] rounded-3xl bg-gradient-to-b from-slate-800 via-slate-900 to-slate-950 border-4 p-5 shadow-2xl relative flex flex-col items-center justify-between transition-colors ${
        isDraggingOver ? 'ring-4 ring-cyan-400/40' : ''
      }`}
    >
      {/* Inner recessed tray */}
      <div className="w-full h-32 rounded-2xl bg-slate-950/90 border-2 border-slate-800 shadow-inner flex flex-col items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-tr from-amber-500/5 to-cyan-500/10 pointer-events-none" />

        <AnimatePresence mode="wait">
          <motion.div
            key={foodItem.id}
            initial={{ scale: 0.3, y: -40, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.4, y: 20, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 18 }}
            className="flex flex-col items-center z-10"
          >
            {foodItem.renderArt('w-20 h-20')}
            <span className="mt-1 px-3 py-0.5 rounded-full bg-slate-900 border border-slate-700 font-mono text-xs font-bold text-amber-300 shadow">
              &quot;{foodItem.name}&quot; ({foodItem.calories} kcal)
            </span>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Physical Masking Tape Label on the Front of the Lunchbox */}
      <div className="mt-3 w-full bg-[#fef3c7] border-2 border-amber-500 rounded-xl py-2 px-4 shadow-md flex items-center justify-between transform -rotate-1">
        <span className="text-[10px] font-mono uppercase tracking-wider font-bold text-amber-900">
          Box Label:
        </span>
        <span className="font-mono text-sm sm:text-base font-black text-slate-900 tracking-tight">
          {variableName}
        </span>
        <span className="px-2 py-0.5 rounded bg-amber-300/80 text-amber-950 font-mono text-[10px] font-bold">
          str
        </span>
      </div>
    </motion.div>
  </div>
);

interface FoodItem {
  id: string;
  name: string;
  calories: number;
  proteinGrams: number;
  isHot: boolean;
  category: string;
  renderArt: (className?: string) => React.ReactNode;
}

const FOOD_MENU: FoodItem[] = [
  {
    id: 'burger',
    name: 'Beef Burger',
    calories: 620,
    proteinGrams: 34,
    isHot: true,
    category: 'Classic Grill',
    renderArt: (cls) => <BurgerIllustration className={cls} />,
  },
  {
    id: 'sushi',
    name: 'Salmon Nigiri',
    calories: 380,
    proteinGrams: 28,
    isHot: false,
    category: 'Tokyo Fresh',
    renderArt: (cls) => <SushiIllustration className={cls} />,
  },
  {
    id: 'ramen',
    name: 'Tonkotsu Ramen',
    calories: 540,
    proteinGrams: 26,
    isHot: true,
    category: 'Hot Noodle',
    renderArt: (cls) => <RamenIllustration className={cls} />,
  },
  {
    id: 'salad',
    name: 'Avocado Bowl',
    calories: 290,
    proteinGrams: 14,
    isHot: false,
    category: 'Green Energy',
    renderArt: (cls) => <SaladIllustration className={cls} />,
  },
  {
    id: 'pizza',
    name: 'Pepperoni Slice',
    calories: 470,
    proteinGrams: 21,
    isHot: true,
    category: 'Oven Baked',
    renderArt: (cls) => <PizzaIllustration className={cls} />,
  },
];

interface VariablesLunchboxDragProps {
  slide: any;
  theme?: string;
}

let cachedFoodId: string = (() => {
  try {
    return localStorage.getItem('py_ai_slide22_food_id') || FOOD_MENU[0].id;
  } catch {
    return FOOD_MENU[0].id;
  }
})();

let cachedPreviousFoodName: string | null = (() => {
  try {
    return localStorage.getItem('py_ai_slide22_prev_food') || null;
  } catch {
    return null;
  }
})();

let cachedAssignmentCount: number = (() => {
  try {
    const val = Number(localStorage.getItem('py_ai_slide22_assign_count'));
    return !Number.isNaN(val) && val >= 1 ? val : 1;
  } catch {
    return 1;
  }
})();

export const VariablesLunchboxDrag: React.FC<VariablesLunchboxDragProps> = () => {
  const [selectedFood, setSelectedFood] = useState<FoodItem>(
    () => FOOD_MENU.find((f) => f.id === cachedFoodId) || FOOD_MENU[0]
  );
  const [previousFoodName, setPreviousFoodName] = useState<string | null>(() => cachedPreviousFoodName);
  const [assignmentCount, setAssignmentCount] = useState<number>(() => cachedAssignmentCount);
  const [isDraggingOver, setIsDraggingOver] = useState<boolean>(false);

  const handleAssignFood = (food: FoodItem) => {
    if (food.id !== selectedFood.id) {
      const prevName = selectedFood.name;
      const nextCount = assignmentCount + 1;
      cachedFoodId = food.id;
      cachedPreviousFoodName = prevName;
      cachedAssignmentCount = nextCount;
      try {
        localStorage.setItem('py_ai_slide22_food_id', food.id);
        localStorage.setItem('py_ai_slide22_prev_food', prevName);
        localStorage.setItem('py_ai_slide22_assign_count', String(nextCount));
      } catch {
        // ignore storage errors
      }
      setPreviousFoodName(prevName);
      setSelectedFood(food);
      setAssignmentCount(nextCount);
    }
  };

  const handleDragStart = (e: React.DragEvent, food: FoodItem) => {
    e.dataTransfer.setData('text/plain', food.id);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    if (!isDraggingOver) setIsDraggingOver(true);
  };

  const handleDragLeave = () => {
    setIsDraggingOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDraggingOver(false);
    const foodId = e.dataTransfer.getData('text/plain');
    const found = FOOD_MENU.find((f) => f.id === foodId);
    if (found) {
      handleAssignFood(found);
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-5 select-none">
      {/* Header Bar */}
      <div className="bg-white/95 border-2 border-slate-200/90 rounded-2xl p-4 shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-[#15284f]">
            Interactive Lunchbox Lab: Variable Assignment &amp; Reassignment
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 font-medium">
            Drag any custom-illustrated meal into the lunchbox (or click it) to watch Python update computer memory in real time.
          </p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <span className="px-3 py-1 rounded-full bg-amber-100 border border-amber-300 text-amber-900 font-mono text-xs font-bold">
            Reassignments: {assignmentCount}
          </span>
        </div>
      </div>

      {/* Draggable Food Tray (5 Custom SVG Meals) */}
      <div className="bg-white/95 border-2 border-slate-200 rounded-3xl p-4 shadow-lg space-y-2.5">
        <div className="flex items-center justify-between text-xs font-mono text-slate-500 px-1">
          <span className="font-bold text-[#15284f] uppercase tracking-wider">
            1. Pick or Drag a Meal Item (Value)
          </span>
          <span>Drag into the Lunchbox below</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          {FOOD_MENU.map((item) => {
            const isCurrent = selectedFood.id === item.id;
            return (
              <motion.div
                key={item.id}
                draggable
                onDragStart={(e: any) => handleDragStart(e, item)}
                whileHover={{ y: -4, scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => handleAssignFood(item)}
                className={`p-3 rounded-2xl border-2 cursor-grab active:cursor-grabbing transition-all flex flex-col items-center text-center justify-between ${
                  isCurrent
                    ? 'bg-slate-900 text-white border-amber-400 shadow-xl ring-2 ring-amber-400/30'
                    : 'bg-slate-50/90 text-slate-800 border-slate-200 hover:border-[#15284f] shadow-sm'
                }`}
              >
                <div className="my-1">{item.renderArt('w-14 h-14')}</div>
                <div className="space-y-0.5 mt-1">
                  <h4 className={`text-xs font-extrabold ${isCurrent ? 'text-white' : 'text-[#15284f]'}`}>
                    &quot;{item.name}&quot;
                  </h4>
                  <p className={`text-[10px] font-mono ${isCurrent ? 'text-amber-300' : 'text-slate-500'}`}>
                    {item.calories} kcal • {item.proteinGrams}g prot
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Main Split Workbench: Left = 3D Lunchbox Drop Zone | Right = Live Auto-Generated Python Code */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Left 5 Cols: Interactive Drop Zone */}
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`lg:col-span-5 p-6 rounded-3xl border-2 transition-all flex flex-col items-center justify-between shadow-xl ${
            isDraggingOver
              ? 'bg-sky-950/90 border-cyan-400 ring-4 ring-cyan-400/30'
              : 'bg-white/95 border-slate-200'
          }`}
        >
          <div className="w-full flex items-center justify-between text-xs font-mono text-slate-500 mb-2">
            <span className="font-bold text-[#15284f] uppercase">2. Variable Container</span>
            <span className="text-amber-600 font-bold">Drop Zone</span>
          </div>

          <LunchboxContainerIllustration
            foodItem={selectedFood}
            isDraggingOver={isDraggingOver}
            variableName="lunch_box"
          />

          <div className="mt-4 w-full p-3 rounded-xl bg-slate-100 border border-slate-200 text-center">
            <p className="text-xs text-slate-700 font-medium">
              {previousFoodName ? (
                <>
                  Replaced old value <code className="font-mono font-bold text-rose-600">&quot;{previousFoodName}&quot;</code> with{' '}
                  <code className="font-mono font-bold text-emerald-700">&quot;{selectedFood.name}&quot;</code>!
                </>
              ) : (
                <>
                  Variable <code className="font-mono font-bold text-[#15284f]">lunch_box</code> currently stores{' '}
                  <code className="font-mono font-bold text-amber-700">&quot;{selectedFood.name}&quot;</code>.
                </>
              )}
            </p>
          </div>
        </div>

        {/* Right 7 Cols: Live Synchronized Python Code & Terminal Output */}
        <div className="lg:col-span-7 rounded-3xl bg-slate-900 border-2 border-slate-800 shadow-2xl overflow-hidden flex flex-col justify-between text-white">
          <div>
            {/* Code Header */}
            <div className="px-5 py-3.5 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-amber-400" />
                <span className="font-mono text-xs font-bold text-slate-200">
                  live_lunchbox_memory.py
                </span>
              </div>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-950 text-emerald-300 border border-emerald-700">
                Auto-Synced Python Code
              </span>
            </div>

            {/* Live Python Code Editor View */}
            <div className="p-5 font-mono text-xs sm:text-sm leading-relaxed space-y-2 bg-[#060b19]">
              {previousFoodName && (
                <div className="text-slate-500 line-through">
                  # Previous value overwritten in memory:
                  <br />
                  lunch_box = &quot;{previousFoodName}&quot;
                </div>
              )}

              <motion.div
                key={selectedFood.id}
                initial={{ backgroundColor: 'rgba(245, 158, 11, 0.25)' }}
                animate={{ backgroundColor: 'rgba(245, 158, 11, 0)' }}
                transition={{ duration: 0.8 }}
                className="p-2.5 rounded-xl border border-slate-800/80 space-y-1"
              >
                <div className="text-slate-400"># 1. Store meal inside variable container</div>
                <div>
                  <span className="text-sky-300 font-bold">lunch_box</span>{' '}
                  <span className="text-amber-400 font-bold">=</span>{' '}
                  <span className="text-emerald-300 font-bold">&quot;{selectedFood.name}&quot;</span>
                </div>
                <div>
                  <span className="text-sky-300 font-bold">calories</span>{' '}
                  <span className="text-amber-400 font-bold">=</span>{' '}
                  <span className="text-purple-300 font-bold">{selectedFood.calories}</span>
                </div>
                <div>
                  <span className="text-sky-300 font-bold">protein_grams</span>{' '}
                  <span className="text-amber-400 font-bold">=</span>{' '}
                  <span className="text-purple-300 font-bold">{selectedFood.proteinGrams}</span>
                </div>
                <div>
                  <span className="text-sky-300 font-bold">is_served_hot</span>{' '}
                  <span className="text-amber-400 font-bold">=</span>{' '}
                  <span className="text-amber-300 font-bold">{selectedFood.isHot ? 'True' : 'False'}</span>
                </div>
              </motion.div>

              <div className="pt-1 text-slate-300">
                <span className="text-slate-500"># 2. Inspect the box contents</span>
                <br />
                <span className="text-cyan-300">print</span>(
                <span className="text-emerald-300">&quot;Inside box:&quot;</span>, lunch_box,{' '}
                <span className="text-emerald-300">&quot;|&quot;</span>, calories,{' '}
                <span className="text-emerald-300">&quot;kcal&quot;</span>)
              </div>
            </div>
          </div>

          {/* Live Console Output */}
          <div className="p-5 bg-slate-950 border-t border-slate-800 space-y-2 font-mono text-xs">
            <div className="flex items-center justify-between text-slate-400 text-[11px]">
              <span>LIVE PYTHON TERMINAL OUTPUT:</span>
              <span className="text-cyan-400">type(lunch_box) ➔ str</span>
            </div>
            <motion.div
              key={selectedFood.id + '-out'}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-amber-300 font-bold text-xs sm:text-sm"
            >
              &gt;&gt;&gt; Inside box: {selectedFood.name} | {selectedFood.calories} kcal
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};
