import React, { useState, useMemo, useEffect } from "react";
import Card from "@/components/ui/Card";
import Icon from "@/components/ui/Icon";
import Button from "@/components/ui/Button";
import Tooltip from "@/components/ui/Tooltip";

import {
  useTable,
  useRowSelect,
  useSortBy,
  useGlobalFilter,
  usePagination,
} from "react-table";

import BriefCaseFilter from "./BriefCaseFilter";
import { docManagementService } from "../../_services/docManagementService";
import DocView from "../documentManagement/DocView";
import { ShowErrorToast } from "../components/ToastMessage/ToastMessage";
import SkeletonTable from "@/components/skeleton/Table";

const BriefCase = () => {
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tenderForm, setTenderForm] = useState({
    document_month: "",
    document_year: "",
    driver_name: "",
    sub_folder_name: "",
  });
  const [viewId, setViewId] = useState(0);
  const [open, setOpen] = useState(false);
  const handleView = (viewData) => {
    setViewId(viewData?.row?.original?.driver_documents_id);
    setOpen(true);
  };

  useEffect(() => {
    setLoading(true);
    docListing();
  }, []);

  // isCreateDone, isEditDone, isDeleteDone

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
      setLoading(false);
    }
  };

  const handleSearch = () => {
    const filteredData = tableData.filter((item) => {
      return (
        (!tenderForm.document_month ||
          item.document_month.toLowerCase() ===
            tenderForm.document_month.toLowerCase()) &&
        (!tenderForm.document_year ||
          item.document_year === Number(tenderForm.document_year)) && // Compare as a number
        (!tenderForm.driver_name ||
          item.driver_name
            .toLowerCase()
            .includes(tenderForm.driver_name.toLowerCase().trim())) &&
        (!tenderForm.sub_folder_name ||
          item.sub_folder_name
            .toLowerCase()
            .includes(tenderForm.sub_folder_name.toLowerCase().trim()))
      );
    });

    setTableData(filteredData);
  };

  const handleClear = () => {
    setTenderForm({
      document_month: "",
      document_year: "",
      driver_name: "",
      sub_folder_name: "",
    });
    docListing(); // Re-fetch the full data list
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
          </div>
        );
      },
    },
  ];

  const columns = useMemo(() => COLUMNS, []);
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

  if (loading) {
    return (
      <Card noborder>
        <div className="md:flex pb-6 items-center">
          <h6 className="flex-1 md:mb-0 mb-3">BriefCase</h6>
        </div>
        <SkeletonTable columns={8} count={8} />
      </Card>
    );
  }

  return (
    <>
      <Card noborder>
        <div className="md:flex pb-6 items-center">
          <h6 className="flex-1 md:mb-0 mb-3">BriefCase</h6>
          <div className="md:flex md:space-x-4 items-center flex-none rtl:space-x-reverse ">
            <BriefCaseFilter
              filter={globalFilter}
              setFilter={setGlobalFilter}
              tableData={tableData}
              tenderForm={tenderForm}
              setTenderForm={setTenderForm}
            />

            <Button
              text="Search"
              className=" btn-dark font-normal btn-sm "
              iconClass="text-lg"
              onClick={() => handleSearch()}
            />
            <Button
              text="Clear"
              className="bg-emerald-500 hover:bg-emerald-600 text-white font-normal btn-sm"
              iconClass="text-lg"
              onClick={() => handleClear()}
            />
          </div>
        </div>
        <div className="overflow-x-auto -mx-6">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden ">
              <table
                className="min-w-full divide-y divide-slate-100 table-fixed dark:divide-slate-700"
                {...getTableProps}
              >
                <thead className=" border-t border-slate-100 dark:border-slate-800">
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
            <span className=" flex space-x-2  rtl:space-x-reverse items-center">
              <span className=" text-sm font-medium text-slate-600 dark:text-slate-300">
                Go
              </span>
              <span>
                <input
                  type="number"
                  className=" form-control py-2"
                  defaultValue={pageIndex + 1}
                  onChange={(e) => {
                    const pageNumber = e.target.value
                      ? Number(e.target.value) - 1
                      : 0;
                    gotoPage(pageNumber);
                  }}
                  style={{ width: "50px" }}
                />
              </span>
            </span>
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
                onClick={() => previousPage()}
                disabled={!canPreviousPage}
              >
                <Icon icon="heroicons-outline:chevron-left" />
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
            <li className="text-xl leading-4 text-slate-900 dark:text-white rtl:rotate-180">
              <button
                className={` ${
                  !canNextPage ? "opacity-50 cursor-not-allowed" : ""
                }`}
                onClick={() => nextPage()}
                disabled={!canNextPage}
              >
                <Icon icon="heroicons-outline:chevron-right" />
              </button>
            </li>
          </ul>
        </div>
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

export default BriefCase;
