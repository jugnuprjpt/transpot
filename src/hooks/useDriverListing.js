import { useEffect, useState } from "react";
import { ShowErrorToast } from "../pages/components/ToastMessage/ToastMessage";
import { docManagementService } from "../_services/docManagementService";

const useGetDriverListing = () => {
  const [driverData, setDriverData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchDealerData = async () => {
    setIsLoading(true);
    try {
      const res = await docManagementService.driverListing();
      if (res.Success === true) {
        const resData = res.Data.map((data) => ({
          value: data?.user_id,
          label: `${data.first_name} ${data.last_name}`,
        }));

        setDriverData(resData);
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
    driverData,
    isLoading,
    error,
    refetchDealerData: fetchDealerData,
  };
};

export default useGetDriverListing;
