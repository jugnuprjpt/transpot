import React from "react";

const ContentSkeleton = ({ lines = 4, showTitle = true }) => {
  return (
    <div className="animate-pulse">
      <div className="bg-white dark:bg-slate-700 shadow-base p-6 rounded-md">
        {showTitle && (
          <div className="mb-4">
            <div className="h-6 w-48 bg-[#C4C4C4] dark:bg-slate-500 rounded mb-2"></div>
            <div className="h-1 w-full bg-slate-200 dark:bg-slate-600 rounded"></div>
          </div>
        )}
        <div className="space-y-3">
          {Array.from({ length: lines }).map((_, i) => (
            <div
              key={i}
              className={`h-4 bg-[#C4C4C4] dark:bg-slate-500 rounded ${
                i === lines - 1 ? "w-3/4" : i % 2 === 0 ? "w-full" : "w-5/6"
              }`}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ContentSkeleton;

