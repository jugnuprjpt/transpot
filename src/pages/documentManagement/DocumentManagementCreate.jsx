import React, { useRef, useState } from "react";
import SimpleBar from "simplebar-react";
import Icon from "@/components/ui/Icon";
import CommonFileInput from "../components/InputField/CommonFileInput";
import CommonSelectInput from "../components/InputField/CommonSelectInput";
import { ValidaterHelper } from "../components/validationFunction/ValidationCheck";
import useGetDriverListing from "../../hooks/useDriverListing";
import axios from "axios";
import {
  ShowErrorToast,
  ShowSuccessToast,
} from "../components/ToastMessage/ToastMessage";
import { http } from "../../_apiConfig/http";

const DocumentManagementCreate = ({
  open,
  setOpen,
  isEditOpen,
  isEditDone,
  setIsEditDone,
  // handleCloseDrawer,
  setIsEditOpen,
}) => {
  const inputRef = useRef(null);
  const { driverData } = useGetDriverListing();
  const token = localStorage.getItem("token");
  const [FormState, SetFormState] = useState({
    // driver_name: { errors: "", valid: false },
    driver_id: { errors: "", valid: false },
    annual_dot_inspection: { errors: "", valid: false },
    roc: { errors: "", valid: false },
    pod: { errors: "", valid: false },
    fuel_reciept: { errors: "", valid: false },
    truck_and_trailer_repair: { errors: "", valid: false },
    ifta_quaterly: { errors: "", valid: false },
    truck_trailer_serivices: { errors: "", valid: false },
    driver_equipment_information: { errors: "", valid: false },
  });
  // driver_id
  const [allData, setAllData] = useState({
    driver_name: "",
    driver_id: 0,
    annual_dot_inspection: "",
    roc: "",
    pod: "",
    fuel_reciept: "",
    truck_and_trailer_repair: "",
    ifta_quaterly: "",
    truck_trailer_serivices: "",
    driver_equipment_information: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleCloseDrawer = () => {
    setOpen(false);
    // SetFormState({
    //   designation_name: { errors: "", valid: false },
    // });
    setAllData({
      driver_name: "",
      driver_id: 0,
      annual_dot_inspection: "",
      roc: "",
      pod: "",
      fuel_reciept: "",
      truck_and_trailer_repair: "",
      ifta_quaterly: "",
      truck_trailer_serivices: "",
      driver_equipment_information: "",
    });
    // setIsEditOpen(false);
    // setEditId("");
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
    if (isEditOpen == false) {
      const formdata = new FormData();

      formdata.append("driver_name", allData.driver_name);
      formdata.append("driver_id", allData.driver_id);
      formdata.append("annual_dot_inspection", allData.annual_dot_inspection);
      formdata.append("roc", allData.roc);
      formdata.append("pod", allData.pod);
      formdata.append("fuel_reciept", allData.fuel_reciept);
      formdata.append(
        "truck_and_trailer_repair",
        allData.truck_and_trailer_repair
      );
      formdata.append("ifta_quaterly", allData.ifta_quaterly);
      formdata.append(
        "truck_trailer_serivices",
        allData.truck_trailer_serivices
      );
      formdata.append(
        "driver_equipment_information",
        allData.driver_equipment_information
      );

      const res = await http.post(
        "/api/driver_document_management/insert",
        formdata,
        true,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.Success == true) {
        setIsLoading(false);
        ShowSuccessToast(res?.Message);
        setIsEditDone(isEditDone == true ? false : true);
        handleCloseDrawer();
      } else {
        setIsLoading(false);
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
            <SimpleBar className="px-6 h-[calc(100%-80px)]">
              <header className="flex items-center justify-between border-b border-gray-200 dark:border-gray-700 -mx-6 px-6 py-2 mb-4">
                <div>
                  <span className="text-[14px] xl:text-[16px] 2xl:text-[16px] font-bold text-gray-600 dark:text-gray-400 mb-[20px]">
                    Add Document
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
                    Fuel Reciept
                  </label>
                  <CommonFileInput
                    className="react-select text-[#000]"
                    classNamePrefix="select"
                    type="file"
                    name="fuel_reciept"
                    placeholder="Fuel Reciept"
                    tenderForm={allData}
                    setTenderForm={setAllData}
                    inputRef={inputRef}
                  />
                  <span className="text-red-500 text-sm">
                    {FormState?.fuel_reciept?.errors}
                  </span>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-sm text-gray-600 dark:text-gray-400">
                    Annual Dot inspection
                  </label>
                  <CommonFileInput
                    className="react-select text-[#000]"
                    classNamePrefix="select"
                    type="file"
                    name="annual_dot_inspection"
                    placeholder="Annual Dot inspection"
                    tenderForm={allData}
                    setTenderForm={setAllData}
                    inputRef={inputRef}
                  />
                  <span className="text-red-500 text-sm">
                    {FormState?.annual_dot_inspection?.errors}
                  </span>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-sm text-gray-600 dark:text-gray-400">
                    Truck and Trailer Repair
                  </label>
                  <CommonFileInput
                    className="react-select text-[#000]"
                    classNamePrefix="select"
                    type="file"
                    name="truck_and_trailer_repair"
                    placeholder="Truck and Trailer Repair"
                    tenderForm={allData}
                    setTenderForm={setAllData}
                    inputRef={inputRef}
                  />
                  <span className="text-red-500 text-sm">
                    {FormState?.truck_and_trailer_repair?.errors}
                  </span>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm text-gray-600 dark:text-gray-400">
                    Ifta Quaterly
                  </label>
                  <CommonFileInput
                    className="react-select text-[#000]"
                    classNamePrefix="select"
                    type="file"
                    name="ifta_quaterly"
                    placeholder="Ifta Quaterly"
                    tenderForm={allData}
                    setTenderForm={setAllData}
                    inputRef={inputRef}
                  />
                  <span className="text-red-500 text-sm">
                    {FormState?.ifta_quaterly?.errors}
                  </span>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm text-gray-600 dark:text-gray-400">
                    Truck Trailer Serivices
                  </label>
                  <CommonFileInput
                    className="react-select text-[#000]"
                    classNamePrefix="select"
                    type="file"
                    name="truck_trailer_serivices"
                    placeholder="Truck Trailer Serivices"
                    tenderForm={allData}
                    setTenderForm={setAllData}
                    inputRef={inputRef}
                  />
                  <span className="text-red-500 text-sm">
                    {FormState?.truck_trailer_serivices?.errors}
                  </span>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-sm text-gray-600 dark:text-gray-400">
                    Driver Equipment Information
                  </label>
                  <CommonFileInput
                    className="react-select text-[#000]"
                    classNamePrefix="select"
                    type="file"
                    name="driver_equipment_information"
                    placeholder="Driver Equipment Information"
                    tenderForm={allData}
                    setTenderForm={setAllData}
                    inputRef={inputRef}
                  />
                  <span className="text-red-500 text-sm">
                    {FormState?.driver_equipment_information?.errors}
                  </span>
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  className="mt-2  text-white px-4 py-2 rounded hover:bg-success-500  bg-success-500"
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

export default DocumentManagementCreate;
