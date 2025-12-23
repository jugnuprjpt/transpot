import React, { useState, Fragment, useEffect } from "react";
import Icon from "@/components/ui/Icon";
import Button from "@/components/ui/Button";
import { Tab } from "@headlessui/react";
import Card from "@/components/ui/Card";

import { loadManagementService } from "../../_services/loadManagementService";
import { ShowErrorToast } from "../components/ToastMessage/ToastMessage";
import InvoicePending from "./InvoicePending";
import InvoiceComplete from "./InvoiceComplete";
import InvoiceInvoiced from "./InvoiceInvoiced";
import SkeletonTable from "@/components/skeleton/Table";

const buttons = [
  {
    title: "Pending",
    icon: "heroicons-outline:chat-alt-2",
    status: false,
  },

  {
    title: "Invoiced",
    icon: "heroicons-outline:cog",
    status: true,
  },

  {
    title: "Complete",
    icon: "heroicons-outline:cog",
    // status: null,
  },
];

const InvoiceTabbar = () => {
  //   const { id } = useParams();
  const [tableData, setTableData] = useState([]);
  const [tabId, setTabId] = useState(0);
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);
  const [tenderCount, setTenderCount] = useState({
    Fresh: 0,
    Live: 0,
  });

  const [open, setOpen] = useState(false);
  const [pendingData, setPendingData] = useState([]);
  const [tenderForm, setTenderForm] = useState({
    //   ...defaultTenderData,
    tender_id: "",
  });
  const [apidata, setApidata] = useState();

  const [isSearch, setIsSearch] = useState(0);

  const handleView = (data) => {
    setPendingData(data.row.original);
    setOpen(true);
  };

  // const handleButtonClick = (title) => {
  //   setPage(1);
  //   setHasMore(true);
  // };

  useEffect(() => {
    handleButtonClick("Pending", 0);
  }, []);
  // Keep this after
  const handleButtonClick = async (title, index) => {
    setLoading(true);
    setTabId(index);
    const statusId = buttons[index]?.status;

    console.log(statusId, "st..........");

    console.log(index, "statusId from button");

    try {
      let res;
      if (statusId !== undefined) {
        res = await loadManagementService.invoicePendingInvoiced(statusId);
      } else {
        res = await loadManagementService.invoiceComplete(); // no statusId for "Complete"
      }

      if (res.Success) {
        setTableData(res.Data);
        setLoading(false);
      } else {
        setTableData([]);
        setLoading(false);
        ShowErrorToast("Something went wrong");
      }
    } catch (error) {
      console.error("Error:", error);
      setLoading(false);
      ShowErrorToast("API Error");
    }
  };

  const handleSubmit = () => {
    setApidata(tenderForm);
    setIsSearch((prevIsSearch) => prevIsSearch + 1);
    setPage(1);
  };

  return (
    <div>
      {/* <div className="text-[20px] font-bold text-[#000] mb-[20px]">Tender</div> */}

      <Card className="!bg-transparent !shadow-none space-y-5 ">
        <Tab.Group defaultIndex={tabId == undefined ? 1 : tabId - 1}>
          <Tab.List className="lg:space-x-8 md:space-x-4 space-x-0 rtl:space-x-reverse border-b border-[#d7d7d7] mb-[10px]">
            {buttons.map((item, i) => (
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
                        {item.title === "Pending"}
                        {item.title === "Invoiced"}
                        {item.title === "Complete"}
                      </span>
                    )}
                  </button>
                )}
              </Tab>
            ))}
          </Tab.List>

          <Tab.Panels>
            <Tab.Panel>
              {loading ? (
                <SkeletonTable columns={7} count={8} />
              ) : (
                <InvoicePending
                  tableData={tableData}
                  handleView={handleView}
                  open={open}
                  setOpen={setOpen}
                  pendingData={pendingData}
                />
              )}
            </Tab.Panel>
            <Tab.Panel>
              {loading ? (
                <SkeletonTable columns={7} count={8} />
              ) : (
                <InvoiceInvoiced
                  tableData={tableData}
                  handleView={handleView}
                  open={open}
                  setOpen={setOpen}
                  pendingData={pendingData}
                />
              )}
            </Tab.Panel>

            <Tab.Panel>
              {loading ? (
                <SkeletonTable columns={7} count={8} />
              ) : (
                <InvoiceComplete
                  tableData={tableData}
                  handleView={handleView}
                  open={open}
                  setOpen={setOpen}
                  pendingData={pendingData}
                />
              )}
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </Card>
    </div>
  );
};

export default InvoiceTabbar;
