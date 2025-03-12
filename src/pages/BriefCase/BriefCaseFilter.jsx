import React, { useState } from "react";
import Textinput from "@/components/ui/Textinput";
import CommonSelectInput from "../components/InputField/CommonSelectInput";
const BriefCaseFilter = ({ filter, setFilter }) => {
  const [value, setValue] = useState(filter);
  const onChange = (e) => {
    setValue(e.target.value);
    setFilter(e.target.value || undefined);
  };
  return (
    <div className="flex flex-wrap gap-2">
      <CommonSelectInput
        isClearable={true}
        className="react-select"
        classNamePrefix="select"
        name="annual_dot_inspection"
        placeholder="Select Search"
        // options={annualInspection}
        // value={annualInspection}
        // tenderForm={allData}
        // setTenderForm={setAllData}
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
        name="annual_dot_inspection"
        placeholder="Select Year"
        // options={annualInspection}
        // value={annualInspection}
        // tenderForm={allData}
        // setTenderForm={setAllData}
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
        name="annual_dot_inspection"
        placeholder="Select Month"
        // options={annualInspection}
        // value={annualInspection}
        // tenderForm={allData}
        // setTenderForm={setAllData}
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
        name="annual_dot_inspection"
        placeholder="Select Driver"
        // options={annualInspection}
        // value={annualInspection}
        // tenderForm={allData}
        // setTenderForm={setAllData}
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
        name="annual_dot_inspection"
        placeholder="Select Subfolder"
        // options={annualInspection}
        // value={annualInspection}
        // tenderForm={allData}
        // setTenderForm={setAllData}
        // SetFormState={SetFormState}
        // IsValidate={false}
      />
      <span className="text-red-500 text-sm">
        {/* {FormState?.annual_dot_inspection?.errors} */}
      </span>
      {/* <Textinput
        value={value || ""}
        onChange={onChange}
        placeholder="Search..."
        className=""
      />
      <Textinput
        value={value || ""}
        onChange={onChange}
        placeholder="Select Year"
        className=""
      />
      <Textinput
        value={value || ""}
        onChange={onChange}
        placeholder="Select Month"
        className=""
      />
      <Textinput
        value={value || ""}
        onChange={onChange}
        placeholder="Select Driver"
        className=""
      />
      <Textinput
        value={value || ""}
        onChange={onChange}
        placeholder="Select Subfolder"
        className=""
      /> */}
    </div>
  );
};

export default BriefCaseFilter;
