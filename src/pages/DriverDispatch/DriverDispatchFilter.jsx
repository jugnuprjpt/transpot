import React, { useState } from "react";
import CommonSelectInput from "../components/InputField/CommonSelectInput";
import useBriefSearch from "../../hooks/useBriefSearch";
import CommonDateYearMonth from "../components/InputField/CommonDateYearMonth";

const DriverDispatchFilter = ({ tenderForm, setTenderForm }) => {
  const { briefDriverData } = useBriefSearch();

  return (
    <div className="grid xl:grid-cols-2 gap-4 py-2 text-sm">
      <div className="flex-wrap gap-2">
        <CommonDateYearMonth
          data={tenderForm}
          setData={setTenderForm}
          name="year_month "
          value={tenderForm?.year_month}
          className="form-control py-[7px] !bg-transparent"
          placeholder="Dispatch Month and Year"
          SetFormState={setTenderForm}
          IsValidate={true}
          page={"newtender"}
        />
      </div>
      <div className="flex-wrap gap-2">
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
      </div>
    </div>
  );
};

export default DriverDispatchFilter;
