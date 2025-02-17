import React, { useState } from "react";

import Icon from "@/components/ui/Icon";
import DocumentManagmentTable from "./DocumentManagmentTable";
import DocumentManagementCreate from "./DocumentManagementCreate";

// import Card from "@/components/ui/Card";
// import ExampleOne from "./react-tables/ExampleOne";
// import ExampleTwo from "./react-tables/ExampleTwo";

const DocumentManagement = () => {
  const [open, setOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const handleCreate = () => {
    setOpen(true);
  };
  return (
    // <div className=" space-y-5">
    //   sdadsa
    //   <LoadManagmentTable />
    // </div>

    <div className="float-left w-full">
      <div className="text-[20px] font-bold text-[#000] mb-[20px] w-full float-right">
        <div className="float-right">
          <span
            className="float-left inline-block min-w-[90px] text-center mx-auto rounded-[999px]  bg-success-500  text-[16px] font-semibold px-[30px] py-[7px] text-[#fff] cursor-pointer"
            onClick={handleCreate}
          >
            <Icon
              icon="heroicons:plus"
              className="w-5 h-5 float-left mr-[5px] mt-[2px]"
            />
            Add Document
          </span>
        </div>
      </div>
      <div className=" float-left w-full">
        <DocumentManagmentTable
        //   tableData={tableData}
        //   setIsDeleteDone={setIsDeleteDone}
        //   setIsCreateOpen={setIsCreateOpen}
        //   setEditId={setEditId}
        //   setIsEditOpen={setIsEditOpen}
        //   loading={loading}
        />
      </div>
      <DocumentManagementCreate
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

export default DocumentManagement;
