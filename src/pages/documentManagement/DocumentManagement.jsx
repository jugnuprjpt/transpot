import React, { useEffect, useState } from "react";

import Icon from "@/components/ui/Icon";
import DocumentManagmentTable from "./DocumentManagmentTable";
import DocumentManagementCreate from "./DocumentManagementCreate";
import { docManagementService } from "../../_services/docManagementService";
import { ShowErrorToast } from "../components/ToastMessage/ToastMessage";
import CreateRocPoc from "./CreateRocPoc";
import PageLayout from "@/components/page/PageLayout";
import SkeletonTable from "@/components/skeleton/Table";

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

  const [openRocPoc, setOpenRocPoc] = useState(false);

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
  const handleRocPoc = () => {
    setOpenRocPoc(true);
  };

  const actions = [
    <span
      key="add-roc-poc"
      className="inline-block min-w-[90px] text-center mx-auto rounded-[999px] bg-success-500 text-[16px] font-semibold px-[30px] py-[7px] text-[#fff] cursor-pointer"
      onClick={handleRocPoc}
    >
      <Icon
        icon="heroicons:plus"
        className="w-5 h-5 float-left mr-[5px] mt-[2px]"
      />
      Add Roc And Pod
    </span>,
    <span
      key="add-document"
      className="inline-block min-w-[90px] text-center mx-auto rounded-[999px] bg-success-500 text-[16px] font-semibold px-[30px] py-[7px] text-[#fff] cursor-pointer"
      onClick={handleCreate}
    >
      <Icon
        icon="heroicons:plus"
        className="w-5 h-5 float-left mr-[5px] mt-[2px]"
      />
      Add Document
    </span>,
  ];

  const tableSkeleton = <SkeletonTable columns={8} count={8} />;

  return (
    <>
      <PageLayout
        title="Document Management"
        actions={actions}
        loading={loading}
        skeleton={tableSkeleton}
      >
        <DocumentManagmentTable tableData={tableData} />
      </PageLayout>
      
      <DocumentManagementCreate
        open={open}
        setOpen={setOpen}
        isEditOpen={isEditOpen}
        setIsEditOpen={setIsEditOpen}
        isEditDone={isEditDone}
        setIsEditDone={setIsEditDone}
      />
      <CreateRocPoc
        openRocPoc={openRocPoc}
        setOpenRocPoc={setOpenRocPoc}
        isEditOpen={isEditOpen}
        setIsEditOpen={setIsEditOpen}
        setIsEditDone={setIsEditDone}
        isEditDone={isEditDone}
      />
    </>
  );
};

export default DocumentManagement;
