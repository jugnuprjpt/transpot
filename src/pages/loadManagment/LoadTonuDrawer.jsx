import React, { useEffect, useRef, useState } from "react";
import SimpleBar from "simplebar-react";
import Icon from "@/components/ui/Icon";
import useGetDriverListing from "../../hooks/useDriverListing";
import { ValidaterHelper } from "../components/validationFunction/ValidationCheck";
import {
  ShowErrorToast,
  ShowSuccessToast,
} from "../components/ToastMessage/ToastMessage";
import CommonSelectInput from "../components/InputField/CommonSelectInput";
import CommonTextInput from "../components/InputField/CommonTextInput";

import { loadManagementService } from "../../_services/loadManagementService";
import CommonFileInput from "../components/InputField/CommonFileInput";
import Loading from "@/components/Loading";

function LoadTonuDrawer({ openComplate, setOpenComplate, getProgressData }) {
  const inputRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);

  const [FormState, SetFormState] = useState({
    new_load_number: { errors: "", valid: false },
    tonu: { errors: "", valid: false },
    tonu_charges: { errors: "", valid: false },
    // requesting_user: { errors: "", valid: false },
    roc: { errors: "", valid: false },
  });
  const [allData, setAllData] = useState({
    driver_name: "",
    load_id: 0,
    old_load_number: "",
    new_load_number: "",
    tonu: "",
    company_id: 0,
    tonu_charges: 0,
    // requesting_user: "",
    roc: "",
  });

  const tonuSelect = [
    { value: "True", label: "Yes" },
    { value: "False", label: "No" },
  ];

  const handleCloseDrawer = () => {
    setOpenComplate(false);
    setAllData({
      driver_name: "",
      load_id: 0,
      old_load_number: "",
      new_load_number: "",
      tonu: "",
      company_id: 0,
      tonu_charges: 0,
      // requesting_user: "",
      roc: "",
    });
  };

  const handleSubmit = async () => {
    const isFormValid = ValidaterHelper.ValidateFromState(
      FormState,
      SetFormState,
      {
        ...allData,
      }
    );

    if (!isFormValid) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    setIsLoading(true);
    // if (isEditOpen == false) {
    const formdata = new FormData();

    formdata.append("driver_name", getProgressData?.driver_name);
    formdata.append("load_id", getProgressData?.load_id);
    formdata.append("old_load_number", getProgressData?.load_number);
    formdata.append("new_load_number", allData?.new_load_number);
    formdata.append("tonu", allData?.tonu);
    formdata.append("company_id", getProgressData?.company_id);
    formdata.append("tonu_charges", allData?.tonu_charges);
    // formdata.append("requesting_user", allData?.requesting_user);
    formdata.append("roc", allData?.roc);

    const res = await loadManagementService.requestToTonu(formdata);

    if (res.Success == true) {
      setIsLoading(false);

      setOpenComplate(false);
      handleCloseDrawer();
      ShowSuccessToast(res?.Message);
    } else {
      setIsLoading(false);
      ShowErrorToast("Something Went Wrong");
    }
    // }
  };
  return (
    <>
      {" "}
      <>
        {isLoading && (
          <div className="fixed inset-0 z-[999999] bg-black/40 backdrop-blur-sm flex items-center justify-center">
            <Loading />
          </div>
        )}{" "}
        <div>
          {openComplate === true && (
            <div
              className={`
setting-wrapper fixed overflow-y-scroll ltr:right-0 rtl:left-0 top-0 md:w-[850px] w-[200px]
bg-white dark:bg-slate-800 h-screen z-[99999]  md:pb-6 pb-[100px] shadow-base2
dark:shadow-base3 border border-slate-200 dark:border-slate-700 transition-all duration-150 
${
  openComplate
    ? "translate-x-0 opacity-100 visible"
    : "ltr:translate-x-full rtl:-translate-x-full opacity-0 invisible"
}

`}
            >
              <SimpleBar className="px-6 h-full">
                <header className="flex items-center justify-between border-b border-gray-200 dark:border-gray-700 -mx-6 px-6 py-2 mb-4">
                  <div>
                    <span className="text-[14px] xl:text-[16px] 2xl:text-[16px] font-bold text-gray-600 dark:text-gray-400 mb-[20px]">
                      Tonu
                    </span>
                  </div>
                  <div className="cursor-pointer text-2xl text-gray-800 dark:text-gray-200">
                    <button onClick={handleCloseDrawer}>
                      <Icon icon="heroicons-outline:x" />
                    </button>
                  </div>
                </header>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 py-3">
                  {/* Load Number */}
                  <div className="flex items-center gap-3 bg-blue-50 border border-blue-100 rounded-xl p-3">
                    <div className="bg-blue-100 text-blue-500 rounded-full p-1.5">
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M9 17v-6h13v6m-4-3h-5m-6 8H5a2 2 0 01-2-2V7a2 2 0 012-2h4l2-2h6a2 2 0 012 2v4"
                        />
                      </svg>
                    </div>
                    <div>
                      <div className="text-gray-400 text-xs">Load Number</div>
                      <div className="text-blue-700 font-semibold text-base">
                        {getProgressData.load_number}
                      </div>
                    </div>
                  </div>

                  {/* Driver Name */}
                  <div className="flex items-center gap-3 bg-green-50 border border-green-100 rounded-xl p-3">
                    <div className="bg-green-100 text-green-500 rounded-full p-1.5">
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5.121 17.804A13.937 13.937 0 0112 15c2.25 0 4.374.525 6.256 1.453M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                    </div>
                    <div>
                      <div className="text-gray-400 text-xs">Driver Name</div>
                      <div className="text-green-700 font-semibold text-base">
                        {getProgressData.driver_name}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="grid xl:grid-cols-2 gap-4 py-2 text-sm">
                  <div className="flex flex-col gap-2">
                    <label className="text-sm text-gray-600 dark:text-gray-400">
                      Load Number
                    </label>
                    <CommonTextInput
                      value={allData?.new_load_number}
                      id="new_load_number"
                      type="text"
                      placeholder="Load Number"
                      name="new_load_number"
                      tenderForm={allData}
                      setTenderForm={setAllData}
                      SetFormState={SetFormState}
                      IsValidate={true}
                    />
                    <span className="text-red-500 text-sm">
                      {FormState?.new_load_number?.errors}
                    </span>
                  </div>

                  {/* <div className="flex flex-col gap-2">
                    <label className="text-sm text-gray-600 dark:text-gray-400">
                      Requesting User
                    </label>
                    <CommonTextInput
                      value={allData?.requesting_user}
                      id="requesting_user"
                      type="text"
                      placeholder="Requesting User"
                      name="requesting_user"
                      tenderForm={allData}
                      setTenderForm={setAllData}
                      SetFormState={SetFormState}
                      IsValidate={true}
                    />
                    <span className="text-red-500 text-sm">
                      {FormState?.requesting_user?.errors}
                    </span>
                  </div> */}
                  <div className="flex flex-col gap-2">
                    <label className="text-sm text-gray-600 dark:text-gray-400">
                      Tonu Charges
                    </label>
                    <CommonTextInput
                      value={allData?.tonu_charges}
                      id="tonu_charges"
                      type="text"
                      placeholder="Tonu Charges"
                      name="tonu_charges"
                      tenderForm={allData}
                      setTenderForm={setAllData}
                      SetFormState={SetFormState}
                      IsValidate={true}
                    />
                    <span className="text-red-500 text-sm">
                      {FormState?.tonu_charges?.errors}
                    </span>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-sm text-gray-600 dark:text-gray-400">
                      Tonu
                    </label>
                    <CommonSelectInput
                      isClearable={true}
                      className="react-select"
                      classNamePrefix="select"
                      name="tonu"
                      placeholder="Select Tonu"
                      options={tonuSelect}
                      value={tonuSelect}
                      tenderForm={allData}
                      setTenderForm={setAllData}
                      SetFormState={SetFormState}
                      IsValidate={true}
                    />
                    <span className="text-red-500 text-sm">
                      {FormState?.tonu?.errors}
                    </span>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-sm text-gray-600 dark:text-gray-400">
                      Roc
                    </label>

                    <CommonFileInput
                      className="react-select text-[#000]"
                      classNamePrefix="select"
                      type="file"
                      name="roc"
                      placeholder="Roc"
                      tenderForm={allData}
                      setTenderForm={setAllData}
                      inputRef={inputRef}
                    />
                    <span className="text-red-500 text-sm">
                      {FormState?.roc?.errors}
                    </span>
                  </div>
                </div>

                <div className="flex gap-4">
                  <button
                    className="mt-2  text-white px-4 py-2 rounded hover:bg-success-500 text-success-500 bg-success-500"
                    onClick={handleSubmit}
                  >
                    <div className="flex items-center">
                      <div className=" border-t-2 border-white-500 mr-2"></div>
                    </div>
                    Submit
                  </button>
                  <button
                    className="mt-2 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                    onClick={handleCloseDrawer}
                  >
                    Cancel
                  </button>
                </div>
              </SimpleBar>
            </div>
          )}
        </div>
      </>
    </>
  );
}

export default LoadTonuDrawer;
