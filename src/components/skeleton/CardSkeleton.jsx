import React from "react";

const CardSkeleton = ({ 
  showHeader = true, 
  showBody = true, 
  bodyLines = 3,
  showFooter = false 
}) => {
  return (
    <div className="rounded-md bg-white dark:bg-slate-700 h-full shadow-base animate-pulse">
      {showHeader && (
        <div className="p-6 border-b border-slate-200 dark:border-slate-600">
          <div className="flex justify-between items-center">
            <div className="h-5 w-32 bg-[#C4C4C4] dark:bg-slate-500 rounded"></div>
            <div className="h-4 w-4 bg-[#C4C4C4] dark:bg-slate-500 rounded-full"></div>
          </div>
        </div>
      )}
      
      {showBody && (
        <div className="p-6">
          <div className="space-y-3">
            {Array.from({ length: bodyLines }).map((_, i) => (
              <div
                key={i}
                className={`h-3 bg-[#C4C4C4] dark:bg-slate-500 rounded ${
                  i === bodyLines - 1 ? "w-2/3" : "w-full"
                }`}
              ></div>
            ))}
          </div>
          {bodyLines > 3 && (
            <div className="mt-6 grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="h-2 bg-[#C4C4C4] dark:bg-slate-500 rounded w-1/2"></div>
                <div className="h-2 bg-[#C4C4C4] dark:bg-slate-500 rounded"></div>
              </div>
              <div className="space-y-2">
                <div className="h-2 bg-[#C4C4C4] dark:bg-slate-500 rounded w-1/2"></div>
                <div className="h-2 bg-[#C4C4C4] dark:bg-slate-500 rounded"></div>
              </div>
            </div>
          )}
        </div>
      )}
      
      {showFooter && (
        <div className="p-6 border-t border-slate-200 dark:border-slate-600">
          <div className="h-4 w-24 bg-[#C4C4C4] dark:bg-slate-500 rounded"></div>
        </div>
      )}
    </div>
  );
};

export default CardSkeleton;

