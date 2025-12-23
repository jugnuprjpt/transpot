import React from "react";

const PageHeaderSkeleton = ({ showActions = true, actionCount = 1 }) => {
  return (
    <div className="animate-pulse mb-6">
      <div className="flex justify-between items-center">
        {/* Title skeleton */}
        <div className="h-8 w-64 bg-[#C4C4C4] dark:bg-slate-500 rounded"></div>
        
        {/* Action buttons skeleton */}
        {showActions && (
          <div className="flex items-center space-x-3 rtl:space-x-reverse">
            {Array.from({ length: actionCount }).map((_, i) => (
              <div
                key={i}
                className="h-10 w-32 bg-[#C4C4C4] dark:bg-slate-500 rounded-full"
              ></div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PageHeaderSkeleton;

