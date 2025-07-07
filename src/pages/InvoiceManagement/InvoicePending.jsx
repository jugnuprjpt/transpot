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
import InvoiceView from "./InvoiceView";
import Modal from "../../components/ui/Modal";
import {
  ShowErrorToast,
  ShowSuccessToast,
} from "../components/ToastMessage/ToastMessage";
import { loadManagementService } from "../../_services/loadManagementService";
import RequestToInvoice from "./RequestToInvoice";
// import RequestToInvoice from "./RequestToInvoice";

const InvoicePending = ({
  title = "Invoice Pending",
  tableData,
  handleView,
  open,
  setOpen,
  pendingData,
}) => {
  // const [openRequest, setOpenRequest] = useState(false);
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

  const [openRequest, setOpenRequest] = useState(false);
  const [showData, setShowData] = useState([]);
  const [requestToInvoiceData, setRequestToInvoiceData] = useState(null);

  const handleRequest = async (data) => {
    setOpenRequest(true);
    setRequestToInvoiceData(data.row.original);
    // handleRequestToInvoice();

    const res = await loadManagementService.requestToInvoiceId(
      data.row.original.load_id
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
        amount: data.row.original?.base_price,
      });
      setShowData(res.Data);
      // setRequestToInvoiceData(res.Data);
    } else {
      ShowErrorToast(res.Message);
    }
  };

  const COLUMNS = [
    {
      Header: "load Number",
      accessor: "loadNumber",
      Cell: (row) => {
        console.log(row, "row.");
        return <span>{row?.cell?.value}</span>;
      },
    },
    {
      Header: "Company Name",
      accessor: "companyName",
      Cell: (row) => {
        return <span>{row?.cell?.value}</span>;
      },
    },

    {
      Header: "Driver Name",
      accessor: "driverName",
      Cell: (row) => {
        return <span>{row?.cell?.value}</span>;
      },
    },
    {
      Header: "Invoice Number",
      accessor: "invoiceNumber",
      Cell: (row) => {
        return <span>{row?.cell?.value}</span>;
      },
    },
    {
      Header: "Invoice Date",
      accessor: "invoiceDate",
      Cell: (row) => {
        return <span>{row?.cell?.value}</span>;
      },
    },

    {
      Header: "status",
      accessor: "paymentStatus",
      Cell: (row) => {
        return (
          <span className="block w-full">
            <span
              className={` inline-block px-3 min-w-[90px] text-center mx-auto py-1 rounded-[999px] bg-opacity-25 ${
                row?.cell?.value === "Pending"
                  ? "text-warning-500 bg-warning-500"
                  : ""
              }
            ${
              row?.cell?.value === "complete"
                ? "text-success-500 bg-success-500"
                : ""
            }
            ${
              row?.cell?.value === "cancled"
                ? "text-danger-500 bg-danger-500"
                : ""
            }

             `}
            >
              {row?.cell?.value}
            </span>
          </span>
        );
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
              content="Request To Invoice"
              placement="top"
              arrow
              animation="shift-away"
            >
              <button
                className="action-btn"
                type="button"
                onClick={() => handleRequest(row)}
              >
                <Icon icon="heroicons:banknotes" />
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
      <InvoiceView pendingData={pendingData} open={open} setOpen={setOpen} />
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

export default InvoicePending;
