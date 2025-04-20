import React, { useEffect, useState } from "react";

import Icon from "@/components/ui/Icon";
import DocumentManagmentTable from "./DocumentManagmentTable";
import DocumentManagementCreate from "./DocumentManagementCreate";
import { docManagementService } from "../../_services/docManagementService";
import { ShowErrorToast } from "../components/ToastMessage/ToastMessage";

const DocumentManagement = () => {
  const [open, setOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isCreateDone, setIsCreateDone] = useState(false);
  const [isEditDone, setIsEditDone] = useState(false);
  const [isDeleteDone, setIsDeleteDone] = useState(0);
  const [editId, setEditId] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    docListing();
  }, [isCreateDone, isEditDone, isDeleteDone]);

  const docListing = async () => {
    try {
      const res = await docManagementService.docManagementListing();
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
          tableData={tableData}
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
        isEditDone={isEditDone}
        setIsEditDone={setIsEditDone}
      />
    </div>
  );
};

export default DocumentManagement;
