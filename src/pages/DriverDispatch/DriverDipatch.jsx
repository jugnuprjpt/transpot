import React, { useEffect, useState } from "react";
import { docManagementService } from "../../_services/docManagementService";
import { ShowErrorToast } from "../components/ToastMessage/ToastMessage";
import DocumentManagmentTable from "../documentManagement/DocumentManagmentTable";
import { loadManagementService } from "../../_services/loadManagementService";

const DriverDipatch = () => {
  const [tableData, setTableData] = useState([]);
  const [isCreateDone, setIsCreateDone] = useState(false);
  const [isEditDone, setIsEditDone] = useState(false);
  const [isDeleteDone, setIsDeleteDone] = useState(0);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    docListing();
  }, [isCreateDone, isEditDone, isDeleteDone]);

  const docListing = async () => {
    try {
      const res = await loadManagementService.driverDispatchListing();
      if (res.Success === true) {
        setLoading(false);
        setTableData(res?.Data);
        console.log(tableData, "loadManagementService......");
      } else {
        setTableData([]);
        setLoading(false);
        ShowErrorToast("Something Went Wrong");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="float-left w-full">
      <div className="text-[20px] font-bold text-[#000] mb-[20px] w-full float-right"></div>
      <div className=" float-left w-full">
        <DocumentManagmentTable tableData={tableData} />
      </div>
    </div>
  );
};

export default DriverDipatch;
