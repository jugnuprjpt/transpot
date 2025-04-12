import { useEffect, useState } from "react";
import { ShowErrorToast } from "../pages/components/ToastMessage/ToastMessage";
import { docManagementService } from "../_services/docManagementService";

const useBriefSearch = () => {
  const [briefYearData, setBriefYearData] = useState([]);
  const [briefMonthData, setBriefMonthData] = useState([]);
  const [briefDriverData, setBriefDriverData] = useState([]);
  const [briefSubfolderData, setBriefSubfolderData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchDealerData = async () => {
    setIsLoading(true);
    try {
      const res = await docManagementService.docManagementListing();

      if (res.Success === true) {
        const monthData = res.Data.map((data) => ({
          value: data?.document_month,
          label: data?.document_month,
        }));
        const yearData = res.Data.map((data) => ({
          value: data?.document_year,
          label: data?.document_year,
        }));
        const driverData = res.Data.map((data) => ({
          value: data?.driver_name,
          label: data?.driver_name,
        }));
        const subfolderData = res.Data.map((data) => ({
          value: data?.sub_folder_name,
          label: data?.sub_folder_name,
        }));

        setBriefYearData(yearData);
        setBriefMonthData(monthData);
        setBriefDriverData(driverData);
        setBriefSubfolderData(subfolderData);
      } else {
        ShowErrorToast(res.Message);
      }
    } catch (error) {
      ShowErrorToast(error.Message);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchDealerData();
  }, []); // Fetch data only on initial mount

  return {
    briefMonthData,
    briefYearData,
    briefDriverData,
    briefSubfolderData,
    isLoading,
    error,
    refetchDealerData: fetchDealerData,
  };
};

export default useBriefSearch;
