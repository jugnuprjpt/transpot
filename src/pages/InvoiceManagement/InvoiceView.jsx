import React, { useEffect, useState } from "react";
import SimpleBar from "simplebar-react";
import Icon from "@/components/ui/Icon";
import { ShowErrorToast } from "../components/ToastMessage/ToastMessage";
import axios from "axios";
import { http } from "../../_apiConfig/http";

const InvoiceView = ({ open, setOpen, pendingData }) => {
  const token = localStorage.getItem("token");

  const handleCloseDrawer = () => {
    setOpen(false);
  };

  console.log(pendingData, "pendingData...........");

  const docDownload = async (data) => {
    try {
      // setIsLoading(true);
      const url = `https://3bb0-2401-4900-8fcb-75fd-7d14-b266-7b60-6a31.ngrok-free.app/api/driver_document_management/download`;

      const formdata = {
        year: data?.document_year.toString(),
        month: data?.document_month.trim(),
        sub_folder_name: data?.sub_folder_name,
        driver_name: data?.driver_name,
        document_name: data?.original_document_name,
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
                    View Invoice Detail
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
                    Load Number
                    <span className="font-normal mt-[2px] mr-[10px] float-left w-full">
                      {pendingData?.loadNumber}
                    </span>
                  </li>
                  <li className="w-[45%] font-bold  mx-[10px] float-left">
                    Company Name
                    <span className="font-normal mt-[2px] mr-[10px] float-left w-full">
                      {pendingData?.companyName}
                    </span>
                  </li>
                </ul>
                <ul className="float-left w-full  mb-[20px]">
                  <li className="w-[45%] font-bold mx-[10px] float-left">
                    Driver Name
                    <span className="font-normal mt-[2px] mr-[10px] float-left w-full">
                      {pendingData?.driverName}
                    </span>
                  </li>
                  <li className="w-[45%] font-bold  mx-[10px] float-left">
                    Invoice Number
                    <span className="font-normal mt-[2px] mr-[10px] float-left w-full ">
                      {pendingData?.invoiceNumber}
                    </span>
                  </li>
                </ul>
                <ul className="float-left w-full  mb-[20px]">
                  <li className="w-[45%] font-bold mx-[10px] float-left">
                    Invoice Date
                    <span className="font-normal mt-[2px] mr-[10px] float-left w-full">
                      {pendingData?.invoiceDate}
                    </span>
                  </li>
                  <li className="w-[45%] font-bold  mx-[10px] float-left">
                    Payment Status
                    <span className="font-normal mt-[2px] mr-[10px] float-left w-full ">
                      {pendingData?.paymentStatus}
                    </span>
                  </li>
                </ul>

                <ul className="float-left w-full  mb-[20px]">
                  <li className="w-[45%] font-bold  mx-[10px] float-left">
                    Document
                    <span
                      onClick={() => docDownload(dovViewData)}
                      className="font-normal mt-[2px] mr-[10px] float-left w-full cursor-pointer text-blue-600 dark:text-blue-600"
                    >
                      {/* {dovViewData.document_path} */}
                      Download
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

export default InvoiceView;
