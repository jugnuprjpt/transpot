import React, { useEffect, useState } from "react";
import SimpleBar from "simplebar-react";
import Icon from "@/components/ui/Icon";
import { ShowErrorToast } from "../components/ToastMessage/ToastMessage";
import axios from "axios";
import { http } from "../../_apiConfig/http";

const DocView = ({ open, setOpen, setViewId, viewId }) => {
  const token = localStorage.getItem("token");

  const [dovViewData, setDovViewData] = useState([]);
  const handleCloseDrawer = () => {
    setOpen(false);
  };

  useEffect(() => {
    open === true && docViewListing();
  }, [open]);

  const docViewListing = async () => {
    try {
      const res = await http.get(
        `api/driver_document_management/get/id/${viewId}`,
        true,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(res, "res");

      if (res.Success === true) {
        console.log(res.Data);
        setDovViewData(res.Data);
      } else {
        setDovViewData([]);
        ShowErrorToast("Something Went Wrong");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const docDownload = async (data) => {
    console.log(data, "d.........");
    try {
      // setIsLoading(true);

      const url = `https://c2f5-2409-40c2-129c-f4b3-c4a6-b07-8fee-ab8e.ngrok-free.app/api/driver_document_management/download`;

      const formdata = {
        year: data?.document_year.toString(),
        month: data?.document_month.toString(),
        sub_folder_name: data?.sub_folder_name,
        driver_name: data?.driver_name,
        document_name: data?.document_name,
      };

      const res = await axios.post(url, formdata, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        responseType: "blob", // Ensures response is treated as a file
        withCredentials: true,
      });

      if (res.status === 200) {
        const blob = new Blob([res.data]);
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `${data?.authorization_doc_path}`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else {
        ShowErrorToast("No Document Found");
        console.error("Failed to download the document");
      }
    } catch (error) {
      console.error("Error fetching the document", error);
    } finally {
      // setIsLoading(false);
    }
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
                      {dovViewData?.driver_name}
                    </span>
                  </li>
                  <li className="w-[45%] font-bold  mx-[10px] float-left">
                    Sub folder Name
                    <span className="font-normal mt-[2px] mr-[10px] float-left w-full">
                      {dovViewData?.sub_folder_name}
                    </span>
                  </li>
                </ul>
                <ul className="float-left w-full  mb-[20px]">
                  <li className="w-[45%] font-bold mx-[10px] float-left">
                    Document Name
                    <span className="font-normal mt-[2px] mr-[10px] float-left w-full">
                      {dovViewData?.document_name}
                    </span>
                  </li>
                  <li className="w-[45%] font-bold  mx-[10px] float-left">
                    Original Document Name
                    <span className="font-normal mt-[2px] mr-[10px] float-left w-full ">
                      {dovViewData?.original_document_name}
                    </span>
                  </li>
                </ul>
                <ul className="float-left w-full  mb-[20px]">
                  <li className="w-[45%] font-bold mx-[10px] float-left">
                    Document Month
                    <span className="font-normal mt-[2px] mr-[10px] float-left w-full">
                      {dovViewData?.document_month}
                    </span>
                  </li>
                  <li className="w-[45%] font-bold  mx-[10px] float-left">
                    Document year
                    <span className="font-normal mt-[2px] mr-[10px] float-left w-full ">
                      {dovViewData?.document_year}
                    </span>
                  </li>
                </ul>

                <ul className="float-left w-full  mb-[20px]">
                  <li className="w-[45%] font-bold mx-[10px] float-left">
                    Document Name
                    <span className="font-normal mt-[2px] mr-[10px] float-left w-full">
                      {dovViewData?.document_name}
                    </span>
                  </li>
                  <li className="w-[45%] font-bold  mx-[10px] float-left">
                    Download
                    <span
                      onClick={() => docDownload(dovViewData)}
                      className="font-normal mt-[2px] mr-[10px] float-left w-full cursor-pointer text-blue-600 dark:text-blue-600"
                    >
                      {/* {dovViewData.document_path} */}
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
