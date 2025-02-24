import React, { useState } from "react";
import Card from "@/components/ui/Card";
import Textinput from "@/components/ui/Textinput";
import Textarea from "@/components/ui/Textarea";
import Select from "@/components/ui/Select";

const LoadAddModifyForm = () => {
  const errorMessage = {
    message: "This is invalid state",
  };
  const [value, setValue] = useState("");

  const handleFormatter = (e) => {
    const value = e.target.value;
    setValue(value);
  };

  return (
<div 
// className="grid xl:grid-cols-2 gap-5"
>
  <Card title="Load Add/Modify">
    <form>
      <div className="grid grid-cols-3 gap-4">
        {/* Row 1 */}
        <Textinput className="col-span-1 w-full" label="Load numbers *" id="pn-1" type="text" placeholder="Enter load numbers" />
        <Textinput className="col-span-1 w-full" label="Source *" id="pn-2" type="text" placeholder="Enter source" />
        <Textinput className="col-span-1 w-full" label="Destination*" id="pn-3" type="text" placeholder="Enter destination" />

        {/* Row 2 */}
        <Textinput className="col-span-1 w-full" label="Shipping Date*" id="pn-4" type="date" />
        <Textinput className="col-span-1 w-full" label="Delivery Date*" id="pn-5" type="date" />
        <Textinput className="col-span-1 w-full" label="ETA*" id="pn-6" type="time" />

        {/* Row 3 */}
        <Textinput className="col-span-1 w-full" label="Date*" id="pn-7" type="date" />
        <Textinput className="col-span-1 w-full" label="Driver*" id="pn-8" type="text" placeholder="Enter driver name" />
        <Textinput className="col-span-1 w-full" label="Basic Price*" id="pn-9" type="number" placeholder="Enter basic price" />

        {/* Row 4 */}
        <Textinput className="col-span-1 w-full" label="Final Price*" id="pn-10" type="number" placeholder="Enter final price" />
        <Textinput className="col-span-1 w-full" label="Project Name*" id="pn-11" type="text" placeholder="Enter project name" />
        <Textinput className="col-span-1 w-full" label="Remarks*" id="pn-12" type="text" placeholder="Enter remarks" />
      </div>

      {/* Buttons */}
      <div className="flex justify-end mt-4 gap-3">
        <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded">
          Submit
        </button>
        <button type="button" className="bg-gray-500 text-white px-6 py-2 rounded">
          Clear
        </button>
      </div>
    </form>
  </Card>
</div>


  
  
  
  );
};

export default LoadAddModifyForm;
