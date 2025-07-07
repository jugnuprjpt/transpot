import React, { useState, useMemo, Fragment } from "react";

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

import { Tab } from "@headlessui/react";
import GlobalFilter from "../table/react-tables/GlobalFilter";
import LoadAssign from "./LoadAssign";
import LoadView from "./LoadView";
import { loadManagementService } from "../../_services/loadManagementService";
import LoadCancel from "./LoadCancel";
import { ShowErrorToast } from "../components/ToastMessage/ToastMessage";

const LoadPendingTable = ({
  title = "Load Pending",
  tableData,
  isEditOpen,
  openLoadCancel,
  setOpenLoadCancel,
  loadCancelData,
  setLoadCancelData,
  setTableData,
}) => {
  // ✅ Format date to YYYY-MM-DD
  const formatDate = (date) => date.toISOString().split("T")[0];

  // ✅ Get day name like "Monday", "Tuesday", etc.
  const getDayName = (date) =>
    date.toLocaleDateString("en-US", { weekday: "long" });

  // ✅ Date objects
  const todayDate = new Date();

  const tomorrowDate = new Date();
  tomorrowDate.setDate(todayDate.getDate() + 1);

  const dayAfterTomorrowDate = new Date();
  dayAfterTomorrowDate.setDate(todayDate.getDate() + 2);

  // ✅ Final Pendingbuttons array
  const Pendingbuttons = [
    {
      title: "All",
      icon: "heroicons-outline:chat-alt-2",
      status: "",
    },
    {
      title: "Today",
      icon: "heroicons-outline:home",
      status: formatDate(todayDate),
    },
    {
      title: "Tomorrow",
      icon: "heroicons-outline:user",
      status: formatDate(tomorrowDate),
    },
    {
      title: getDayName(dayAfterTomorrowDate),
      icon: "heroicons-outline:cog",
      status: formatDate(dayAfterTomorrowDate),
    },
  ];

  const [tabId, setTabId] = useState(0);
  const [loadAssignOpen, setLoadAssignOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [dovViewData, setDocViewData] = useState([]);

  const [assigmentData, setAssigmentData] = useState([]);

  const handleDeleteClick = (data) => {
    console.log(data, "data..........");
    setLoadCancelData(data?.original);
    setOpenLoadCancel(true);
  };

  const handleAssign = async (data) => {
    setLoadAssignOpen(true);
    const formData = {
      load_id: data?.original?.load_id,
      load_number: data?.original?.load_number,
    };
    const res = await loadManagementService.loadAssigment(formData);
    setAssigmentData(res.Data);
  };
  const handleView = (data) => {
    setOpen(true);
    setDocViewData(data.original);
  };

  const handleButtonClick = async (title, index) => {
    setTabId(index);
    const statusId = Pendingbuttons[index]?.status;

    try {
      const res = await loadManagementService.pendingAll(statusId);
      if (res.Success) {
        setTableData(res.Data);
      } else {
        // setTableData([]);
        ShowErrorToast("Something went wrong");
      }
    } catch (error) {
      console.error("Error:", error);
      ShowErrorToast("API Error");
    }
  };

  const COLUMNS = [
    {
      Header: "load Id",
      accessor: "load_id",
      Cell: (row) => {
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
    // {
    //   Header: "action",
    //   accessor: "action",
    //   Cell: (row) => {
    //     return (
    //       <div className="flex space-x-3 rtl:space-x-reverse">
    //         <Tooltip
    //           content="View"
    //           placement="top"
    //           arrow
    //           animation="shift-away"
    //         >
    //           <button
    //             className="action-btn"
    //             type="button"
    //             onClick={() => handleView(row)}
    //           >
    //             <Icon icon="heroicons:eye" />
    //           </button>
    //         </Tooltip>
    //         <Tooltip
    //           content="Assign Load"
    //           placement="top"
    //           arrow
    //           animation="shift-away"
    //         >
    //           <button
    //             className="action-btn"
    //             type="button"
    //             onClick={() => handleAssign(row)}
    //           >
    //             <Icon icon="heroicons:user" />
    //           </button>
    //         </Tooltip>

    //         <Tooltip
    //           content="Cancel"
    //           placement="top"
    //           arrow
    //           animation="shift-away"
    //           theme="danger"
    //         >
    //           <button
    //             className="action-btn"
    //             type="button"
    //             onClick={() => handleDeleteClick(row)}
    //           >
    //             <Icon icon="heroicons:x-mark" />
    //           </button>
    //         </Tooltip>
    //       </div>
    //     );
    //   },
    // },
  ];

  const columns = useMemo(() => COLUMNS, []);
  // const data = useMemo(() => tableData, [tableData]);
  const modifiedData = useMemo(() => {
    return tableData.map((item, index) => ({
      ...item,
      sequenceNumber: index + 1,
    }));
  }, [tableData]);

  const data = useMemo(() => modifiedData, [modifiedData]);

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
          {/* <h4 className="card-title">{title}</h4> */}
          <Tab.Group defaultIndex={0}>
            <Tab.List className="lg:space-x-8 md:space-x-4 space-x-0 rtl:space-x-reverse border-b border-[#d7d7d7] mb-[10px]">
              {Pendingbuttons.map((item, i) => (
                <Tab as={Fragment} key={i}>
                  {({ selected }) => (
                    <button
                      className={`sm:text-[15px] md:text-[15px] lg:text-[15px] xl:text-[15px] 2xl:text-lg font-medium mb-2 capitalize 
            dark:bg-slate-800 ring-0 foucs:ring-0 focus:outline-none px-2
            transition duration-150 before:transition-all  before:duration-150 relative 
            before:absolute before:left-1/2 before:bottom-[-9px] before:h-[2px] before:bg-[#46ab27]
            before:-translate-x-1/2
            ${
              selected
                ? "text-[#46ab27] before:w-full"
                : "text-[#000] before:w-0 dark:text-slate-300"
            }`}
                      onClick={() => handleButtonClick(item.title, i)}
                    >
                      {item.title}
                    </button>
                  )}
                </Tab>
              ))}
            </Tab.List>
          </Tab.Group>

          <div>
            <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
          </div>
        </div>
        <div className="overflow-x-auto -mx-6">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden ">
              {/* Table header only (no body content here) */}
              <table
                className="min-w-full divide-y divide-slate-100 table-fixed dark:divide-slate-700"
                {...getTableProps()}
              >
                {/* <thead className="bg-slate-200 dark:bg-slate-700">
                  {headerGroups.map((headerGroup) => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                      {headerGroup.headers.map((column) => (
                        <th
                          {...column.getHeaderProps(
                            column.getSortByToggleProps()
                          )}
                          scope="col"
                          className="table-th"
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
                </thead> */}
              </table>

              {/* Custom cards rendered below the table */}
              <div className="px-4 mt-4">
                <div className="flex flex-col gap-4 w-full">
                  {page.map((row) => {
                    prepareRow(row);
                    const original = row.original;

                    return (
                      <div
                        key={original.load_id}
                        className="w-full rounded border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-sm text-sm text-gray-800 dark:text-gray-200"
                      >
                        {/* Main Content: Status | Route | Driver Info */}
                        <div className="flex justify-between items-center px-4 py-3 bg-gray-50 dark:bg-slate-700">
                          {/* Left: Status */}
                          <div className="text-xs font-medium text-gray-600 dark:text-gray-300 w-1/5">
                            Load Number :-
                            <span className="font-medium text-red-500">
                              {original.load_number}
                            </span>
                          </div>

                          {/* Center: Route Info */}
                          <div className="flex-1 mx-4 bg-gray-100 dark:bg-slate-600 px-4 py-2 rounded flex items-center justify-between">
                            {/* From */}
                            <div>
                              <div className="text-sm font-semibold uppercase">
                                {original.source}
                              </div>
                              <div className="text-xs text-gray-500">
                                {original.shipping_date}
                              </div>
                            </div>

                            {/* Arrow */}
                            <div className="text-xl text-gray-400">→</div>

                            {/* To */}
                            <div className="text-right">
                              <div className="text-sm font-semibold uppercase">
                                {original.destination}
                              </div>
                              <div className="text-xs text-gray-500">
                                {original.delivery_date}
                              </div>
                            </div>
                          </div>

                          {/* Right: Driver + Tractor */}
                          <div className="flex flex-col items-end gap-1 text-sm w-1/5">
                            <div>
                              <span className="text-gray-500">Driver:</span>{" "}
                              <span className="font-medium">
                                {original.driver_name || "--"}
                              </span>
                            </div>
                            <div>
                              <span className="text-gray-500">Trailer #:</span>{" "}
                              <span className="font-semibold">
                                {original.trailer_used || "--"}
                              </span>
                            </div>
                            <div>
                              <span className="text-gray-500">Rate #:</span>{" "}
                              <span className="font-semibold">
                                {original.base_price}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Footer: Load ID + Action Buttons */}
                        <div className="flex justify-between items-center px-4 py-2 border-t border-gray-200 dark:border-slate-700 text-xs">
                          <div className="text-gray-500">
                            {/* Rate:{" "}
                            <span className="font-medium text-red-500">
                              {original.base_price}
                            </span> */}
                          </div>

                          <div className="flex gap-2">
                            <Tooltip content="View" placement="top">
                              <button
                                className="p-1.5 rounded-full hover:bg-blue-100 dark:hover:bg-slate-600 transition"
                                onClick={() => handleView(row)}
                              >
                                <Icon
                                  icon="heroicons:eye"
                                  className="w-5 h-5 text-blue-600"
                                />
                              </button>
                            </Tooltip>
                            <Tooltip content="Assign Load" placement="top">
                              <button
                                className="p-1.5 rounded-full hover:bg-green-100 dark:hover:bg-slate-600 transition"
                                onClick={() => handleAssign(row)}
                              >
                                <Icon
                                  icon="heroicons:user"
                                  className="w-5 h-5 text-green-600"
                                />
                              </button>
                            </Tooltip>
                            <Tooltip
                              content="Cancel"
                              placement="top"
                              theme="danger"
                            >
                              <button
                                className="p-1.5 rounded-full hover:bg-red-100 dark:hover:bg-slate-600 transition"
                                onClick={() => handleDeleteClick(row)}
                              >
                                <Icon
                                  icon="heroicons:x-mark"
                                  className="w-5 h-5 text-red-600"
                                />
                              </button>
                            </Tooltip>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
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
        isEditOpen={isEditOpen}
      />

      <LoadView open={open} setOpen={setOpen} dovViewData={dovViewData} />

      <LoadCancel
        openLoadCancel={openLoadCancel}
        setOpenLoadCancel={setOpenLoadCancel}
        loadCancelData={loadCancelData}
      />
    </>
  );
};

export default LoadPendingTable;
