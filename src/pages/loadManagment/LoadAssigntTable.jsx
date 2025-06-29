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
import LoadAssign from "./LoadAssign";
import LoadView from "./LoadView";
import Modal from "../../components/ui/Modal";
import { loadManagementService } from "../../_services/loadManagementService";
import { ShowSuccessToast } from "../components/ToastMessage/ToastMessage";
import LoadCancel from "./LoadCancel";

const LoadAssigntTable = ({
  title = "Load Assigned",
  tableData,
  openLoadCancel,
  setOpenLoadCancel,
  loadCancelData,
  setLoadCancelData,
}) => {
  const [loadAssignOpen, setLoadAssignOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [dovViewData, setDocViewData] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteData, setDeleteData] = useState(null);
  const [assigmentData, setAssigmentData] = useState([]);

  const closeModalHandler = () => {
    setModalOpen(false);
  };
  const handleDeleteClick = (data) => {
    setLoadCancelData(data?.row?.original);
    setOpenLoadCancel(true);
  };

  const handleProgressClick = (row) => {
    setModalOpen(true);
    setDeleteData(row);
  };

  const handleProgress = async () => {
    if (deleteData) {
      const formData = {
        load_id: deleteData?.row?.original?.load_id,
        load_number: deleteData?.row?.original?.load_number,
      };
      const res = await loadManagementService.loadInProgress(formData);
      ShowSuccessToast(res.Message);
      setModalOpen(false);
    }
    setModalOpen(false);
  };

  const handleView = (data) => {
    setOpen(true);
    setDocViewData(data.row.original);
  };

  const handleAssign = async (data) => {
    setLoadAssignOpen(true);
    const formData = {
      load_id: data?.row?.original?.load_id,
      load_number: data?.row?.original?.load_number,
    };
    const res = await loadManagementService.loadAssigment(formData);
    setAssigmentData(res.Data);
  };

  const COLUMNS = [
    {
      Header: "load Id",
      accessor: "load_id",
      Cell: (row) => {
        console.log(row, "row.");
        return <span>{row?.cell?.value}</span>;
      },
    },
    {
      Header: "Load Number",
      accessor: "load_number",
      Cell: (row) => {
        return <span>{row?.cell?.value}</span>;
      },
    },

    {
      Header: "Source",
      accessor: "source",
      Cell: (row) => {
        return <span>{row?.cell?.value}</span>;
      },
    },
    {
      Header: "Destination",
      accessor: "destination",
      Cell: (row) => {
        return <span>{row?.cell?.value}</span>;
      },
    },
    {
      Header: "Company Name",
      accessor: "company_name",
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
      Header: "Final Price",
      accessor: "final_price",
      Cell: (row) => {
        return <span>{row?.cell?.value}</span>;
      },
    },
    {
      Header: "Base Price",
      accessor: "base_price",
      Cell: (row) => {
        return <span>{row?.cell?.value}</span>;
      },
    },
    {
      Header: "Trailer Used",
      accessor: "trailer_used",
      Cell: (row) => {
        return <span>{row?.cell?.value}</span>;
      },
    },
    {
      Header: "Delivery Date",
      accessor: "delivery_date",
      Cell: (row) => {
        return <span>{row?.cell?.value}</span>;
      },
    },
    {
      Header: "Shipping Date",
      accessor: "shipping_date",
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
              content="Assign"
              placement="top"
              arrow
              animation="shift-away"
            >
              <button
                className="action-btn"
                type="button"
                onClick={() => handleAssign(row)}
              >
                <Icon icon="heroicons:user" />
              </button>
            </Tooltip>
            <Tooltip
              content="In process"
              placement="top"
              arrow
              animation="shift-away"
            >
              <button
                className="action-btn"
                type="button"
                onClick={() => handleProgressClick(row)}
              >
                <Icon icon="heroicons:play-circle" />
              </button>
            </Tooltip>
            <Tooltip
              content="Cancel"
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
                <Icon icon="heroicons:x-mark" />
              </button>
            </Tooltip>
          </div>
        );
      },
    },
  ];

  const columns = useMemo(() => COLUMNS, [tableData]);
  const data = useMemo(() => tableData, [tableData]);

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
        <div className="md:flex md:space-y-0 space-y-5 justify-between mt-6 items-center">
          <div className=" flex items-center space-x-3 rtl:space-x-reverse">
            <select
              className="form-control py-2 w-max"
              value={pageSize}
              onChange={(e) => setPageSize(Number(e.target.value))}
            >
              {[10, 25, 50].map((pageSize) => (
                <option key={pageSize} value={pageSize}>
                  Show {pageSize}
                </option>
              ))}
            </select>
            <span className="text-sm font-medium text-slate-600 dark:text-slate-300">
              Page{" "}
              <span>
                {pageIndex + 1} of {pageOptions.length}
              </span>
            </span>
          </div>
          <ul className="flex items-center  space-x-3  rtl:space-x-reverse">
            <li className="text-xl leading-4 text-slate-900 dark:text-white rtl:rotate-180">
              <button
                className={` ${
                  !canPreviousPage ? "opacity-50 cursor-not-allowed" : ""
                }`}
                onClick={() => gotoPage(0)}
                disabled={!canPreviousPage}
              >
                <Icon icon="heroicons:chevron-double-left-solid" />
              </button>
            </li>
            <li className="text-sm leading-4 text-slate-900 dark:text-white rtl:rotate-180">
              <button
                className={` ${
                  !canPreviousPage ? "opacity-50 cursor-not-allowed" : ""
                }`}
                onClick={() => previousPage()}
                disabled={!canPreviousPage}
              >
                Prev
              </button>
            </li>
            {pageOptions.map((page, pageIdx) => (
              <li key={pageIdx}>
                <button
                  href="#"
                  aria-current="page"
                  className={` ${
                    pageIdx === pageIndex
                      ? "bg-slate-900 dark:bg-slate-600  dark:text-slate-200 text-white font-medium "
                      : "bg-slate-100 dark:bg-slate-700 dark:text-slate-400 text-slate-900  font-normal  "
                  }    text-sm rounded leading-[16px] flex h-6 w-6 items-center justify-center transition-all duration-150`}
                  onClick={() => gotoPage(pageIdx)}
                >
                  {page + 1}
                </button>
              </li>
            ))}
            <li className="text-sm leading-4 text-slate-900 dark:text-white rtl:rotate-180">
              <button
                className={` ${
                  !canNextPage ? "opacity-50 cursor-not-allowed" : ""
                }`}
                onClick={() => nextPage()}
                disabled={!canNextPage}
              >
                Next
              </button>
            </li>
            <li className="text-xl leading-4 text-slate-900 dark:text-white rtl:rotate-180">
              <button
                onClick={() => gotoPage(pageCount - 1)}
                disabled={!canNextPage}
                className={` ${
                  !canNextPage ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                <Icon icon="heroicons:chevron-double-right-solid" />
              </button>
            </li>
          </ul>
        </div>
        {/*end*/}
      </Card>
      <LoadAssign
        loadAssignOpen={loadAssignOpen}
        setLoadAssignOpen={setLoadAssignOpen}
        assigmentData={assigmentData}
        // isEditOpen={isEditOpen}
      />

      <LoadView open={open} setOpen={setOpen} dovViewData={dovViewData} />

      <LoadCancel
        openLoadCancel={openLoadCancel}
        setOpenLoadCancel={setOpenLoadCancel}
        loadCancelData={loadCancelData}
      />

      {/* ------------------------------ Modal ---------------------------------------- */}
      <Modal
        title="Progress Confirmation"
        activeModal={modalOpen}
        onClose={closeModalHandler}
        uncontrol={false}
        centered
        // className="max-w-xl relative"
      >
        <div className="text-base text-slate-600 dark:text-slate-300 mt-4">
          Mark load in a Progress?
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
            onClick={handleProgress}
          >
            Submit
          </button>
        </div>
      </Modal>
    </>
  );
};

export default LoadAssigntTable;
