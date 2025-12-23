import React from "react";
import useContentWidth from "@/hooks/useContentWidth";

const LayoutSkeleton = () => {
  const [contentWidth] = useContentWidth();

  return (
    <div className="w-full">
      {/* Breadcrumb Skeleton */}
      <div className="animate-pulse mb-6">
        <div className="h-4 w-48 bg-[#C4C4C4] dark:bg-slate-500 rounded"></div>
      </div>

      {/* Page Header Skeleton */}
      <div className="animate-pulse mb-6">
        <div className="flex justify-between items-center">
          <div className="h-8 w-64 bg-[#C4C4C4] dark:bg-slate-500 rounded"></div>
          <div className="h-10 w-32 bg-[#C4C4C4] dark:bg-slate-500 rounded-full"></div>
        </div>
      </div>

      {/* Content Area Skeleton */}
      <div className="animate-pulse">
        <div className="bg-white dark:bg-slate-700 shadow-base p-6 rounded-md">
          <div className="space-y-4">
            <div className="h-4 bg-[#C4C4C4] dark:bg-slate-500 rounded w-3/4"></div>
            <div className="h-4 bg-[#C4C4C4] dark:bg-slate-500 rounded w-1/2"></div>
            <div className="h-4 bg-[#C4C4C4] dark:bg-slate-500 rounded w-5/6"></div>
            <div className="h-4 bg-[#C4C4C4] dark:bg-slate-500 rounded w-4/5"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LayoutSkeleton;

