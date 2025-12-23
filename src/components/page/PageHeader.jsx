import React from "react";

const PageHeader = ({ title, actions, className = "" }) => {
  return (
    <div className={`float-left w-full mb-[20px] ${className}`}>
      <div className="text-[20px] font-bold text-[#000] dark:text-slate-300 w-full float-right">
        {actions && actions.length > 0 && (
          <>
            {actions.map((action, index) => (
              <div
                key={index}
                className={index < actions.length - 1 ? "float-right mr-4" : "float-right"}
              >
                {action}
              </div>
            ))}
          </>
        )}
        {title && <div className="float-left">{title}</div>}
      </div>
    </div>
  );
};

export default PageHeader;

