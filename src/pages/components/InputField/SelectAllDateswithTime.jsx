import React, { useEffect, useState } from "react";
import Flatpickr from "react-flatpickr";

const SelectAllDateswithTime = ({
  data,
  setData,
  FormState,
  SetFormState,
  disable,
  IsValidate,
  value,
  name,
  placeholder,
  className,
  page,
}) => {
  const [checkDate, setCheckDate] = useState("");
  const handleChangeDate = (selectedDates, name) => {
    if (IsValidate === true) {
      IsValidateCheck(selectedDates, name, selectedDates);
    }

    const year = selectedDates[0]?.getFullYear();
    const month = (selectedDates[0]?.getMonth() + 1)
      .toString()
      .padStart(2, "0");
    const day = selectedDates[0]?.getDate().toString().padStart(2, "0");
    const hours = selectedDates[0]?.getHours().toString().padStart(2, "0");
    const minutes = selectedDates[0]?.getMinutes().toString().padStart(2, "0");
    const sec = selectedDates[0]?.getSeconds().toString().padStart(2, "0");
    // const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${sec} `;
    const formattedDate = `${day}-${month}-${year} ${hours}:${minutes}:${sec}`;
    const updatedFollowUpdateTime = {
      ...data,
      [name]: formattedDate,
    };

    setData(updatedFollowUpdateTime);
  };

  const IsValidateCheck = (e, name, value) => {
    let validResp = Required(value);

    if (!validResp.isValid) {
      if (e !== null) {
        e.target;
      }
    }
    SetFormState((prevState) => ({
      ...prevState,
      [name]: { valid: validResp.isValid, errors: validResp.message },
    }));
  };

  function Required(val) {
    return val != 0 && val != undefined
      ? { isValid: true, message: "" }
      : { isValid: false, message: "This field is Required!" };
  }
  useEffect(() => {
    if (data[name]) {
      const dateString = data[name];
      const [datePart, timePart] = dateString.split(" ");
      const [day, month, year] = datePart.split("-");
      const selectedDate = new Date(year, month - 1, day);
      setCheckDate(selectedDate.toDateString());
    }
  }, [data[name]]);
  return (
    <>
      <Flatpickr
        value={value}
        className={className}
        placeholder={placeholder}
        options={{
          disableMobile: "true",
          enableTime: true,
          dateFormat: "d-m-Y H:i:S",
          time_24hr: true,
          minTime:
            new Date().toDateString() === checkDate
              ? new Date().getHours() + ":" + (new Date().getMinutes() + 1) // Set the minimum time to current time if it's today
              : "00:00",
        }}
        onChange={(e) => handleChangeDate(e, name)}
        disabled={disable}
      />
    </>
  );
};

export default SelectAllDateswithTime;
