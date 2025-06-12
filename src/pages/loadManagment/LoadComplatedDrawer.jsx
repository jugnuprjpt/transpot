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

function LoadComplatedDrawer({
  openComplate,
  setOpenComplate,
  assigmentData,
  getProgressData,
}) {
  const { driverData } = useGetDriverListing();
  const inputRef = useRef(null);

  const [FormState, SetFormState] = useState({
    driver_name: { errors: "", valid: false },
    lumper_value: { errors: "", valid: false },
    lumper_paid_by: { errors: "", valid: false },
    detention_value: { errors: "", valid: false },
    scale_value: { errors: "", valid: false },
    extra_stop_charge: { errors: "", valid: false },
    trailer_wash: { errors: "", valid: false },
    detention_at: { errors: "", valid: false },
    amount: { errors: "", valid: false },
    layover: { errors: "", valid: false },
    roc: { errors: "", valid: false },
    pod: { errors: "", valid: false },
    lumper_reciept: { errors: "", valid: false },
    scale_reciept: { errors: "", valid: false },
    is_detention: { errors: "", valid: false },
    is_layover: { errors: "", valid: false },
  });
  const [allData, setAllData] = useState({
    driver_name: "",
    driver_id: "",
    load_id: 0,
    load_number: "",
    lumper_value: 0,
    lumper_paid_by: "",
    detention_value: 0,
    scale_value: 0,
    extra_stop_charge: 0,
    trailer_wash: 0,
    detention_at: "",
    company_id: "",
    amount: 0,
    layover: 0,
    roc: "",
    pod: "",
    lumper_reciept: "",
    scale_reciept: "",
    is_detention: "",
    is_layover: "",
  });

  const detention = [
    { value: 1, label: "True" },
    { value: 2, label: "False" },
  ];

  const layover = [
    { value: 1, label: "True" },
    { value: 2, label: "False" },
  ];

  const handleCloseDrawer = () => {
    setOpenComplate(false);
    setAllData({
      driver_name: "",
    });
  };

  console.log(getProgressData, "getProgressData....");

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
    // setIsLoading(true);
    // if (isEditOpen == false) {
    const formdata = new FormData();

    formdata.append("driver_name", allData?.driver_name);
    formdata.append("driver_id", allData?.driver_id);
    formdata.append("load_id", getProgressData?.load_id);
    formdata.append("load_number", getProgressData?.load_number);
    formdata.append("lumper_value", allData?.lumper_value);
    formdata.append("lumper_paid_by", allData?.lumper_paid_by);
    formdata.append("detention_value", allData?.detention_value);
    formdata.append("scale_value", allData?.scale_value);
    formdata.append("extra_stop_charge", allData?.extra_stop_charge);
    formdata.append("trailer_wash", allData?.trailer_wash);
    formdata.append("detention_at", allData?.detention_at);
    formdata.append("company_id", getProgressData?.company_id);
    formdata.append("amount", allData?.amount);
    formdata.append("layover", allData?.layover);
    formdata.append("roc", allData?.roc);
    formdata.append("pod", allData?.pod);
    formdata.append("lumper_reciept", allData?.lumper_reciept);
    formdata.append("scale_reciept", allData?.scale_reciept);
    formdata.append("is_detention", allData?.is_detention);
    formdata.append("is_layover", allData?.is_layover);

    const res = await loadManagementService.progressComplated(formdata);
    console.log(res, "........");
    if (res.Success == true) {
      // setIsLoading(false);

      setOpenComplate(false);
      handleCloseDrawer();
      ShowSuccessToast(res?.Message);
    } else {
      // setIsLoading(false);
      ShowErrorToast("Something Went Wrong");
    }
    // }
  };
  return (
    <>
      {" "}
      <>
        {" "}
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
                      Load Complete
                    </span>
                  </div>
                  <div className="cursor-pointer text-2xl text-gray-800 dark:text-gray-200">
                    <button onClick={handleCloseDrawer}>
                      <Icon icon="heroicons-outline:x" />
                    </button>
                  </div>
                </header>
                <div className="grid xl:grid-cols-3 gap-4 py-2 text-sm">
                  <div className="flex flex-col gap-2">
                    <label className="text-sm text-gray-600 dark:text-gray-400">
                      Driver Name*
                    </label>
                    <CommonSelectInput
                      isClearable={true}
                      className="react-select"
                      classNamePrefix="select"
                      name="driver_id"
                      placeholder="Select Driver Name"
                      options={driverData}
                      value={driverData}
                      tenderForm={allData}
                      setTenderForm={setAllData}
                      SetFormState={SetFormState}
                      IsValidate={true}
                    />
                    <span className="text-red-500 text-sm">
                      {FormState?.driver_id?.errors}
                    </span>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm text-gray-600 dark:text-gray-400">
                      Lumper Value
                    </label>
                    <CommonTextInput
                      value={allData?.lumper_value}
                      id="lumper_value"
                      type="text"
                      placeholder="Lumper Value"
                      name="lumper_value"
                      tenderForm={allData}
                      setTenderForm={setAllData}
                      SetFormState={SetFormState}
                      IsValidate={true}
                    />
                    <span className="text-red-500 text-sm">
                      {FormState?.lumper_value?.errors}
                    </span>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm text-gray-600 dark:text-gray-400">
                      Lumper Paid By
                    </label>
                    <CommonTextInput
                      value={allData?.lumper_paid_by}
                      id="lumper_paid_by"
                      type="text"
                      placeholder="Lumper Paid By"
                      name="lumper_paid_by"
                      tenderForm={allData}
                      setTenderForm={setAllData}
                      SetFormState={SetFormState}
                      IsValidate={true}
                    />
                    <span className="text-red-500 text-sm">
                      {FormState?.lumper_paid_by?.errors}
                    </span>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm text-gray-600 dark:text-gray-400">
                      Detention Value
                    </label>
                    <CommonTextInput
                      value={allData?.detention_value}
                      id="detention_value"
                      type="text"
                      placeholder="Detention Value"
                      name="detention_value"
                      tenderForm={allData}
                      setTenderForm={setAllData}
                      SetFormState={SetFormState}
                      IsValidate={true}
                    />
                    <span className="text-red-500 text-sm">
                      {FormState?.detention_value?.errors}
                    </span>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm text-gray-600 dark:text-gray-400">
                      Scale Value
                    </label>
                    <CommonTextInput
                      value={allData?.scale_value}
                      id="scale_value"
                      type="text"
                      placeholder="Scale Value"
                      name="scale_value"
                      tenderForm={allData}
                      setTenderForm={setAllData}
                      SetFormState={SetFormState}
                      IsValidate={true}
                    />
                    <span className="text-red-500 text-sm">
                      {FormState?.scale_value?.errors}
                    </span>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm text-gray-600 dark:text-gray-400">
                      Extra Stop Charge
                    </label>
                    <CommonTextInput
                      value={allData?.extra_stop_charge}
                      id="extra_stop_charge"
                      type="text"
                      placeholder="Extra Stop Charge"
                      name="extra_stop_charge"
                      tenderForm={allData}
                      setTenderForm={setAllData}
                      SetFormState={SetFormState}
                      IsValidate={true}
                    />
                    <span className="text-red-500 text-sm">
                      {FormState?.extra_stop_charge?.errors}
                    </span>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm text-gray-600 dark:text-gray-400">
                      Trailer Wash
                    </label>
                    <CommonTextInput
                      value={allData?.trailer_wash}
                      id="trailer_wash"
                      type="text"
                      placeholder="Trailer Wash"
                      name="trailer_wash"
                      tenderForm={allData}
                      setTenderForm={setAllData}
                      SetFormState={SetFormState}
                      IsValidate={true}
                    />
                    <span className="text-red-500 text-sm">
                      {FormState?.trailer_wash?.errors}
                    </span>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm text-gray-600 dark:text-gray-400">
                      Detention At
                    </label>
                    <CommonTextInput
                      value={allData?.detention_at}
                      id="detention_at"
                      type="text"
                      placeholder="Detention At"
                      name="detention_at"
                      tenderForm={allData}
                      setTenderForm={setAllData}
                      SetFormState={SetFormState}
                      IsValidate={true}
                    />
                    <span className="text-red-500 text-sm">
                      {FormState?.detention_at?.errors}
                    </span>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm text-gray-600 dark:text-gray-400">
                      Amount
                    </label>
                    <CommonTextInput
                      value={allData?.amount}
                      id="amount"
                      type="text"
                      placeholder="Amount"
                      name="amount"
                      tenderForm={allData}
                      setTenderForm={setAllData}
                      SetFormState={SetFormState}
                      IsValidate={true}
                    />
                    <span className="text-red-500 text-sm">
                      {FormState?.amount?.errors}
                    </span>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm text-gray-600 dark:text-gray-400">
                      Layover
                    </label>
                    <CommonTextInput
                      value={allData?.layover}
                      id="layover"
                      type="text"
                      placeholder="Layover"
                      name="layover"
                      tenderForm={allData}
                      setTenderForm={setAllData}
                      SetFormState={SetFormState}
                      IsValidate={true}
                    />
                    <span className="text-red-500 text-sm">
                      {FormState?.layover?.errors}
                    </span>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm text-gray-600 dark:text-gray-400">
                      Is Layover
                    </label>

                    <CommonSelectInput
                      isClearable={true}
                      className="react-select"
                      classNamePrefix="select"
                      name="is_layover"
                      placeholder="Select Is Layover"
                      options={layover}
                      value={layover}
                      tenderForm={allData}
                      setTenderForm={setAllData}
                      SetFormState={SetFormState}
                      IsValidate={true}
                    />
                    <span className="text-red-500 text-sm">
                      {FormState?.is_layover?.errors}
                    </span>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm text-gray-600 dark:text-gray-400">
                      Is Detention
                    </label>
                    <CommonSelectInput
                      isClearable={true}
                      className="react-select"
                      classNamePrefix="select"
                      name="is_detention"
                      placeholder="Select Is Detention"
                      options={detention}
                      value={detention}
                      tenderForm={allData}
                      setTenderForm={setAllData}
                      SetFormState={SetFormState}
                      IsValidate={true}
                    />
                    <span className="text-red-500 text-sm">
                      {FormState?.is_detention?.errors}
                    </span>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm text-gray-600 dark:text-gray-400">
                      Pod
                    </label>
                    <CommonFileInput
                      className="react-select text-[#000]"
                      classNamePrefix="select"
                      type="file"
                      name="pod"
                      placeholder="Pod"
                      tenderForm={allData}
                      setTenderForm={setAllData}
                      inputRef={inputRef}
                    />
                    <span className="text-red-500 text-sm">
                      {FormState?.pod?.errors}
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

                  <div className="flex flex-col gap-2">
                    <label className="text-sm text-gray-600 dark:text-gray-400">
                      Lumper Reciept
                    </label>
                    <CommonFileInput
                      className="react-select text-[#000]"
                      classNamePrefix="select"
                      type="file"
                      name="lumper_reciept"
                      placeholder="Lumper Reciept"
                      tenderForm={allData}
                      setTenderForm={setAllData}
                      inputRef={inputRef}
                    />
                    <span className="text-red-500 text-sm">
                      {FormState?.lumper_reciept?.errors}
                    </span>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm text-gray-600 dark:text-gray-400">
                      Scale Reciept
                    </label>

                    <CommonFileInput
                      className="react-select text-[#000]"
                      classNamePrefix="select"
                      type="file"
                      name="scale_reciept"
                      placeholder="Scale Reciept"
                      tenderForm={allData}
                      setTenderForm={setAllData}
                      inputRef={inputRef}
                    />
                    <span className="text-red-500 text-sm">
                      {FormState?.scale_reciept?.errors}
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

export default LoadComplatedDrawer;
