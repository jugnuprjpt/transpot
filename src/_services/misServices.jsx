import { http } from "../_apiConfig/http";
import { RouteUrls } from "../_apiConfig/routeUrls";
import api from "../_apiConfig/baseapi";
export const misServices = {
  misFinanceSearchCount,
  misFinanceSearch,
  misReportDownload,
  getAllSalesMis,
  getAllLoginMis,
  getTenderAssignSales,
};

function getAllLoginMis() {
  return http.get(RouteUrls.getAllLoginMis, true);
}

function getAllSalesMis(data) {
  return http.post(RouteUrls.getAllSalesMis, data, true);
}

function getTenderAssignSales(data) {
  return http.post(RouteUrls.getTenderAssignSales, data, true);
}

function misFinanceSearchCount(data) {
  return http.post(RouteUrls.misFinanceSearchCount, data, true);
}
function misFinanceSearch(data) {
  return http.post(RouteUrls.misFinanceSearch, data, true);
}
async function misReportDownload(data) {
  const response = await fetch(
    `${api.defaults.baseURL}${RouteUrls.misReportDownload}`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json", // Adjust content type as per your requirement
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data), // Serialize data to JSON format if needed
      body: JSON.stringify(data),
    }
  );
  return response;
}
