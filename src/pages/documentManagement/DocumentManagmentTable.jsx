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
import { advancedTable } from "../../constant/table-data";
import PaginationWithClientSide from "../../components/Pagination/PaginationWithClientSide";
import DocView from "./DocView";
import useGetDriverListing from "../../hooks/useDriverListing";

const DocumentManagmentTable = ({
  title = "Document Management System",
  tableData,
}) => {
  const [viewId, setViewId] = useState(0);

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
    // {
    //   Header: "customer",
    //   accessor: "customer",
    //   Cell: (row) => {
    //     return (
    //       <div>
    //         <span className="inline-flex items-center">
    //           <span className="w-7 h-7 rounded-full ltr:mr-3 rtl:ml-3 flex-none bg-slate-600">
    //             <img
    //               src={row?.cell?.value.image}
    //               alt=""
    //               className="object-cover w-full h-full rounded-full"
    //             />
    //           </span>
    //           <span className="text-sm text-slate-600 dark:text-slate-300 capitalize">
    //             {row?.cell?.value.name}
    //           </span>
    //         </span>
    //       </div>
    //     );
    //   },
    // },
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
        console.log(row, "........");
        return <span>{row?.cell?.value}</span>;
      },
    },
    {
      Header: "Document Year",
      accessor: "document_year",
      Cell: (row) => {
        console.log(row, "........");
        return <span>{row?.cell?.value}</span>;
      },
    },
    // {
    //   Header: "Date/Time",
    //   accessor: "status",
    //   Cell: (row) => {
    //     return (
    //       <span className="block w-full">
    //         <span
    //           className={` inline-block px-3 min-w-[90px] text-center mx-auto py-1 rounded-[999px] bg-opacity-25 ${
    //             row?.cell?.value === "paid"
    //               ? "text-success-500 bg-success-500"
    //               : ""
    //           }
    //         ${
    //           row?.cell?.value === "due"
    //             ? "text-warning-500 bg-warning-500"
    //             : ""
    //         }
    //         ${
    //           row?.cell?.value === "cancled"
    //             ? "text-danger-500 bg-danger-500"
    //             : ""
    //         }

    //          `}
    //         >
    //           {row?.cell?.value}
    //         </span>
    //       </span>
    //     );
    //   },
    // },
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
              content="Edit"
              placement="top"
              arrow
              animation="shift-away"
            >
              <button className="action-btn" type="button">
                <Icon icon="heroicons:pencil-square" />
              </button>
            </Tooltip>
            <Tooltip
              content="Delete"
              placement="top"
              arrow
              animation="shift-away"
              theme="danger"
            >
              <button className="action-btn" type="button">
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
    </>
  );
};

export default DocumentManagmentTable;
