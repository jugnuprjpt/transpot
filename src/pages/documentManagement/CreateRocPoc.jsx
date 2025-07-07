import React, { useRef, useState } from "react";
import SimpleBar from "simplebar-react";
import Icon from "@/components/ui/Icon";
import CommonFileInput from "../components/InputField/CommonFileInput";
import CommonSelectInput from "../components/InputField/CommonSelectInput";
import { ValidaterHelper } from "../components/validationFunction/ValidationCheck";
import useGetDriverListing from "../../hooks/useDriverListing";

import CommonTextInput from "../components/InputField/CommonTextInput";
import { docManagementService } from "../../_services/docManagementService";
import {
  ShowErrorToast,
  ShowSuccessToast,
} from "../components/ToastMessage/ToastMessage";
import Loading from "@/components/Loading";

const CreateRocPoc = ({
  openRocPoc,
  setOpenRocPoc,
  isEditOpen,
  isEditDone,
  setIsEditDone,
}) => {
  const inputRef = useRef(null);
  const { driverData } = useGetDriverListing();
  const [FormState, SetFormState] = useState({
    driver_id: { errors: "", valid: false },
    month: { errors: "", valid: false },
    // files: { errors: "", valid: false },
    // pod: { errors: "", valid: false },
    load_number: { errors: "", valid: false },
  });
  // driver_id
  const [allData, setAllData] = useState({
    driver_name: "",
    driver_id: 0,
    files: "",
    pod: "",
    month: "",
    load_number: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const MonthData = [
    { value: "01", label: "January" },
    { value: "02", label: "February" },
    { value: "03", label: "March" },
    { value: "04", label: "April" },
    { value: "05", label: "May" },
    { value: "06", label: "June" },
    { value: "07", label: "July" },
    { value: "08", label: "August" },
    { value: "09", label: "September" },
    { value: "10", label: "October" },
    { value: "11", label: "November" },
    { value: "12", label: "December" },
  ];

  const handleCloseDrawer = () => {
    setOpenRocPoc(false);
    setAllData({
      driver_name: "",
      driver_id: 0,
      files: "",
      pod: "",
      month: "",
      load_number: "",
    });
    // setIsEditOpen(false);
    // setEditId("");
  };

  const isFileUploaded = allData.pod || allData.files;

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
    if (isEditOpen == false) {
      const formdata = new FormData();

      formdata.append("driver_name", allData.driver_name);
      formdata.append("load_number", allData.load_number);
      formdata.append("driver_id", allData.driver_id);
      formdata.append("month", allData.month);
      formdata.append("files", allData.files);
      formdata.append("pod", allData.pod);

      const res = await docManagementService.documentInsertMonthbulkWise(
        formdata
      );

      if (res.Success == true) {
        setIsLoading(false);

        // setIsEditDone(isEditDone == true ? false : true);
        handleCloseDrawer();
        ShowSuccessToast(res?.Message);
      } else {
        setIsLoading(false);
        ShowErrorToast(res?.Message);
      }
    }
  };
  return (
    <>
      {isLoading && (
        <div className="fixed inset-0 z-[999999] bg-black/40 backdrop-blur-sm flex items-center justify-center">
          <Loading />
        </div>
      )}{" "}
      <div>
        {" "}
        <div>
          {openRocPoc === true && (
            <div
              className={`
setting-wrapper fixed overflow-y-scroll ltr:right-0 rtl:left-0 top-0 md:w-[700px] w-[300px]
bg-white dark:bg-slate-800 h-screen z-[99999]  md:pb-6 pb-[100px] shadow-base2
dark:shadow-base3 border border-slate-200 dark:border-slate-700 transition-all duration-150 
${
  openRocPoc
    ? "translate-x-0 opacity-100 visible"
    : "ltr:translate-x-full rtl:-translate-x-full opacity-0 invisible"
}

`}
            >
              <SimpleBar className="px-6 h-[calc(100%-80px)]">
                <header className="flex items-center justify-between border-b border-gray-200 dark:border-gray-700 -mx-6 px-6 py-2 mb-4">
                  <div>
                    <span className="text-[14px] xl:text-[16px] 2xl:text-[16px] font-bold text-gray-600 dark:text-gray-400 mb-[20px]">
                      Add Roc And Pod
                    </span>
                  </div>
                  <div className="cursor-pointer text-2xl text-gray-800 dark:text-gray-200">
                    <button onClick={handleCloseDrawer}>
                      <Icon icon="heroicons-outline:x" />
                    </button>
                  </div>
                </header>
                <div className="grid xl:grid-cols-2 gap-2 py-2 text-sm">
                  <div className="flex flex-col gap-2">
                    <label className="text-sm text-gray-600 dark:text-gray-400">
                      Load Number
                    </label>
                    <CommonTextInput
                      value={allData?.load_number}
                      id="load_number"
                      type="text"
                      placeholder="Load Number"
                      name="load_number"
                      tenderForm={allData}
                      setTenderForm={setAllData}
                      SetFormState={SetFormState}
                      IsValidate={true}
                    />
                    <span className="text-red-500 text-sm">
                      {FormState?.load_number?.errors}
                    </span>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm text-gray-600 dark:text-gray-400">
                      Driver Name
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
                      IsValidate={false}
                    />
                    <span className="text-red-500 text-sm">
                      {FormState?.driver_id?.errors}
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
                      placeholder="pod"
                      tenderForm={allData}
                      setTenderForm={setAllData}
                      inputRef={inputRef}
                    />
                    {/* <span className="text-red-500 text-sm">
                    {FormState?.pod?.errors}
                  </span> */}
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-sm text-gray-600 dark:text-gray-400">
                      File
                    </label>
                    <CommonFileInput
                      className="react-select text-[#000]"
                      classNamePrefix="select"
                      type="file"
                      name="files"
                      placeholder="files"
                      tenderForm={allData}
                      setTenderForm={setAllData}
                      inputRef={inputRef}
                    />
                    {/* <span className="text-red-500 text-sm">
                    {FormState?.files?.errors}
                  </span> */}
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm text-gray-600 dark:text-gray-400">
                      Select Month
                    </label>
                    <CommonSelectInput
                      isClearable={true}
                      className="react-select"
                      classNamePrefix="select"
                      name="month"
                      placeholder="Select Month"
                      options={MonthData}
                      value={MonthData}
                      tenderForm={allData}
                      setTenderForm={setAllData}
                      // SetFormState={SetFormState}
                      // IsValidate={false}
                    />
                    <span className="text-red-500 text-sm">
                      {FormState?.month?.errors}
                    </span>
                  </div>
                </div>

                <div className="flex gap-4">
                  <button
                    className={`mt-2 text-white px-4 py-2 rounded ${
                      isFileUploaded
                        ? "bg-success-500 hover:bg-success-600"
                        : "bg-gray-400 cursor-not-allowed opacity-70"
                    }`}
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
      </div>
    </>
  );
};

export default CreateRocPoc;
