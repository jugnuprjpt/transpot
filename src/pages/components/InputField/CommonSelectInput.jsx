import React from "react";
import Select from "react-select";

const CommonSelectInput = ({
  IsValidate,
  SetFormState,
  tenderForm,
  name,
  value,
  options,
  setTenderForm,
  placeholder,
  disabled = false,
  isClearable,
  setCityModal,
  page,
}) => {
  const styles = {
    option: (provided) => ({
      ...provided,
      fontSize: "14px",
    }),
    placeholder: (provided) => ({
      ...provided,
      color: "gray", // Customize the placeholder color
      fontSize: "0.875rem",
    }),
  };

  const handleChange = (selectedOption, name) => {
    if (name == "state_id") {
      if (IsValidate === true) {
        IsValidateCheck(selectedOption, name, selectedOption?.value);
      }
      const updatedValue = selectedOption ? selectedOption.value : 0;

      const updatedtenderForm6 = {
        ...tenderForm,
        [name]: updatedValue,
        city_id: 0,
      };
      setCityModal((prevCityModal) => ({
        ...prevCityModal,
        pageNo: 1,
        parentids: updatedValue,
      }));

      setTenderForm(updatedtenderForm6);
    } else if (name == "payment_mode" && page == "payment") {
      if (IsValidate === true) {
        IsValidateCheck(selectedOption, name, selectedOption?.value);
      }
      const updatedValue = selectedOption ? selectedOption.value : 0;

      const updatedtenderForm6 = {
        ...tenderForm,
        [name]: updatedValue,
        instrument_type_id: 0,
      };

      setTenderForm(updatedtenderForm6);
    } else if (name == "driver_id") {
      if (IsValidate === true) {
        IsValidateCheck(selectedOption, name, selectedOption?.value);
      }
      const updatedValue = selectedOption ? selectedOption.value : 0;

      const updatedtenderForm6 = {
        ...tenderForm,
        [name]: updatedValue,
        driver_name: selectedOption?.label,
      };

      setTenderForm(updatedtenderForm6);
    } else if (name == "company_id") {
      if (IsValidate === true) {
        IsValidateCheck(selectedOption, name, selectedOption?.value);
      }
      const updatedValue = selectedOption ? selectedOption.value : 0;

      const updatedtenderForm6 = {
        ...tenderForm,
        [name]: updatedValue,
        company_name: selectedOption?.label,
      };

      setTenderForm(updatedtenderForm6);
    } else if (name == "tender_status_id") {
      if (IsValidate === true) {
        IsValidateCheck(selectedOption, name, selectedOption?.value);
      }
      const updatedValue = selectedOption ? selectedOption.value : 0;

      const updatedtenderForm6 = {
        ...tenderForm,
        [name]: updatedValue,
        contract_value: "",
        contract_date: "",
      };

      setTenderForm(updatedtenderForm6);
    } else if (name == "document_path") {
      if (IsValidate === true) {
        IsValidateCheck(selectedOption, name, selectedOption?.value);
      }
      const updatedValue = selectedOption ? selectedOption.value : 0;

      const updatedtenderForm7 = {
        ...tenderForm,
        [name]: updatedValue,
        // document_name: selectedOption?.label,
        document_path: selectedOption?.document_path,
        brief_case_id: selectedOption?.brief_case_id,
      };

      setTenderForm(updatedtenderForm7);
    } else {
      if (IsValidate === true) {
        IsValidateCheck(selectedOption, name, selectedOption?.value);
      }
      const updatedValue = selectedOption ? selectedOption.value : 0;

      const updatedtenderForm6 = {
        ...tenderForm,
        [name]: updatedValue,
      };

      setTenderForm(updatedtenderForm6);
    }
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
      <div>
        <Select
          isClearable={isClearable}
          className="react-select"
          classNamePrefix="select"
          styles={styles}
          value={
            value?.find((option) => option?.value == tenderForm?.[name]) !==
            undefined
              ? value?.find((option) => option?.value == tenderForm?.[name])
              : ""
          }
          name={name}
          options={options}
          onChange={(e) => handleChange(e, name)}
          placeholder={placeholder}
          isDisabled={disabled}
        />
      </div>
    </>
  );
};

export default CommonSelectInput;
