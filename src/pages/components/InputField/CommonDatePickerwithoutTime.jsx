import React from "react";
import Flatpickr from "react-flatpickr";

const CommonDatePickerwithoutTime = ({
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
    const formattedDate = `${day}-${month}-${year}`;
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
  return (
    <>
      {page == "tenderStatus" || page == "oemInsert" ? (
        <Flatpickr
          value={value}
          className={className}
          placeholder={placeholder}
          options={{
            // enableTime: true,
            disableMobile: "true",
            dateFormat: "d-m-Y",
            time_24hr: true,
            // minDate: "today",
          }}
          onChange={(e) => handleChangeDate(e, name)}
          disabled={disable}
        />
      ) : (
        <Flatpickr
          value={value}
          className={className}
          placeholder={placeholder}
          options={{
            disableMobile: "true",
            dateFormat: "d-m-Y",
          }}
          onChange={(e) => handleChangeDate(e, name)}
          disabled={disable}
        />
      )}
    </>
  );
};

export default CommonDatePickerwithoutTime;
