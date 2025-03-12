import React from "react";
import SimpleBar from "simplebar-react";
import Icon from "@/components/ui/Icon";

const DocView = ({ open, setOpen }) => {
  const handleCloseDrawer = () => {
    setOpen(false);
  };
  return (
    <div>
      {" "}
      <div>
        {open === true && (
          <div
            className={`
setting-wrapper fixed overflow-y-scroll ltr:right-0 rtl:left-0 top-0 md:w-[700px] w-[700px]
bg-white dark:bg-slate-800 h-screen z-[99999]  md:pb-6 pb-[100px] shadow-base2
dark:shadow-base3 border border-slate-200 dark:border-slate-700 transition-all duration-150 
${
  open
    ? "translate-x-0 opacity-100 visible"
    : "ltr:translate-x-full rtl:-translate-x-full opacity-0 invisible"
}
`}
          >
            <SimpleBar className="px-6" style={{ height: "100%" }}>
              <header className="flex items-center justify-between border-b border-gray-200 dark:border-gray-700 -mx-6 px-6 py-2 mb-4">
                <div>
                  <span className="text-[14px] xl:text-[16px] 2xl:text-[16px] font-bold text-gray-800 dark:text-gray-200 mb-[20px]">
                    View Document Detail
                  </span>
                </div>
                <div className="cursor-pointer text-2xl text-gray-800 dark:text-gray-200">
                  <button onClick={handleCloseDrawer}>
                    <Icon icon="heroicons-outline:x" />
                  </button>
                </div>
              </header>
              <div className="">
                <ul className="float-left w-full mb-[20px]">
                  <li className="w-[45%] font-bold mx-[10px] float-left">
                    Driver Name
                    <span className="font-normal mt-[2px] mr-[10px] float-left w-full">
                      jhgjhgj
                    </span>
                  </li>
                  <li className="w-[45%] font-bold  mx-[10px] float-left">
                    Parenet Folder Name
                    <span className="font-normal mt-[2px] mr-[10px] float-left w-full">
                      kjhkjh
                    </span>
                  </li>
                </ul>
                <ul className="float-left w-full  mb-[20px]">
                  <li className="w-[45%] font-bold mx-[10px] float-left">
                    Annual Dot Inspection
                    <span className="font-normal mt-[2px] mr-[10px] float-left w-full">
                      jhkhkh
                    </span>
                  </li>
                  <li className="w-[45%] font-bold  mx-[10px] float-left">
                    Download
                    <span className="font-normal mt-[2px] mr-[10px] float-left w-full cursor-pointer text-blue-600 dark:text-blue-600">
                      Document
                    </span>
                  </li>
                </ul>
              </div>
            </SimpleBar>
          </div>
        )}
      </div>
    </div>
  );
};

export default DocView;
