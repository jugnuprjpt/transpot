import React, { useState } from "react";
import Icon from "@/components/ui/Icon";

const CommonTextInput = ({
  value,
  id,
  type,
  icon,
  placeholder,
  name,
  tenderForm,
  setTenderForm,
  IsValidate,
  SetFormState,
  disabled,
  readOnly,
  defaultValue,
  setAlternativeError,
  setAlternativeEmailError,
  hasIcon,
}) => {
  const [open, setOpen] = useState(false);
  const handleChange = (e, name) => {
    const updatedSearchParameter = {
      ...tenderForm,
      [name]: e.target.value,
    };
    setTenderForm(updatedSearchParameter);

    if (IsValidate === true) {
      IsValidateCheck(e, name, e.target.value);
    }
    if (name === "email_id" || name === "alternate_email_id") {
      validateEmail(e.target.value);
    } else if (name === "contact_no" || name == "alternate_contact_no") {
      validateContactNumber(e.target.value);
    } else if (name === "password") {
      validatePassword(e.target.value);
    }
  };

  const togglePasswordVisibility = () => {
    setOpen((prevOpen) => !prevOpen);
  };

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

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValidEmail = emailRegex.test(email);
    if (!isValidEmail) {
      if (IsValidate === true) {
        SetFormState((prevState) => ({
          ...prevState,
          email_id: { valid: false, errors: "Invalid email format" },
        }));
      } else {
        if (email.trim().length === 0) {
          setAlternativeEmailError("");
        } else {
          setAlternativeEmailError("Invalid Email format");
        }
      }
    } else {
      if (IsValidate === true) {
        SetFormState((prevState) => ({
          ...prevState,
          email_id: { valid: true, errors: "" },
        }));
      } else {
        setAlternativeEmailError("");
      }
    }
    // Clear previous error message if email format is valid
  };

  const validateContactNumber = (contactNumber) => {
    const contactNumberRegex = /^[0-9]{10}$/;
    const isValidContactNumber = contactNumberRegex.test(contactNumber);
    if (!isValidContactNumber) {
      if (IsValidate === true) {
        SetFormState((prevState) => ({
          ...prevState,
          contact_no: { valid: false, errors: "Invalid contact number format" },
        }));
      } else {
        if (contactNumber.trim().length === 0) {
          setAlternativeError("");
        } else {
          setAlternativeError("Invalid contact number format");
        }
      }
    } else {
      if (IsValidate === true) {
        SetFormState((prevState) => ({
          ...prevState,
          contact_no: { valid: true, errors: "" },
        }));
      } else {
        setAlternativeError("");
      }
    }
  };

  const validatePassword = (password) => {
    const minLength = 8;
    const maxLength = 25;
    const hasNumber = /\d/;
    const hasSpecialChar = /[^\w\s]/;
    const hasAlpha = /[a-zA-Z]/;

    let error = "";
    if (!password) error = "Password is required";
    else if (password.length < minLength)
      error = `Password must be at least ${minLength} characters`;
    else if (password.length > maxLength)
      error = `Password cannot exceed ${maxLength} characters`;
    else if (!hasAlpha.test(password))
      error = "Password must contain at least one alphabetic character";
    else if (!hasNumber.test(password))
      error = "Password must contain at least one numeric character";
    else if (!hasSpecialChar.test(password))
      error =
        "Password must contain at least one special character (e.g., #, @, !)";

    SetFormState((prevState) => ({
      ...prevState,
      password: { valid: error === "", errors: error },
    }));
  };

  function Required(val) {
    return val !== undefined && val.trim().length > 0
      ? { isValid: true, message: "" }
      : { isValid: false, message: "This field is Required!" };
  }

  return (
    <>
      <div className="relative space-y-3">
        <input
          defaultValue={defaultValue}
          value={value}
          className={`form-control py-[8px]`}
          id={id}
          //type={type}
          type={open && type === "password" ? "text" : type}
          placeholder={placeholder}
          onChange={(e) => handleChange(e, name)}
          name={name}
          onKeyPress={(e) => {
            if ((type === "number" && isNaN(Number(e.key))) || false) {
              e.preventDefault();
            }
          }}
          onKeyDown={(e) => {
            if (
              type === "number" &&
              (e.key === "-" ||
                e.key === "–" ||
                e.key === "ArrowDown" ||
                e.key === "ArrowUp")
            ) {
              e.preventDefault();
            }
          }}
          disabled={disabled}
          readOnly={readOnly}
        />
        {/* <div className="flex text-xl absolute ltr:right-[14px] rtl:left-[14px] top-1/2 -translate-y-1/2  space-x-1 rtl:space-x-reverse"> */}
        {hasIcon && type === "password" && (
          <div className="absolute right-3 top-1/2 transform -translate-y-[113%] cursor-pointer text-secondary-500">
            <span onClick={togglePasswordVisibility}>
              {open ? (
                <Icon icon="heroicons-outline:eye" />
              ) : (
                <Icon icon="heroicons-outline:eye-off" />
              )}
            </span>
          </div>
        )}
      </div>
      {/* </div> */}
    </>
  );
};

export default CommonTextInput;
