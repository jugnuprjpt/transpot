import { useEffect, useState } from "react";
import { ShowErrorToast } from "../pages/components/ToastMessage/ToastMessage";
import axios from "axios";

const useGetDriverListing = () => {
  const [driverData, setDriverData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const token = localStorage.getItem("token");

  const fetchDealerData = async () => {
    setIsLoading(true);
    try {
      const url = `https://c2f5-2409-40c2-129c-f4b3-c4a6-b07-8fee-ab8e.ngrok-free.app/api/user/get`;

      const res = await axios.get(url, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });

      if (res.data.Success) {
        const resData = res.data.Data.map((data) => ({
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
