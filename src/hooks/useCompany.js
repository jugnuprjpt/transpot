import { useEffect, useState } from "react";
import { ShowErrorToast } from "../pages/components/ToastMessage/ToastMessage";
import { docManagementService } from "../_services/docManagementService";

const useCompany = () => {
  const [companyData, setComapnayData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchDealerData = async () => {
    setIsLoading(true);
    try {
      const res = await docManagementService.companyListing();
      if (res.Success === true) {
        const resData = res.Data.map((data) => ({
          value: data?.company_id,
          label: data?.company_name,
        }));

        setComapnayData(resData);
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
    companyData,
    isLoading,
    error,
    refetchDealerData: fetchDealerData,
  };
};

export default useCompany;
