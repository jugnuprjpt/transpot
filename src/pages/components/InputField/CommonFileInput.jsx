import React, { useState } from "react";

const CommonFileInput = ({
  value,
  id,
  type,
  placeholder,
  name,
  tenderForm,
  setTenderForm,
  IsValidate,
  SetFormState,
  disabled,
  readOnly,
  inputRef,
  showHelperText = true,
  isMultiple,
  validateField,
  index,
  rows,
}) => {
  const handleChange = (e, name) => {
    const selectedFile = e.target?.files[0];
    const updatedSearchParameter = {
      ...tenderForm,
      [name]: selectedFile,
    };
    setTenderForm(updatedSearchParameter);
    if (IsValidate === true) {
      IsValidateCheck(e, name, e.target.value);
    }
  };
  // const handleChange = (e, name) => {
  //   const selectedFile = e.target?.files[0];
  //   if (selectedFile) {
  //     if (selectedFile.size <= 20 * 1024 * 1024) {
  //       const updatedSearchParameter = {
  //         ...tenderForm,
  //         [name]: selectedFile,
  //       };
  //       setTenderForm(updatedSearchParameter);
  //       if (IsValidate === true) {
  //         IsValidateCheck(e, name, e.target.value);
  //       }
  //     } else {
  //       alert("File size exceeds the maximum limit of 20MB.");
  //       e.target.value = "";
  //     }
  //   }
  // };

  const IsValidateCheck = (e, name, value) => {
    let validResp = Required(value);

    if (!validResp.isValid) {
      if (e !== null) {
        e.target.focus();
      }
    }
    SetFormState((prevState) => ({
      ...prevState,
      [name]: { valid: validResp.isValid, errors: validResp.message },
    }));
  };

  function Required(val) {
    return val !== undefined && val.trim().length > 0
      ? { isValid: true, message: "" }
      : { isValid: false, message: "This field is Required!" };
  }

  const handleMultyChange = (e, index) => {
    const { name, value, files } = e.target;
    const values = [...rows];
    if (name === "document_type_id") {
      values[index].document_type_id = value;
    } else if (name === "document_name") {
      values[index].document_name = value;
    } else if (name === "document_path") {
      values[index].document_path = files[0];
    }

    setTenderForm(values);
    validateField(name, value, index);
  };

  return (
    <>
      <div className="space-y-3">
        <input
          ref={inputRef}
          // value={value}
          className={`form-control py-[5px] px-[5px]`}
          id={id}
          type={type}
          placeholder={placeholder}
          onChange={(e) =>
            isMultiple ? handleMultyChange(e, index) : handleChange(e, name)
          }
          name={name}
          disabled={disabled}
          readOnly={readOnly}
        />
      </div>
      {isMultiple === undefined && tenderForm?.[name] && showHelperText && (
        <p>{tenderForm[name].name || tenderForm[name]}</p>
      )}
    </>
  );
};

export default CommonFileInput;
