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

const LoadPendingTable = ({
  title = "Load Pending",
  tableData,
  isEditOpen,
  openLoadCancel,
  setOpenLoadCancel,
  loadCancelData,
  setLoadCancelData,
}) => {
  // {item.title === "All"}
  //                     {item.title === "Today"}
  //                     {item.title === "Tomorrow"}
  //                     {item.title === "Saturday"}
  const Pendingbuttons = [
    {
      title: "All",
      icon: "heroicons-outline:chat-alt-2",
      status: 1,
    },
    {
      title: "Today",
      icon: "heroicons-outline:home",
      status: 2,
    },
    {
      title: "Tomorrow",
      icon: "heroicons-outline:user",
      status: 3,
    },

    {
      title: "Saturday",
      icon: "heroicons-outline:cog",
      status: 4,
    },
  ];
  const [tabId, setTabId] = useState(0);
  const [loadAssignOpen, setLoadAssignOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [dovViewData, setDocViewData] = useState([]);

  const [assigmentData, setAssigmentData] = useState([]);

  const handleDeleteClick = (data) => {
    setLoadCancelData(data?.row?.original);
    setOpenLoadCancel(true);
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
  const handleView = (data) => {
    setOpen(true);
    setDocViewData(data.row.original);
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
              content="Assign Load"
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
          <Tab.Group defaultIndex={tabId == undefined ? 1 : tabId - 1}>
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
              }
              `}
                      onClick={() => handleButtonClick(item.title, i)}
                    >
                      {item.title}

                      {selected && (
                        <span className="ml-2">
                          {item.title === "All"}
                          {item.title === "Today"}
                          {item.title === "Tomorrow"}
                          {item.title === "Saturday"}
                        </span>
                      )}
                    </button>
                  )}
                </Tab>
              ))}
            </Tab.List>

            <Tab.Panels>
              <Tab.Panel>ghdhgf</Tab.Panel>

              <Tab.Panel>bgdgdffgd</Tab.Panel>
              <Tab.Panel>gfhfhf</Tab.Panel>

              <Tab.Panel>bhbj</Tab.Panel>
            </Tab.Panels>
          </Tab.Group>
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
