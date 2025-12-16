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
import LoadView from "./LoadView";

import LoadTonuDrawer from "./LoadTonuDrawer";
import RequestToInvoice from "../InvoiceManagement/RequestToInvoice";
import { loadManagementService } from "../../_services/loadManagementService";

const LoadTonuTable = ({
  title = "Tonu",
  tableData,
  openLoadCancel,
  setOpenLoadCancel,
  loadCancelData,
  setLoadCancelData,
}) => {
  const [allData, setAllData] = useState({
    driver_name: "",
    driver_id: "",
    load_id: 0,
    load_number: "",
    lumper_value: 0,
    lumper_paid_by: "",
    detention_value: 0,
    scale_value: 0,
    extra_stop_charge: 0,
    trailer_wash: 0,
    detention_at: "",
    company_id: "",
    amount: 0,
    layover: "",
    roc: "",
  });
  const [open, setOpen] = useState(false);
  const [dovViewData, setDocViewData] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);

  const [showData, setShowData] = useState([]);

  const [openRequest, setOpenRequest] = useState(false);
  const [requestToInvoiceData, setRequestToInvoiceData] = useState(null);

  const [openComplate, setOpenComplate] = useState(false);
  const [getProgressData, setGetProgressData] = useState([]);

  const handleComplated = (data) => {
    setGetProgressData(data?.original);
    setOpenComplate(true);
  };

  const handleRequest = async (data) => {
    setOpenRequest(true);
    setRequestToInvoiceData(data.original);
    // handleRequestToInvoice();

    const res = await loadManagementService.requestToInvoiceId(
      data.original.load_id
    );

    if (res.Success === true) {
      setAllData({
        // ...res?.Data,
        lumper_value: res?.Data?.lumperValue,
        layover: res?.Data?.layover,
        detention_value: res?.Data?.detentionValue,
        trailer_wash: res?.Data?.trailerWashValue,
        scale_value: res?.Data?.scaleValue,
        extra_stop_charge: res?.Data?.extraStopCharge,
        amount: data.original?.base_price,
      });
      setShowData(res.Data);

      // setRequestToInvoiceData(res.Data);
    } else {
      ShowErrorToast(res.Message);
    }
  };

  const handleView = (data) => {
    setOpen(true);
    setDocViewData(data.original);
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

            <Tooltip
              content="Request to Tonu"
              placement="top"
              arrow
              animation="shift-away"
            >
              <button
                className="action-btn"
                type="button"
                onClick={() => handleComplated(row)}
              >
                <Icon icon="heroicons:cog" />
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
                            {row.original.tonu === true && (
                              <Tooltip
                                content="Request to Tonu"
                                placement="top"
                              >
                                <button
                                  className="p-1.5 rounded-full hover:bg-green-100 dark:hover:bg-slate-600 transition"
                                  onClick={() => handleComplated(row)}
                                >
                                  <Icon
                                    icon="heroicons:truck"
                                    className="w-5 h-5 text-green-600"
                                  />
                                </button>
                              </Tooltip>
                            )}
                            {row.original.tonu === false && (
                              <Tooltip
                                content="Request to Invoice"
                                placement="top"
                              >
                                <button
                                  className="p-1.5 rounded-full hover:bg-green-100 dark:hover:bg-slate-600 transition"
                                  onClick={() => handleRequest(row)}
                                >
                                  <Icon
                                    icon="heroicons:cog"
                                    className="w-5 h-5 text-green-600"
                                  />
                                </button>
                              </Tooltip>
                            )}
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
      <LoadView open={open} setOpen={setOpen} dovViewData={dovViewData} />
      <LoadTonuDrawer
        openComplate={openComplate}
        setOpenComplate={setOpenComplate}
        getProgressData={getProgressData}
      />
      <RequestToInvoice
        openRequest={openRequest}
        setOpenRequest={setOpenRequest}
        requestToInvoiceData={requestToInvoiceData}
        allData={allData}
        setAllData={setAllData}
        showData={showData}
      />
    </>
  );
};

export default LoadTonuTable;
