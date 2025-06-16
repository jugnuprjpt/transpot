import React, { useState, Fragment, useEffect } from "react";
import Icon from "@/components/ui/Icon";
import Button from "@/components/ui/Button";
import { Tab } from "@headlessui/react";
import Card from "@/components/ui/Card";
import LoadManagmentTable from "./LoadAssigntTable";
import LoadAssigntTable from "./LoadAssigntTable";
import LoadInprogressTable from "./LoadInprogressTable";
import LoadPendingTable from "./LoadPendingTable";
import LoadComplateTable from "./LoadComplateTable";
import { loadManagementService } from "../../_services/loadManagementService";
import { ShowErrorToast } from "../components/ToastMessage/ToastMessage";
import LoadCancel from "./LoadCancel";

const LoadTabbar = ({
  buttons,
  handleButtonClick,
  tabId,
  setTabId,
  tableData,
}) => {
  //   const { id } = useParams();

  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [tenderCount, setTenderCount] = useState({
    Fresh: 0,
    Live: 0,
    Archive: 0,
    Interested: 0,
  });
  const [tenderForm, setTenderForm] = useState({
    //   ...defaultTenderData,
    tender_id: "",
  });
  const [apidata, setApidata] = useState();

  const [isSearch, setIsSearch] = useState(0);

  const [tenderData, setTenderData] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [isFilter, setIsFilter] = useState(0);

  const [openLoadCancel, setOpenLoadCancel] = useState([]);

  const [loadCancelData, setLoadCancelData] = useState([]);

  const toggleAccordion = () => {
    setOpen(!open);
  };

  const handleClear = () => {
    //     setPage(1);
    //     setApidata(defaultTenderData2);
    //     setStateTag([]);
    //     setHasMore(true);
    //     setTenderForm({
    //       ...defaultTenderData,
    //       tender_id: "",
    //       page_no: 1,
    //       record_per_page: 20,
    //     });
    //     setcityTag([]);
    //     setKeywordTag([]);
    //     setInputValue("");
    //     setOrganizationTag([]);
    //     setIsSearch(0);
    //     setText("");
    //     setCityText("");
  };

  // const handleButtonClick = (title) => {
  //   setPage(1);
  //   setHasMore(true);
  // };

  // useEffect(() => {
  //   handleButtonClick("Pending", 0);
  // }, []);
  // // Keep this after
  // const handleButtonClick = async (title, index) => {
  //   setTabId(index);
  //   const statusId = buttons[index]?.status;

  //   console.log(index, "statusId from button");

  //   try {
  //     const res = await loadManagementService.loadManagementListingByStatus(
  //       statusId
  //     );
  //     if (res.Success) {
  //       setTableData(res.Data);
  //     } else {
  //       setTableData([]);
  //       ShowErrorToast("Something went wrong");
  //     }
  //   } catch (error) {
  //     console.error("Error:", error);
  //     ShowErrorToast("API Error");
  //   }
  // };

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
                        {item.title === "Assigned"}
                        {item.title === "In Progress"}
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
              <LoadPendingTable
                tableData={tableData}
                openLoadCancel={openLoadCancel}
                setOpenLoadCancel={setOpenLoadCancel}
                loadCancelData={loadCancelData}
                setLoadCancelData={setLoadCancelData}
              />
            </Tab.Panel>

            <Tab.Panel>
              <LoadAssigntTable
                tableData={tableData}
                openLoadCancel={openLoadCancel}
                setOpenLoadCancel={setOpenLoadCancel}
                loadCancelData={loadCancelData}
                setLoadCancelData={setLoadCancelData}
              />
            </Tab.Panel>
            <Tab.Panel>
              <LoadInprogressTable
                tableData={tableData}
                openLoadCancel={openLoadCancel}
                setOpenLoadCancel={setOpenLoadCancel}
                loadCancelData={loadCancelData}
                setLoadCancelData={setLoadCancelData}
              />
            </Tab.Panel>

            <Tab.Panel>
              <LoadComplateTable tableData={tableData} />
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </Card>
    </div>
  );
};

export default LoadTabbar;
