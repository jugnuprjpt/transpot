import React, { useEffect, useState } from "react";
import SimpleBar from "simplebar-react";
import Icon from "@/components/ui/Icon";
import { ShowErrorToast } from "../components/ToastMessage/ToastMessage";
import axios from "axios";
import { http } from "../../_apiConfig/http";

const LoadView = ({ open, setOpen, viewId, dovViewData }) => {
  const token = localStorage.getItem("token");

  console.log(dovViewData, "........");

  const handleCloseDrawer = () => {
    setOpen(false);
  };

  const docDownload = async (data) => {
    try {
      // setIsLoading(true);
      const url = `https://431a-2401-4900-8fc9-4ae3-69fa-d56b-7b25-be62.ngrok-free.app/api/driver_document_management/download`;

      const formdata = {
        year: dovViewData?.document_year,
        month: dovViewData?.document_month,
        sub_folder_name: dovViewData?.sub_folder_name,
        driver_name: dovViewData?.driver_name,
        document_name: dovViewData?.original_document_name,
      };

      const res = await axios.post(url, formdata, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },

        responseType: "blob",
        withCredentials: true,
        mode: "cors",
      });

      if (res.status === 200) {
        const blob = new Blob([res.data]);
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `${data?.original_document_name}`);
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
                    View Load Detail
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
                  <li className="w-[45%] font-bold  mx-[10px] float-left">
                    Load Number
                    <span className="font-normal mt-[2px] mr-[10px] float-left w-full ">
                      {dovViewData?.load_number}
                    </span>
                  </li>
                  <li className="w-[45%] font-bold mx-[10px] float-left">
                    Driver Name
                    <span className="font-normal mt-[2px] mr-[10px] float-left w-full">
                      {dovViewData?.driver_name}
                    </span>
                  </li>
                </ul>
                <ul className="float-left w-full  mb-[20px]">
                  <li className="w-[45%] font-bold  mx-[10px] float-left">
                    Company Name
                    <span className="font-normal mt-[2px] mr-[10px] float-left w-full">
                      {dovViewData?.company_name}
                    </span>
                  </li>
                  <li className="w-[45%] font-bold mx-[10px] float-left">
                    Trailer Used
                    <span className="font-normal mt-[2px] mr-[10px] float-left w-full">
                      {dovViewData?.trailer_used}
                    </span>
                  </li>
                </ul>
                <ul className="float-left w-full  mb-[20px]">
                  <li className="w-[45%] font-bold  mx-[10px] float-left">
                    Source
                    <span className="font-normal mt-[2px] mr-[10px] float-left w-full ">
                      {dovViewData?.source}
                    </span>
                  </li>
                  <li className="w-[45%] font-bold mx-[10px] float-left">
                    Destination
                    <span className="font-normal mt-[2px] mr-[10px] float-left w-full">
                      {dovViewData?.destination}
                    </span>
                  </li>
                </ul>

                <ul className="float-left w-full  mb-[20px]">
                  <li className="w-[45%] font-bold mx-[10px] float-left">
                    Base Price
                    <span className="font-normal mt-[2px] mr-[10px] float-left w-full">
                      {dovViewData?.base_price}
                    </span>
                  </li>
                  <li className="w-[45%] font-bold mx-[10px] float-left">
                    Final Price
                    <span className="font-normal mt-[2px] mr-[10px] float-left w-full">
                      {dovViewData?.final_price}
                    </span>
                  </li>
                </ul>
                <ul className="float-left w-full  mb-[20px]">
                  <li className="w-[45%] font-bold mx-[10px] float-left">
                    Shipping Date
                    <span className="font-normal mt-[2px] mr-[10px] float-left w-full">
                      {dovViewData?.shipping_date}
                    </span>
                  </li>
                  <li className="w-[45%] font-bold mx-[10px] float-left">
                    Delivery Date
                    <span className="font-normal mt-[2px] mr-[10px] float-left w-full">
                      {dovViewData?.delivery_date}
                    </span>
                  </li>
                  <li className="w-[45%] font-bold  mx-[10px] float-left mt-4">
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

export default LoadView;
