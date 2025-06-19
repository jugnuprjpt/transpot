import React, { useEffect, useRef, useState } from "react";
import SimpleBar from "simplebar-react";
import Icon from "@/components/ui/Icon";

import CommonDatePickerwithoutTime from "../components/InputField/CommonDatePickerwithoutTime";
import { ValidaterHelper } from "../components/validationFunction/ValidationCheck";
import { ShowSuccessToast } from "../components/ToastMessage/ToastMessage";
import CommonTextInput from "../components/InputField/CommonTextInput";
import { loadManagementService } from "../../_services/loadManagementService";
import {
  convertDate,
  convertDate2,
} from "../../components/DateConvertor/DateConvertToFormate";

function RequestToComplate({
  requestToInvoiceData,
  openRequest,
  setOpenRequest,
  // allData,
  // setAllData,
}) {
  const [FormState, SetFormState] = useState({
    payment_recieved_date: { errors: "", valid: false },
    check_number: { errors: "", valid: false },
  });
  const [allData, setAllData] = useState({
    load_number: "",
    payment_recieved_date: "",
    check_number: 0,
  });

  console.log(requestToInvoiceData, "......");

  const handleCloseDrawer = () => {
    setOpenRequest(false);
    setAllData({ load_number: "", payment_recieved_date: "", check_number: 0 });
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
    // setIsLoading(true);
    // if (isEditOpen == false) {
    // const formdata = new FormData();

    // formdata.append("load_id", requestToInvoiceData?.load_id);
    // formdata.append("payment_recieved_date", allData?.payment_recieved_date);
    // formdata.append("check_number", allData?.check_number);

    const formdata = {
      load_number: requestToInvoiceData?.loadNumber,
      payment_recieved_date: convertDate2(allData?.payment_recieved_date),
      check_number: allData?.check_number,
    };

    const res = await loadManagementService.requestToComplete(formdata);

    if (res.Success == true) {
      // setIsLoading(false);

      setOpenRequest(false);
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
          {openRequest === true && (
            <div
              className={`
setting-wrapper fixed overflow-y-scroll ltr:right-0 rtl:left-0 top-0 md:w-[400px] w-[200px]
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
                      Request To Complete
                    </span>
                  </div>
                  <div className="cursor-pointer text-2xl text-gray-800 dark:text-gray-200">
                    <button onClick={handleCloseDrawer}>
                      <Icon icon="heroicons-outline:x" />
                    </button>
                  </div>
                </header>

                <div className="grid xl:grid-cols-1 gap-4 py-2 text-sm">
                  <div className="flex flex-col gap-2">
                    <label className="text-sm text-gray-600 dark:text-gray-400">
                      Payment Recieved Date
                    </label>

                    {/* <SelectAllDateswithTime
                      data={allData}
                      setData={setAllData}
                      name="payment_recieved_date"
                      value={allData?.payment_recieved_date}
                      className="form-control py-[7px] !bg-transparent"
                      placeholder="Pick Up Date"
                      SetFormState={SetFormState}
                      IsValidate={true}
                    /> */}
                    <CommonDatePickerwithoutTime
                      data={allData}
                      setData={setAllData}
                      name="payment_recieved_date"
                      value={allData?.payment_recieved_date}
                      className="form-control py-[7px] !bg-transparent"
                      placeholder="Pick Up Date"
                      SetFormState={SetFormState}
                      IsValidate={true}
                      page={"newtender"}
                    />
                    <span className="text-red-500 text-sm">
                      {FormState?.payment_recieved_date?.errors}
                    </span>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm text-gray-600 dark:text-gray-400">
                      Check Number
                    </label>
                    <CommonTextInput
                      value={allData?.check_number}
                      id="check_number"
                      type="text"
                      placeholder="Check Number"
                      name="check_number"
                      tenderForm={allData}
                      setTenderForm={setAllData}
                      SetFormState={SetFormState}
                      IsValidate={true}
                    />
                    <span className="text-red-500 text-sm">
                      {FormState?.check_number?.errors}
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

export default RequestToComplate;
