import React, { useState } from "react";
import Textinput from "@/components/ui/Textinput";
const BriefCaseFilter = ({ filter, setFilter }) => {
  const [value, setValue] = useState(filter);
  const onChange = (e) => {
    setValue(e.target.value);
    setFilter(e.target.value || undefined);
  };
  return (
    <div className="flex flex-wrap gap-2">
    <Textinput value={value || ""} onChange={onChange} placeholder="Search..." className="" />
    <Textinput value={value || ""} onChange={onChange} placeholder="Select Year" className="" />
    <Textinput value={value || ""} onChange={onChange} placeholder="Select Month" className="" />
    <Textinput value={value || ""} onChange={onChange} placeholder="Select Driver" className="" />
    <Textinput value={value || ""} onChange={onChange} placeholder="Select Subfolder" className="" />
  </div>
  
  );
};

export default BriefCaseFilter;
