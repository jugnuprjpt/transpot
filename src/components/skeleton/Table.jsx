import React from "react";

const SkeletonTable = ({ items, count = 5, columns = 5, showHeader = true }) => {
  const rows = items || Array.from({ length: count || 5 });
  const cols = Array.from({ length: columns || 5 });

  return (
    <div className="w-full bg-white dark:bg-slate-700 shadow-base p-6 rounded-md">
      <table className="animate-pulse w-full border-separate border-spacing-4 table-fixed">
        {showHeader && (
          <thead>
            <tr>
              {cols.map((_, colIndex) => (
                <th key={colIndex} scope="col">
                  <div className="h-4 bg-[#C4C4C4] dark:bg-slate-500 rounded"></div>
                </th>
              ))}
            </tr>
          </thead>
        )}
        <tbody className="table-group-divider">
          {rows.map((item, i) => (
            <tr key={i}>
              {cols.map((_, colIndex) => (
                <td key={colIndex}>
                  <div className="h-2 bg-[#C4C4C4] dark:bg-slate-500 rounded"></div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SkeletonTable;
