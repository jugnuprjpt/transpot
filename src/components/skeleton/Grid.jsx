import React from "react";

const Grid = ({ 
  items, 
  count = 6,
  columns = null
}) => {
  // set items length by count
  const gridItems = items || Array.from({ length: count });
  
  // Build responsive grid classes
  // Support both object and number/string for backward compatibility
  const getGridClasses = () => {
    if (columns && typeof columns === 'object') {
      // Build custom grid classes based on object
      const classes = ['grid', 'gap-5'];
      
      if (columns.default) classes.push(`grid-cols-${columns.default}`);
      else if (columns.xs) classes.push(`grid-cols-${columns.xs}`);
      else classes.push('grid-cols-1');
      
      if (columns.sm) classes.push(`sm:grid-cols-${columns.sm}`);
      if (columns.md) classes.push(`md:grid-cols-${columns.md}`);
      else classes.push('md:grid-cols-2');
      
      if (columns.lg) classes.push(`lg:grid-cols-${columns.lg}`);
      else classes.push('lg:grid-cols-3');
      
      if (columns.xl) classes.push(`xl:grid-cols-${columns.xl}`);
      if (columns['2xl']) classes.push(`2xl:grid-cols-${columns['2xl']}`);
      
      return classes.join(' ');
    }
    
    // Default responsive grid
    return "grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5";
  };
  
  const gridClasses = getGridClasses();

  return (
    <div className={gridClasses}>
      {gridItems.map((item, i) => (
        <div
          className="rounded-md bg-white dark:bg-slate-700 h-full p-6 shadow-base"
          key={i}
        >
          <div className="animate-pulse">
            <header className="flex justify-between items-center space-x-6">
              <div className="flex-1 flex items-center space-x-4">
                <div className="flex-none flex space-x-2 items-center">
                  <div className="h-10 w-10 rounded bg-[#C4C4C4] dark:bg-slate-500"></div>
                </div>
                <div className="flex-1 bg-[#C4C4C4] dark:bg-slate-500 h-2 rounded-full"></div>
              </div>
              <div className="flex-none">
                <div className="h-6 w-6 rounded-full bg-[#C4C4C4] dark:bg-slate-500"></div>
              </div>
            </header>
            <div className="py-6 space-y-2">
              <div className="h-[6px] bg-[#C4C4C4] dark:bg-slate-500 rounded"></div>
              <div className="h-[6px] bg-[#C4C4C4] dark:bg-slate-500 rounded"></div>
              <div className="h-[6px] bg-[#C4C4C4] dark:bg-slate-500 rounded"></div>
            </div>
            <div className="grid grid-cols-2 gap-5">
              <div className="space-y-2">
                <span className="h-[4px] bg-[#C4C4C4] dark:bg-slate-500 block rounded"></span>
                <span className="h-[4px] bg-[#C4C4C4] dark:bg-slate-500 block rounded"></span>
              </div>

              <div className="space-y-2">
                <span className="h-[4px] bg-[#C4C4C4] dark:bg-slate-500 block rounded"></span>
                <span className="h-[4px] bg-[#C4C4C4] dark:bg-slate-500 block rounded"></span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-5 mt-6">
              <div className="flex -space-x-1">
                <div className="h-6 w-6 bg-[#C4C4C4] dark:bg-slate-500 rounded-full"></div>
                <div className="h-6 w-6 bg-[#C4C4C4] dark:bg-slate-500 rounded-full"></div>
                <div className="h-6 w-6 bg-[#C4C4C4] dark:bg-slate-500 rounded-full"></div>
              </div>
              <div>
                <span className="h-[18px] bg-[#C4C4C4] dark:bg-slate-500 w-[130px] inline-block rounded-full"></span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Grid;
