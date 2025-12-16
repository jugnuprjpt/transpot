import React, { useEffect, useRef, useState } from "react";
import SimpleBar from "simplebar-react";
import Icon from "@/components/ui/Icon";

import { ValidaterHelper } from "../components/validationFunction/ValidationCheck";
import {
  ShowErrorToast,
  ShowSuccessToast,
} from "../components/ToastMessage/ToastMessage";
import CommonTextInput from "../components/InputField/CommonTextInput";
import CommonFileInput from "../components/InputField/CommonFileInput";
import { loadManagementService } from "../../_services/loadManagementService";
import Loading from "@/components/Loading";

function RequestToInvoice({
  requestToInvoiceData,
  openRequest,
  setOpenRequest,
  allData,
  setAllData,
  showData,
}) {
  const inputRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);

  const [FormState, SetFormState] = useState({
    lumper_value: { errors: "", valid: false },
    // detention_value: { errors: "", valid: false },
    // scale_value: { errors: "", valid: false },
    // extra_stop_charge: { errors: "", valid: false },
    // trailer_wash: { errors: "", valid: false },
    amount: { errors: "", valid: false },
    // layover: { errors: "", valid: false },
    roc: { errors: "", valid: false },
  });
  // const [allData, setAllData] = useState({
  //   driver_name: "",
  //   driver_id: "",
  //   load_id: 0,
  //   load_number: "",
  //   lumper_value: 0,
  //   lumper_paid_by: "",
  //   detention_value: 0,
  //   scale_value: 0,
  //   extra_stop_charge: 0,
  //   trailer_wash: 0,
  //   detention_at: "",
  //   company_id: "",
  //   amount: 0,
  //   layover: 0,
  //   roc: "",
  //   pod: "",
  //   lumper_reciept: "",
  //   scale_reciept: "",
  //   is_detention: "",
  //   is_layover: "",
  // });

  const handleCloseDrawer = () => {
    setOpenRequest(false);
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

    formdata.append("load_id", requestToInvoiceData?.load_id);
    formdata.append(
      "load_number",
      requestToInvoiceData?.loadNumber || requestToInvoiceData?.load_number
    );
    formdata.append("lumper_value", allData?.lumper_value);
    formdata.append("detention_value", allData?.detention_value);
    formdata.append("scale_value", allData?.scale_value);
    formdata.append(
      "extra_stop_charge",
      allData?.extraStopCharge || allData?.extra_stop_charge
    );
    formdata.append("trailer_wash", allData?.trailer_wash);
    formdata.append(
      "driver_name",
      requestToInvoiceData?.driverName || requestToInvoiceData?.driver_name
    );
    formdata.append("driver_id", requestToInvoiceData?.assigned_driver_id);
    formdata.append("company_id", requestToInvoiceData?.company_id);
    formdata.append("amount", allData?.amount);
    formdata.append("layover", allData?.layover);
    formdata.append("roc", allData?.roc);

    const res = await loadManagementService.requestToInvoice(formdata);

    if (res.Success == true) {
      setIsLoading(false);

      setOpenRequest(false);
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
          {openRequest === true && (
            <div
              className={`
setting-wrapper fixed overflow-y-scroll ltr:right-0 rtl:left-0 top-0 md:w-[850px] w-[200px]
bg-white dark:bg-slate-800 h-screen z-[99999]  md:pb-6 pb-[100px] shadow-base2
dark:shadow-base3 border border-slate-200 dark:border-slate-700 transition-all duration-150 
${
  openRequest
    ? "translate-x-0 opacity-100 visible"
    : "ltr:translate-x-full rtl:-translate-x-full opacity-0 invisible"
}

`}
            >
              <SimpleBar className="px-6 h-full">
                <header className="flex items-center justify-between border-b border-gray-200 dark:border-gray-700 -mx-6 px-6 py-2 mb-4">
                  <div>
                    <span className="text-[14px] xl:text-[16px] 2xl:text-[16px] font-bold text-gray-600 dark:text-gray-400 mb-[20px]">
                      Request To Invoice
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
                        {requestToInvoiceData?.loadNumber}
                        {requestToInvoiceData?.loadNumber ||
                          requestToInvoiceData?.load_number}
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
                        {requestToInvoiceData?.driverName ||
                          requestToInvoiceData?.driver_name}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="grid xl:grid-cols-2 gap-4 py-2 text-sm">
                  <div className="flex flex-col gap-2">
                    <label className="text-sm text-gray-600 dark:text-gray-400">
                      Detention
                    </label>

                    <span>{showData?.isDetention === true ? "Yes" : "No"}</span>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm text-gray-600 dark:text-gray-400">
                      Lumper
                    </label>

                    <span>{showData?.isLayover === true ? "Yes" : "No"}</span>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-sm text-gray-600 dark:text-gray-400">
                      Rate
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
                      detention_value
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
                      // IsValidate={true}
                    />
                    {/* <span className="text-red-500 text-sm">
                      {FormState?.detention_value?.errors}
                    </span> */}
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
                      // IsValidate={true}
                    />
                    {/* <span className="text-red-500 text-sm">
                      {FormState?.extra_stop_charge?.errors}
                    </span> */}
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
                      // IsValidate={true}
                    />
                    {/* <span className="text-red-500 text-sm">
                      {FormState?.layover?.errors}
                    </span> */}
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

export default RequestToInvoice;
