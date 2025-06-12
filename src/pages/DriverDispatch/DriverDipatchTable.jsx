import React, { useState, useMemo } from "react";

import Card from "@/components/ui/Card";
import Icon from "@/components/ui/Icon";
import Tooltip from "@/components/ui/Tooltip";
import {
  useTable,
  useRowSelect,
  useSortBy,
  useGlobalFilter,
  usePagination,
} from "react-table";
import GlobalFilter from "../table/react-tables/GlobalFilter";
import PaginationWithClientSide from "../../components/Pagination/PaginationWithClientSide";
import DocView from "../documentManagement/DocView";
import Modal from "../../components/ui/Modal";
// import GlobalFilter from "../table/react-tables/GlobalFilter";
// import PaginationWithClientSide from "../../components/Pagination/PaginationWithClientSide";
// import DocView from "./DocView";
// import Modal from "../../components/ui/Modal";

const DriverDipatchTable = ({
  title = "Document Management System",
  tableData,
}) => {
  const [viewId, setViewId] = useState(0);

  const [modalOpen, setModalOpen] = useState(false);
  const [deleteData, setDeleteData] = useState(null);
  const closeModalHandler = () => {
    setModalOpen(false);
  };
  const handleDeleteClick = (row) => {
    setModalOpen(true);
    setDeleteData(row);
  };

  const handleDelete = () => {
    if (deleteData) {
      settingServices
        .DeparmentDelete(deleteData.row.original.department_id)
        .then((res) => {
          if (res.Success == true) {
            const successMessage = deleteData?.row?.original?.is_active
              ? "Department is Inactivated"
              : "Department is Activated";

            ShowSuccessToast(successMessage);
            // ShowSuccessToast(res?.Data);
            setIsDeleteDone((prev) => prev + 1);
          } else {
            ShowErrorToast(res.Message);
          }
        });
    }
    setModalOpen(false);
  };

  const COLUMNS = [
    {
      Header: "#",
      accessor: "sequenceNumber",
      Cell: (row) => {
        return <span>{row?.cell?.value}</span>;
      },
    },

    {
      Header: "Driver Name",
      accessor: "driver_name",
      Cell: (row) => {
        return <span>{row?.cell?.value}</span>;
      },
    },

    {
      Header: "Document Name",
      accessor: "document_name",
      Cell: (row) => {
        return <span>{row?.cell?.value}</span>;
      },
    },
    {
      Header: "Original Document Name",
      accessor: "original_document_name",
      Cell: (row) => {
        return <span>{row?.cell?.value}</span>;
      },
    },
    {
      Header: "Sub Folder Name",
      accessor: "sub_folder_name",
      Cell: (row) => {
        return <span>{row?.cell?.value}</span>;
      },
    },
    {
      Header: "Document Month",
      accessor: "document_month",
      Cell: (row) => {
        return <span>{row?.cell?.value}</span>;
      },
    },
    {
      Header: "Document Year",
      accessor: "document_year",
      Cell: (row) => {
        return <span>{row?.cell?.value}</span>;
      },
    },
    {
      Header: "action",
      accessor: "action",
      Cell: (row) => {
        return (
          <div className="flex space-x-3 rtl:space-x-reverse">
            <Tooltip
              content="View"
              placement="top"
              arrow
              animation="shift-away"
            >
              <button
                className="action-btn"
                type="button"
                onClick={() => handleView(row)}
              >
                <Icon icon="heroicons:eye" />
              </button>
            </Tooltip>
            {/* <Tooltip
              content="Edit"
              placement="top"
              arrow
              animation="shift-away"
            >
              <button className="action-btn" type="button">
                <Icon icon="heroicons:pencil-square" />
              </button>
            </Tooltip> */}
            <Tooltip
              content="Delete"
              placement="top"
              arrow
              animation="shift-away"
              theme="danger"
            >
              <button
                className="action-btn"
                type="button"
                onClick={() => handleDeleteClick(row)}
              >
                <Icon icon="heroicons:trash" />
              </button>
            </Tooltip>
          </div>
        );
      },
    },
  ];
  const handleView = (viewData) => {
    setViewId(viewData?.row?.original?.driver_documents_id);
    setOpen(true);
  };

  const columns = useMemo(() => COLUMNS, []);
  const modifiedData = useMemo(() => {
    return tableData.map((item, index) => ({
      ...item,
      sequenceNumber: index + 1,
    }));
  }, [tableData]);
  const data = useMemo(() => modifiedData, [modifiedData]);
  const [open, setOpen] = useState(false);

  const tableInstance = useTable(
    {
      columns,
      data,
    },

    useGlobalFilter,
    useSortBy,
    usePagination,
    useRowSelect
  );
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    footerGroups,
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    state,
    gotoPage,
    pageCount,
    setPageSize,
    setGlobalFilter,
    prepareRow,
  } = tableInstance;

  const { globalFilter, pageIndex, pageSize } = state;
  return (
    <>
      <Card>
        <div className="md:flex justify-between items-center mb-6">
          <h4 className="card-title">{title}</h4>
          <div>
            <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
          </div>
        </div>
        <div className="overflow-x-auto -mx-6">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden ">
              <table
                className="min-w-full divide-y divide-slate-100 table-fixed dark:divide-slate-700"
                {...getTableProps}
              >
                <thead className="bg-slate-200 dark:bg-slate-700">
                  {headerGroups.map((headerGroup) => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                      {headerGroup.headers.map((column) => (
                        <th
                          {...column.getHeaderProps(
                            column.getSortByToggleProps()
                          )}
                          scope="col"
                          className=" table-th "
                        >
                          {column.render("Header")}
                          <span>
                            {column.isSorted
                              ? column.isSortedDesc
                                ? " 🔽"
                                : " 🔼"
                              : ""}
                          </span>
                        </th>
                      ))}
                    </tr>
                  ))}
                </thead>
                <tbody
                  className="bg-white divide-y divide-slate-100 dark:bg-slate-800 dark:divide-slate-700"
                  {...getTableBodyProps}
                >
                  {page.map((row) => {
                    prepareRow(row);
                    return (
                      <tr {...row.getRowProps()}>
                        {row.cells.map((cell) => {
                          return (
                            <td {...cell.getCellProps()} className="table-td">
                              {cell.render("Cell")}
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <PaginationWithClientSide
          pageSize={pageSize}
          setPageSize={setPageSize}
          pageIndex={pageIndex}
          pageOptions={pageOptions}
          canPreviousPage={canPreviousPage}
          gotoPage={gotoPage}
          previousPage={previousPage}
          canNextPage={canNextPage}
          nextPage={nextPage}
          pageCount={pageCount}
        />
        {/*end*/}
      </Card>
      {open && (
        <DocView
          open={open}
          setOpen={setOpen}
          setViewId={setViewId}
          viewId={viewId}
        />
      )}

      {/* ------------------------------ Modal ---------------------------------------- */}
      <Modal
        title="Delete Confirmation"
        activeModal={modalOpen}
        onClose={closeModalHandler}
        uncontrol={false}
        centered
        // className="max-w-xl relative"
      >
        <div className="text-base text-slate-600 dark:text-slate-300 mt-4">
          Are you sure want to Delete?
        </div>
        <div className="flex justify-end space-x-2 mt-4">
          <button
            className="bg-gray-500 text-white px-4 py-1 rounded hover:bg-gray-600"
            onClick={closeModalHandler}
          >
            Cancel
          </button>
          <button
            className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
            onClick={handleDelete}
          >
            Delete
          </button>
        </div>
      </Modal>
    </>
  );
};

export default DriverDipatchTable;
