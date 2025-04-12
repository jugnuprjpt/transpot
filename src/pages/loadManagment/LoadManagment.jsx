import React, { useEffect, useState } from "react";
import LoadManagmentTable from "./LoadAssigntTable";
import Icon from "@/components/ui/Icon";
import LoadManagementCreate from "./LoadManagementCreate";
import { loadManagementService } from "../../_services/loadManagementService";
import { ShowErrorToast } from "../components/ToastMessage/ToastMessage";
import LoadTabbar from "./LoadTabbar";
// import Card from "@/components/ui/Card";
// import ExampleOne from "./react-tables/ExampleOne";
// import ExampleTwo from "./react-tables/ExampleTwo";

const LoadManagment = () => {
  const [open, setOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const [tableData, setTableData] = useState([]);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isCreateDone, setIsCreateDone] = useState(false);
  const [isEditDone, setIsEditDone] = useState(false);
  const [isDeleteDone, setIsDeleteDone] = useState(0);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    loadListing();
  }, [isCreateDone, isEditDone, isDeleteDone]);

  const loadListing = async () => {
    try {
      const res = await loadManagementService.loadManagementListing();
      if (res.Success === true) {
        setLoading(false);
        setTableData(res?.Data);
      } else {
        setTableData([]);
        setLoading(false);
        ShowErrorToast("Something Went Wrong");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleCreate = () => {
    setOpen(true);
  };
  return (
    <div className="float-left w-full">
      <div className="text-[20px] font-bold text-[#000] w-full float-right">
        <div className="float-right">
          <span
            className="float-left inline-block min-w-[90px] text-center mx-auto rounded-[999px]  bg-success-500  text-[16px] font-semibold px-[30px] py-[7px] text-[#fff] cursor-pointer"
            onClick={handleCreate}
          >
            <Icon
              icon="heroicons:plus"
              className="w-5 h-5 float-left mr-[5px] mt-[2px]"
            />
            Add Load
          </span>
        </div>
      </div>
      <div className=" float-left w-full">
        {/* <LoadManagmentTable
          tableData={tableData} */}
        {/* // setIsDeleteDone={setIsDeleteDone}
          // setIsCreateOpen={setIsCreateOpen}
          // setEditId={setEditId}
          // setIsEditOpen={setIsEditOpen}
          // loading={loading} */}
        {/* /> */}
        <LoadTabbar tableData={tableData} />
      </div>
      <LoadManagementCreate
        open={open}
        setOpen={setOpen}
        isEditOpen={isEditOpen}
        setIsEditOpen={setIsEditOpen}
        // isCreateOpen={isCreateOpen}
        // setIsCreateOpen={setIsCreateOpen}
        // isCreateDone={isCreateDone}
        // setIsCreateDone={setIsCreateDone}
        // editId={editId}
        // setEditId={setEditId}
        // isEditOpen={isEditOpen}
        // setIsEditOpen={setIsEditOpen}
        // isEditDone={isEditDone}
        // setIsEditDone={setIsEditDone}
      />
    </div>
  );
};

export default LoadManagment;
