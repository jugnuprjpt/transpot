import React, { useRef, useState } from "react";
import SimpleBar from "simplebar-react";
import Icon from "@/components/ui/Icon";
import CommonTextInput from "../components/InputField/CommonTextInput";
import CommonFileInput from "../components/InputField/CommonFileInput";
import CommonSelectInput from "../components/InputField/CommonSelectInput";
import useGetDriverListing from "../../hooks/useDriverListing";
import useCompany from "../../hooks/useCompany";
import { ValidaterHelper } from "../components/validationFunction/ValidationCheck";
import {
  ShowErrorToast,
  ShowSuccessToast,
} from "../components/ToastMessage/ToastMessage";
import { loadManagementService } from "../../_services/loadManagementService";

const LoadManagementCreate = ({ open, setOpen, isEditOpen, setIsEditOpen }) => {
  const inputRef = useRef(null);
  const { driverData } = useGetDriverListing();
  const { companyData } = useCompany();
  const handleCloseDrawer = () => {
    setOpen(false);
  };

  const [FormState, SetFormState] = useState({
    delievery_date_string: { errors: "", valid: false },
    final_price: { errors: "", valid: false },
    driver_name: { errors: "", valid: false },
    roc: { errors: "", valid: false },
    trailer_used: { errors: "", valid: false },
    // assign_to: { errors: "", valid: false },
    company_name: { errors: "", valid: false },
    destination: { errors: "", valid: false },
    loadNumber: { errors: "", valid: false },
    source: { errors: "", valid: false },
    base_price: { errors: "", valid: false },
    pick_up_date_string: { errors: "", valid: false },
  });
  const [allData, setAllData] = useState({
    delievery_date_string: "",
    final_price: 0,
    driver_name: "",
    roc: "",
    trailer_used: 0,
    assign_to: 0,
    company_name: "",
    destination: "",
    loadNumber: 0,
    driver_id: 0,
    source: "",
    base_price: 0,
    pick_up_date_string: "",
    company_id: 0,
  });

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
    if (isEditOpen == false) {
      const formdata = new FormData();

      formdata.append("driver_name", allData.driver_name);
      formdata.append("loadNumber", allData.loadNumber);
      formdata.append("driver_id", allData.driver_id);
      formdata.append("delievery_date_string", allData.delievery_date_string);
      formdata.append("pick_up_date_string", allData.pick_up_date_string);
      formdata.append("roc", allData.roc);
      formdata.append("final_price", allData.final_price);
      formdata.append("trailer_used", allData.trailer_used);
      formdata.append("company_name", allData.company_name);
      formdata.append("company_id", allData.company_id);
      formdata.append("destination", allData.destination);
      formdata.append("source", allData.source);
      formdata.append("base_price", allData.base_price);
      formdata.append("assign_to", 0);

      const res = await loadManagementService.loadInsert(formdata);

      if (res.Success == true) {
        // setIsLoading(false);
        ShowSuccessToast(res?.Message);
        setIsEditDone(isEditDone == true ? false : true);
        handleCloseDrawer();
      } else {
        // setIsLoading(false);
        ShowErrorToast("Something Went Wrong");
      }
    }
    // else {
    //   checklistService.checklistInsert(data).then((res) => {
    //     if (res.Success == true) {
    //       setIsLoading(false);
    //       ShowSuccessToast(res?.Message);
    //       setIsCreateDone(isCreateDone == true ? false : true);
    //       handleCloseDrawer();
    //     } else {
    //       setIsLoading(false);
    //       ShowErrorToast(res.Message);
    //     }
    //   });
    // }
  };
  return (
    <div>
      {" "}
      <div>
        {open === true && (
          <div
            className={`
setting-wrapper fixed overflow-y-scroll ltr:right-0 rtl:left-0 top-0 md:w-[700px] w-[300px]
bg-white dark:bg-slate-800 h-screen z-[99999]  md:pb-6 pb-[100px] shadow-base2
dark:shadow-base3 border border-slate-200 dark:border-slate-700 transition-all duration-150 
${
  open
    ? "translate-x-0 opacity-100 visible"
    : "ltr:translate-x-full rtl:-translate-x-full opacity-0 invisible"
}

`}
          >
            <SimpleBar className="px-6">
              <header className="flex items-center justify-between border-b border-gray-200 dark:border-gray-700 -mx-6 px-6 py-2 mb-4">
                <div>
                  <span className="text-[14px] xl:text-[16px] 2xl:text-[16px] font-bold text-gray-600 dark:text-gray-400 mb-[20px]">
                    Add Load
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
                    Load numbers *
                  </label>
                  <CommonTextInput
                    value={allData?.loadNumber}
                    id="loadNumber"
                    type="text"
                    placeholder="Load Number"
                    name="loadNumber"
                    tenderForm={allData}
                    setTenderForm={setAllData}
                    SetFormState={SetFormState}
                    IsValidate={true}
                  />
                  <span className="text-red-500 text-sm">
                    {FormState?.loadNumber?.errors}
                  </span>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm text-gray-600 dark:text-gray-400">
                    Source *
                  </label>
                  <CommonTextInput
                    value={allData?.source}
                    id="source"
                    type="text"
                    placeholder="Source"
                    name="source"
                    tenderForm={allData}
                    setTenderForm={setAllData}
                    SetFormState={SetFormState}
                    IsValidate={true}
                  />
                  <span className="text-red-500 text-sm">
                    {FormState?.source?.errors}
                  </span>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm text-gray-600 dark:text-gray-400">
                    Destination *
                  </label>
                  <CommonTextInput
                    value={allData?.destination}
                    id="destination"
                    type="text"
                    placeholder="Destination"
                    name="destination"
                    tenderForm={allData}
                    setTenderForm={setAllData}
                    SetFormState={SetFormState}
                    IsValidate={true}
                  />
                  <span className="text-red-500 text-sm">
                    {FormState?.destination?.errors}
                  </span>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-sm text-gray-600 dark:text-gray-400">
                    Pick Up Date *
                  </label>
                  <CommonTextInput
                    value={allData?.pick_up_date_string}
                    id="pick_up_date_string"
                    type="date"
                    placeholder="Pick Up Date"
                    name="pick_up_date_string"
                    tenderForm={allData}
                    setTenderForm={setAllData}
                    SetFormState={SetFormState}
                    IsValidate={true}
                    hasIcon={true}
                  />
                  <span className="text-red-500 text-sm">
                    {FormState?.pick_up_date_string?.errors}
                  </span>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-sm text-gray-600 dark:text-gray-400">
                    Delievery Date *
                  </label>
                  <CommonTextInput
                    value={allData?.delievery_date_string}
                    id="delievery_date_string"
                    type="date"
                    placeholder="Delievery Date"
                    name="delievery_date_string"
                    tenderForm={allData}
                    setTenderForm={setAllData}
                    SetFormState={SetFormState}
                    IsValidate={true}
                    hasIcon={true}
                  />
                  <span className="text-red-500 text-sm">
                    {FormState?.delievery_date_string?.errors}
                  </span>
                </div>

                {/* <div className="flex flex-col gap-2">
                  <label className="text-sm text-gray-600 dark:text-gray-400">
                    Earliest Time Arrival
                  </label>
                  <CommonTextInput
                    value={allData?.earliest_time_arrival}
                    id="earliest_time_arrival"
                    type="text"
                    placeholder="Earliest Time Arrival"
                    name="earliest_time_arrival"
                    tenderForm={allData}
                    setTenderForm={setAllData}
                    SetFormState={SetFormState}
                    IsValidate={true}
                  />
                  <span className="text-red-500 text-sm">
                    {FormState?.earliest_time_arrival?.errors}
                  </span>
                </div> */}
                <div className="flex flex-col gap-2">
                  <label className="text-sm text-gray-600 dark:text-gray-400">
                    Trailer Used *
                  </label>
                  <CommonTextInput
                    value={allData?.trailer_used}
                    id="trailer_used"
                    type="text"
                    placeholder="Trailer Used"
                    name="trailer_used"
                    tenderForm={allData}
                    setTenderForm={setAllData}
                    SetFormState={SetFormState}
                    IsValidate={true}
                  />
                  <span className="text-red-500 text-sm">
                    {FormState?.trailer_used?.errors}
                  </span>
                </div>
                {/* <div className="flex flex-col gap-2">
                  <label className="text-sm text-gray-600 dark:text-gray-400">
                    Assign To *
                  </label>
                  <CommonTextInput
                    value={allData?.assign_to}
                    id="assign_to"
                    type="text"
                    placeholder="Assign To"
                    name="assign_to"
                    tenderForm={allData}
                    setTenderForm={setAllData}
                    SetFormState={SetFormState}
                    IsValidate={true}
                  />
                  <span className="text-red-500 text-sm">
                    {FormState?.assign_to?.errors}
                  </span>
                </div> */}
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
                    Base price *
                  </label>
                  <CommonTextInput
                    value={allData?.base_price}
                    id="base_price"
                    type="text"
                    placeholder=" Base price"
                    name="base_price"
                    tenderForm={allData}
                    setTenderForm={setAllData}
                    SetFormState={SetFormState}
                    IsValidate={true}
                  />
                  <span className="text-red-500 text-sm">
                    {FormState?.base_price?.errors}
                  </span>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm text-gray-600 dark:text-gray-400">
                    Company Name*
                  </label>
                  <CommonSelectInput
                    isClearable={true}
                    className="react-select"
                    classNamePrefix="select"
                    name="company_id"
                    placeholder="Select Company Name"
                    options={companyData}
                    value={companyData}
                    tenderForm={allData}
                    setTenderForm={setAllData}
                    SetFormState={SetFormState}
                    IsValidate={false}
                  />
                  <span className="text-red-500 text-sm">
                    {FormState?.company_id?.errors}
                  </span>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm text-gray-600 dark:text-gray-400">
                    Final price*
                  </label>
                  <CommonTextInput
                    value={allData?.final_price}
                    id="final_price"
                    type="text"
                    placeholder="Final price"
                    name="final_price"
                    tenderForm={allData}
                    setTenderForm={setAllData}
                    SetFormState={SetFormState}
                    IsValidate={true}
                  />
                  <span className="text-red-500 text-sm">
                    {FormState?.final_price?.errors}
                  </span>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm text-gray-600 dark:text-gray-400">
                    Roc*
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
                  {/* <span className="text-red-500 text-sm"> */}
                  {/* {FormState?.driver_equipment_information?.errors} */}
                  {/* </span> */}
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  className="mt-2  text-white px-4 py-2 rounded hover:bg-success-500 text-success-500 bg-success-500"
                  onClick={handleSubmit}
                >
                  <div className="flex items-center">
                    <div className=" border-t-2 border-white-500 mr-2"></div>
                    {/* {isEditOpen == true ? "Update" : "Submit"} */}
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
  );
};

export default LoadManagementCreate;
