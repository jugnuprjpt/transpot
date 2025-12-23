import React from "react";

const CardListSkeleton = ({ count = 5 }) => {
  const cards = Array.from({ length: count });
  
  return (
    <div className="flex flex-col gap-4 w-full animate-pulse">
      {cards.map((_, i) => (
        <div
          key={i}
          className="w-full rounded border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-sm"
        >
          {/* Header skeleton */}
          <div className="flex justify-between items-center px-4 py-3 bg-gray-50 dark:bg-slate-700">
            <div className="h-4 w-32 bg-[#C4C4C4] dark:bg-slate-500 rounded"></div>
            <div className="h-6 w-24 bg-[#C4C4C4] dark:bg-slate-500 rounded"></div>
          </div>
          
          {/* Content skeleton */}
          <div className="px-4 py-4 space-y-3">
            <div className="flex items-center justify-between">
              <div className="h-4 w-24 bg-[#C4C4C4] dark:bg-slate-500 rounded"></div>
              <div className="h-4 w-32 bg-[#C4C4C4] dark:bg-slate-500 rounded"></div>
              <div className="h-4 w-24 bg-[#C4C4C4] dark:bg-slate-500 rounded"></div>
            </div>
            <div className="h-3 w-full bg-[#C4C4C4] dark:bg-slate-500 rounded"></div>
          </div>
          
          {/* Footer skeleton */}
          <div className="flex justify-between items-center px-4 py-2 border-t border-gray-200 dark:border-slate-700">
            <div className="h-3 w-20 bg-[#C4C4C4] dark:bg-slate-500 rounded"></div>
            <div className="flex gap-2">
              <div className="h-8 w-8 bg-[#C4C4C4] dark:bg-slate-500 rounded-full"></div>
              <div className="h-8 w-8 bg-[#C4C4C4] dark:bg-slate-500 rounded-full"></div>
              <div className="h-8 w-8 bg-[#C4C4C4] dark:bg-slate-500 rounded-full"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CardListSkeleton;

