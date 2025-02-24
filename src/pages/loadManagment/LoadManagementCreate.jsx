import React, { useState } from "react";
import SimpleBar from "simplebar-react";
import Icon from "@/components/ui/Icon";
import CommonTextInput from "../components/InputField/CommonTextInput";

const LoadManagementCreate = ({ open, setOpen, isEditOpen, setIsEditOpen }) => {
  const handleCloseDrawer = () => {
    setOpen(false);
  };

  const [FormState, SetFormState] = useState({
    driver_name: { errors: "", valid: false },
    parent_folder_name: { errors: "", valid: false },
    annual_dot_inspection: { errors: "", valid: false },
    roc: { errors: "", valid: false },
    pod: { errors: "", valid: false },
    fuel_reciept: { errors: "", valid: false },
    truck_and_trailer_repair: { errors: "", valid: false },
    ifta_quaterly: { errors: "", valid: false },
    truck_trailer_serivices: { errors: "", valid: false },
    driver_equipment_information: { errors: "", valid: false },
  });
  const [allData, setAllData] = useState({
    load_numbers: "",
    Source: "",
    Destination: "",
    Shipping_Date: "",
    Delivery_Date: "",
    ETA: "",
    date: "",
    ifta_quaterly: "",
    truck_trailer_serivices: "",
    driver_equipment_information: "",
  });

  const handleSubmit = () => {};
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
                  // value={allData?.last_name}
                  // id="last_name"
                  // type="text"
                  // placeholder="Last Name"
                  // name="last_name"
                  // tenderForm={allData}
                  // setTenderForm={setAllData}
                  // SetFormState={SetFormState}
                  // IsValidate={true}
                  />
                  {/* <span className="text-red-500 text-sm">
                    {FormState?.last_name?.errors}
                  </span> */}
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm text-gray-600 dark:text-gray-400">
                    Source *
                  </label>
                  <CommonTextInput
                  // value={allData?.email_id}
                  // id="email_id"
                  // type="email"
                  // placeholder="Email Id"
                  // name="email_id"
                  // tenderForm={allData}
                  // setTenderForm={setAllData}
                  // SetFormState={SetFormState}
                  // IsValidate={true}
                  />
                  {/* <span className="text-red-500 text-sm">
                    {FormState?.email_id?.errors}
                  </span> */}
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm text-gray-600 dark:text-gray-400">
                    Destination *
                  </label>
                  <CommonTextInput
                  // value={allData?.contact_no}
                  // id="contact_no"
                  // type="number"
                  // placeholder="Contact No"
                  // name="contact_no"
                  // tenderForm={allData}
                  // setTenderForm={setAllData}
                  // SetFormState={SetFormState}
                  // IsValidate={true}
                  />
                  {/* <span className="text-red-500 text-sm">
                    {FormState?.contact_no?.errors}
                  </span> */}
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-sm text-gray-600 dark:text-gray-400">
                    Shipping Date *
                  </label>
                  <CommonTextInput
                  //   value={allData?.password}
                  //   id="password"
                  //   type="password"
                  //   placeholder="Password"
                  //   name="password"
                  //   tenderForm={allData}
                  //   setTenderForm={setAllData}
                  //   SetFormState={SetFormState}
                  //   IsValidate={true}
                  //   hasIcon={true}
                  />
                  {/* <span className="text-red-500 text-sm">
                      {FormState?.password?.errors}
                    </span> */}
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-sm text-gray-600 dark:text-gray-400">
                    Delivery Date
                  </label>
                  <CommonTextInput
                  // isClearable={true}
                  // className="react-select"
                  // classNamePrefix="select"
                  // name="state_id"
                  // placeholder="Select State"
                  // options={stateOption}
                  // value={stateOption}
                  // tenderForm={allData}
                  // setTenderForm={setAllData}
                  // SetFormState={SetFormState}
                  // // IsValidate={false}
                  // setCityModal={setCityModal}
                  />
                  {/* <span className="text-red-500 text-sm">
                    {FormState?.state_id?.errors}
                  </span> */}
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm text-gray-600 dark:text-gray-400">
                    ETA
                  </label>
                  <CommonTextInput
                  // isClearable={true}
                  // className="react-select"
                  // classNamePrefix="select"
                  // name="city_id"
                  // placeholder="Select City"
                  // options={cityOption}
                  // value={cityOption}
                  // tenderForm={allData}
                  // setTenderForm={setAllData}
                  // SetFormState={SetFormState}
                  // // IsValidate={false}
                  // disabled={!allData?.state_id}
                  />
                  {/* <span className="text-red-500 text-sm">
                    {FormState?.city_id?.errors}
                  </span> */}
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm text-gray-600 dark:text-gray-400">
                    date *
                  </label>
                  <CommonTextInput
                  // isClearable={true}
                  // className="react-select"
                  // classNamePrefix="select"
                  // name="designation_id"
                  // placeholder="Select Designation"
                  // options={designationData}
                  // value={designationData}
                  // tenderForm={allData}
                  // setTenderForm={setAllData}
                  // SetFormState={SetFormState}
                  // IsValidate={true}
                  />
                  {/* <span className="text-red-500 text-sm">
                    {FormState?.designation_id?.errors}
                  </span> */}
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm text-gray-600 dark:text-gray-400">
                    Driver*
                  </label>
                  <CommonTextInput
                  // isClearable={true}
                  // className="react-select"
                  // classNamePrefix="select"
                  // name="department_id"
                  // placeholder="Select Department"
                  // options={departmentData}
                  // value={departmentData}
                  // tenderForm={allData}
                  // setTenderForm={setAllData}
                  // SetFormState={SetFormState}
                  // IsValidate={true}
                  />
                  {/* <span className="text-red-500 text-sm">
                    {FormState?.department_id?.errors}
                  </span> */}
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm text-gray-600 dark:text-gray-400">
                    Base price *
                  </label>
                  <CommonTextInput
                    // isClearable={true}
                    // className="react-select"
                    // classNamePrefix="select"
                    // name="role_id"
                    // placeholder="Select Role"
                    // options={roleData}
                    // value={roleData}
                    // tenderForm={allData}
                    // setTenderForm={setAllData}
                    // SetFormState={SetFormState}
                    IsValidate={true}
                  />
                  {/* <span className="text-red-500 text-sm">
                    {FormState?.role_id?.errors}
                  </span> */}
                </div>
                {/* <div className="flex flex-col gap-2">
                  <label className="text-sm text-gray-600 dark:text-gray-400">
                    User Type*
                  </label>
                  <CommonSelectInput
                    isClearable={true}
                    className="react-select"
                    classNamePrefix="select"
                    name="user_type_id"
                    placeholder="Select User Type"
                    options={userTypeId}
                    value={userTypeId}
                    tenderForm={allData}
                    setTenderForm={setAllData}
                    SetFormState={SetFormState}
                    IsValidate={true}
                  />
                  <span className="text-red-500 text-sm">
                    {FormState?.user_type_id?.errors}
                  </span>
                </div> */}
                <div className="flex flex-col gap-2">
                  <label className="text-sm text-gray-600 dark:text-gray-400">
                    Final price*
                  </label>
                  <CommonTextInput
                  // value={allData?.login_user_id}
                  // id="login_user_id"
                  // type="text"
                  // placeholder="Login User Id"
                  // name="login_user_id"
                  // tenderForm={allData}
                  // setTenderForm={setAllData}
                  // SetFormState={SetFormState}
                  // IsValidate={true}
                  />
                  {/* <span className="text-red-500 text-sm">
                    {FormState?.login_user_id?.errors}
                  </span> */}
                </div>
                {/* <div className="flex flex-col gap-2">
                  <label className="text-sm text-gray-600 dark:text-gray-400">
                    Address *
                  </label>
                  <CommonTextArea
                    value={allData?.address}
                    id="address"
                    type="texy"
                    placeholder="Address"
                    name="address"
                    tenderForm={allData}
                    setTenderForm={setAllData}
                    SetFormState={SetFormState}
                    IsValidate={true}
                  />
                  <span className="text-red-500 text-sm">
                    {FormState?.address?.errors}
                  </span>
                </div> */}
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
