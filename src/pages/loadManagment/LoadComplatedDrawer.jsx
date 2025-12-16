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

function LoadComplatedDrawer({
  openComplate,
  setOpenComplate,
  getProgressData,
}) {
  const inputRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);

  const [FormState, SetFormState] = useState({
    // driver_name: { errors: "", valid: false },
    // lumper_value: { errors: "", valid: false },
    // lumper_paid_by: { errors: "", valid: false },
    // detention_value: { errors: "", valid: false },
    // scale_value: { errors: "", valid: false },
    // extra_stop_charge: { errors: "", valid: false },
    // trailer_wash: { errors: "", valid: false },
    // detention_at: { errors: "", valid: false },
    amount: { errors: "", valid: false },
    // layover: { errors: "", valid: false },
    // roc: { errors: "", valid: false },
    pod: { errors: "", valid: false },
    // load_approval: { errors: "", valid: false },
    // scale_reciept: { errors: "", valid: false },
    // detention_flag: { errors: "", valid: false },
    // layover_flag: { errors: "", valid: false },
  });
  const [allData, setAllData] = useState({
    driver_name: "",
    driver_id: "",
    load_id: 0,
    load_number: "",
    lumper_value: 0,
    // lumper_paid_by: "",
    detention_value: 0,
    scale_value: 0,
    extra_stop_charge: 0,
    trailer_wash: 0,
    // detention_at: "",
    company_id: "",
    amount: 0,
    layover_value: 0,
    pod: "",
    load_approval: 0,
    detention_flag: "",
    layover_flag: "",
    log_applicable_flag: 0,
  });

  const detentionData = [
    { value: "True", label: "Yes" },
    { value: "False", label: "No" },
  ];

  const layoverData = [
    { value: "True", label: "Yes" },
    { value: "False", label: "No" },
  ];

  const loadSelect = [
    { value: "True", label: "Yes" },
    { value: "False", label: "No" },
  ];

  const logAppicable = [
    { value: "True", label: "Yes" },
    { value: "False", label: "No" },
  ];

  const handleCloseDrawer = () => {
    setOpenComplate(false);
    setAllData({
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
      // detention_at: "",
      company_id: "",
      amount: 0,
      layover_value: 0,
      pod: "",
      detention_flag: "",
      layover_flag: "",
      log_applicable_flag: 0,
    });
  };

  useEffect(() => {
    if (getProgressData?.base_price) {
      setAllData((prev) => ({
        ...prev,
        amount: getProgressData?.base_price,
      }));
    }
  }, [getProgressData]);

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
    formdata.append("driver_id", getProgressData?.assigned_driver_id);
    formdata.append("load_id", getProgressData?.load_id);
    formdata.append("load_number", getProgressData?.load_number);
    formdata.append("lumper_value", allData?.lumper_value);
    // formdata.append("lumper_paid_by", allData?.lumper_paid_by);
    formdata.append("detention_value", allData?.detention_value);
    formdata.append("scale_value", allData?.scale_value);
    formdata.append("extra_stop_charge", allData?.extra_stop_charge);
    formdata.append("trailer_wash", allData?.trailer_wash);
    // formdata.append("detention_at", allData?.detention_at);
    formdata.append("company_id", getProgressData?.company_id);
    formdata.append("amount", allData?.amount);
    formdata.append("layover_value", allData?.layover_value);
    formdata.append("log_applicable_flag", allData?.log_applicable_flag);

    formdata.append("load_approval", allData?.load_approval);

    formdata.append("pod", allData?.pod);
    formdata.append(
      "detention_flag",
      allData?.detention_flag === "" ? "False" : allData?.detention_flag
    );
    formdata.append(
      "layover_flag",
      allData?.layover_flag === "" ? "False" : allData?.layover_flag
    );

    const res = await loadManagementService.progressComplated(formdata);

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
                      Load Complete
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
                <div className="grid xl:grid-cols-3 gap-4 py-2 text-sm">
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
                      Load with approval changes
                    </label>

                    <CommonSelectInput
                      isClearable={true}
                      className="react-select"
                      classNamePrefix="select"
                      name="load_approval"
                      placeholder="Load Approval"
                      options={loadSelect}
                      value={loadSelect}
                      tenderForm={allData}
                      setTenderForm={setAllData}
                      SetFormState={SetFormState}
                      IsValidate={true}
                    />
                    <span className="text-red-500 text-sm">
                      {FormState?.load_approval?.errors}
                    </span>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm text-gray-600 dark:text-gray-400">
                      Log Appilicable
                    </label>

                    <CommonSelectInput
                      isClearable={true}
                      className="react-select"
                      classNamePrefix="select"
                      name="log_applicable_flag"
                      placeholder="Log Appilicable"
                      options={logAppicable}
                      value={logAppicable}
                      tenderForm={allData}
                      setTenderForm={setAllData}
                      SetFormState={SetFormState}
                      IsValidate={true}
                    />
                    <span className="text-red-500 text-sm">
                      {FormState?.log_applicable_flag?.errors}
                    </span>
                  </div>

                  {allData?.load_approval == "True" && (
                    <>
                      <div className="flex flex-col gap-2">
                        <label className="text-sm text-gray-600 dark:text-gray-400">
                          Lumper Amount
                        </label>
                        <CommonTextInput
                          value={allData?.lumper_value}
                          id="lumper_value"
                          type="text"
                          placeholder="Lumper Amount"
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
                      {/* <div className="flex flex-col gap-2">
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
                      </div> */}
                      <div className="flex flex-col gap-2">
                        <label className="text-sm text-gray-600 dark:text-gray-400">
                          Detention Amount
                        </label>
                        <CommonTextInput
                          value={allData?.detention_value}
                          id="detention_value"
                          type="text"
                          placeholder="Detention Amount"
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
                      {/* <div className="flex flex-col gap-2">
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
                      </div> */}

                      <div className="flex flex-col gap-2">
                        <label className="text-sm text-gray-600 dark:text-gray-400">
                          Layover
                        </label>
                        <CommonTextInput
                          value={allData?.layover_value}
                          id="layover_value"
                          type="text"
                          placeholder="Layover"
                          name="layover_value"
                          tenderForm={allData}
                          setTenderForm={setAllData}
                          SetFormState={SetFormState}
                          IsValidate={true}
                        />
                        <span className="text-red-500 text-sm">
                          {FormState?.layover_value?.errors}
                        </span>
                      </div>
                      <div className="flex flex-col gap-2">
                        <label className="text-sm text-gray-600 dark:text-gray-400">
                          Lumper
                        </label>

                        <CommonSelectInput
                          isClearable={true}
                          className="react-select"
                          classNamePrefix="select"
                          name="layover_flag"
                          placeholder="Lumper"
                          options={layoverData}
                          value={layoverData}
                          tenderForm={allData}
                          setTenderForm={setAllData}
                          SetFormState={SetFormState}
                          IsValidate={true}
                        />
                        <span className="text-red-500 text-sm">
                          {FormState?.layover_flag?.errors}
                        </span>
                      </div>
                      <div className="flex flex-col gap-2">
                        <label className="text-sm text-gray-600 dark:text-gray-400">
                          Detention
                        </label>
                        <CommonSelectInput
                          isClearable={true}
                          className="react-select"
                          classNamePrefix="select"
                          name="detention_flag"
                          placeholder="Select Is Detention"
                          options={detentionData}
                          value={detentionData}
                          tenderForm={allData}
                          setTenderForm={setAllData}
                          SetFormState={SetFormState}
                          IsValidate={true}
                        />
                        <span className="text-red-500 text-sm">
                          {FormState?.detention_flag?.errors}
                        </span>
                      </div>
                    </>
                  )}
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
