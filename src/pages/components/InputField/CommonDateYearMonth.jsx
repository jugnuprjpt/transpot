import React from "react";
import Flatpickr from "react-flatpickr";

const CommonDateYearMonth = ({
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

    const formattedDate = `${year}-${month}`;
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
            dateFormat: "Y-m",
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
            dateFormat: "Y-m",
          }}
          onChange={(e) => handleChangeDate(e, name)}
          disabled={disable}
        />
      )}
    </>
  );
};

export default CommonDateYearMonth;
