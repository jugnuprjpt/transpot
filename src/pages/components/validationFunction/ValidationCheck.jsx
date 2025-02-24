export const ValidaterHelper = {
  ValidateFromState,
  Required,
  ValidateFromState2,
};

function ValidateFromState(formState, SetFormState, formData) {
  let isValid = true;
  for (const key in formState) {
    if (formState[key].valid == false) {
      let validResp = Required(
        formData[key]?.toString() == "0" ? "" : formData[key]?.toString()
      );
      if (validResp.isValid === false) {
        SetFormState((prevState) => ({
          ...prevState,
          [key]: { valid: validResp.isValid, errors: validResp.message },
        }));
        isValid = validResp.isValid;
        // return isValid;
      }
    }
  }
  return isValid;
}
function ValidateFromState2(formState, SetFormState, formData) {
  let isValid = true;
  for (const key in formState) {
    if (formState[key].valid == false) {
      let validResp = Required(formData[key]?.toString());
      if (validResp.isValid === false) {
        SetFormState((prevState) => ({
          ...prevState,
          [key]: { valid: validResp.isValid, errors: validResp.message },
        }));
        isValid = validResp.isValid;
        // return isValid;
      }
    }
  }
  return isValid;
}

function Required(val) {
  return val !== undefined && val.trim().length > 0
    ? { isValid: true, message: "" }
    : { isValid: false, message: "This field is Required!" };
}
