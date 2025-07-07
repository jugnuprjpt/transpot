import React, { useState } from "react";
import SimpleBar from "simplebar-react";
import Icon from "@/components/ui/Icon";
import useGetDriverListing from "../../hooks/useDriverListing";
import { ValidaterHelper } from "../components/validationFunction/ValidationCheck";
import {
  ShowErrorToast,
  ShowSuccessToast,
} from "../components/ToastMessage/ToastMessage";
import CommonSelectInput from "../components/InputField/CommonSelectInput";
import { loadManagementService } from "../../_services/loadManagementService";
import Loading from "@/components/Loading";

function LoadAssign({ loadAssignOpen, setLoadAssignOpen, assigmentData }) {
  const [isLoading, setIsLoading] = useState(false);
  const { driverData } = useGetDriverListing();
  const [FormState, SetFormState] = useState({
    driver_name: { errors: "", valid: false },
  });
  const [allData, setAllData] = useState({
    driver_name: "",
  });

  const handleCloseDrawer = () => {
    setLoadAssignOpen(false);
    setAllData({
      driver_name: "",
    });
  };

  const handleSubmit = async () => {
    const isFormValid = ValidaterHelper.ValidateFromState(
      FormState,
      SetFormState,
      {
        ...allData,
      }
    );

    if (!isFormValid) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    setIsLoading(true);
    const formData = {
      driver_name: allData?.driver_name,
      driver_id: allData?.driver_id,
      old_driver_name: assigmentData?.driverName,
      load_number: assigmentData?.loadNumber,
      file_name: assigmentData?.originalDocumentName,
      load_id: assigmentData?.loadId,
      load_doc_base_path: assigmentData?.documentPath,
      driver_doc_base_path: "",
      driver_documents_id: assigmentData?.driver_documents_id,
    };

    const res = await loadManagementService.loadAssign(formData);

    if (res.Success == true) {
      setIsLoading(false);
      ShowSuccessToast(res?.Message);
      setLoadAssignOpen(false);
      handleCloseDrawer();
    } else {
      setIsLoading(false);
      ShowErrorToast("Something Went Wrong");
    }
    // }
  };
  return (
    <>
      {" "}
      <>
        {isLoading && (
          <div className="fixed inset-0 z-[999999] bg-black/40 backdrop-blur-sm flex items-center justify-center">
            <Loading />
          </div>
        )}{" "}
        <div>
          {loadAssignOpen === true && (
            <div
              className={`
setting-wrapper fixed overflow-y-scroll ltr:right-0 rtl:left-0 top-0 md:w-[500px] w-[200px]
bg-white dark:bg-slate-800 h-screen z-[99999]  md:pb-6 pb-[100px] shadow-base2
dark:shadow-base3 border border-slate-200 dark:border-slate-700 transition-all duration-150 
${
  loadAssignOpen
    ? "translate-x-0 opacity-100 visible"
    : "ltr:translate-x-full rtl:-translate-x-full opacity-0 invisible"
}

`}
            >
              <SimpleBar className="px-6 h-full">
                <header className="flex items-center justify-between border-b border-gray-200 dark:border-gray-700 -mx-6 px-6 py-2 mb-4">
                  <div>
                    <span className="text-[14px] xl:text-[16px] 2xl:text-[16px] font-bold text-gray-600 dark:text-gray-400 mb-[20px]">
                      Load Assign
                    </span>
                  </div>
                  <div className="cursor-pointer text-2xl text-gray-800 dark:text-gray-200">
                    <button onClick={handleCloseDrawer}>
                      <Icon icon="heroicons-outline:x" />
                    </button>
                  </div>
                </header>
                <div className="grid xl:grid-cols-1 gap-2 py-2 text-sm">
                  <div className="flex flex-col gap-2">
                    <label className="text-sm text-gray-600 dark:text-gray-400">
                      Driver Name*
                    </label>
                    <CommonSelectInput
                      isClearable={true}
                      className="react-select"
                      classNamePrefix="select"
                      name="driver_id"
                      placeholder="Select Driver Name"
                      options={driverData}
                      value={driverData}
                      tenderForm={allData}
                      setTenderForm={setAllData}
                      SetFormState={SetFormState}
                      IsValidate={true}
                    />
                    <span className="text-red-500 text-sm">
                      {FormState?.driver_id?.errors}
                    </span>
                  </div>
                </div>

                <div className="flex gap-4">
                  <button
                    className="mt-2  text-white px-4 py-2 rounded hover:bg-success-500 text-success-500 bg-success-500"
                    onClick={handleSubmit}
                  >
                    <div className="flex items-center">
                      <div className=" border-t-2 border-white-500 mr-2"></div>
                    </div>
                    Submit
                  </button>
                  <button
                    className="mt-2 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                    onClick={handleCloseDrawer}
                  >
                    Cancel
                  </button>
                </div>
              </SimpleBar>
            </div>
          )}
        </div>
      </>
    </>
  );
}

export default LoadAssign;
