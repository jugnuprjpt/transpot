import React, { useState } from "react";
import CommonSelectInput from "../components/InputField/CommonSelectInput";
import useBriefSearch from "../../hooks/useBriefSearch";

const BriefCaseFilter = ({ filter, tenderForm, setTenderForm }) => {
  const { briefMonthData, briefYearData, briefDriverData, briefSubfolderData } =
    useBriefSearch();

  return (
    <div className="flex flex-wrap gap-2">
      <CommonSelectInput
        isClearable={true}
        className="react-select"
        classNamePrefix="select"
        name="document_month"
        placeholder="Select Month"
        options={briefYearData}
        value={briefYearData}
        tenderForm={tenderForm}
        setTenderForm={setTenderForm}
        // SetFormState={SetFormState}
        // IsValidate={false}
      />
      <span className="text-red-500 text-sm">
        {/* {FormState?.annual_dot_inspection?.errors} */}
      </span>

      <CommonSelectInput
        isClearable={true}
        className="react-select"
        classNamePrefix="select"
        name="document_year"
        placeholder="Select Year"
        options={briefMonthData}
        value={briefMonthData}
        tenderForm={tenderForm}
        setTenderForm={setTenderForm}
        // SetFormState={SetFormState}
        // IsValidate={false}
      />
      <span className="text-red-500 text-sm">
        {/* {FormState?.annual_dot_inspection?.errors} */}
      </span>
      <CommonSelectInput
        isClearable={true}
        className="react-select"
        classNamePrefix="select"
        name="driver_name"
        placeholder="Select Driver"
        options={briefDriverData}
        value={briefDriverData}
        tenderForm={tenderForm}
        setTenderForm={setTenderForm}
        // SetFormState={SetFormState}
        // IsValidate={false}
      />
      <span className="text-red-500 text-sm">
        {/* {FormState?.annual_dot_inspection?.errors} */}
      </span>
      <CommonSelectInput
        isClearable={true}
        className="react-select"
        classNamePrefix="select"
        name="sub_folder_name"
        placeholder="Select Subfolder"
        options={briefSubfolderData}
        value={briefSubfolderData}
        tenderForm={tenderForm}
        setTenderForm={setTenderForm}
        // SetFormState={SetFormState}
        // IsValidate={false}
      />
      <span className="text-red-500 text-sm">
        {/* {FormState?.annual_dot_inspection?.errors} */}
      </span>
    </div>
  );
};

export default BriefCaseFilter;
