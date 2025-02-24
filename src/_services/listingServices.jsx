import { http } from "../_apiConfig/http";
import { RouteUrls } from "../_apiConfig/routeUrls";

export const listingServices = {
  getSearchTender,
  getTenderResultSearch,
  getSearchTenderCount,
  getSearchTendeResultCount,
};

function getSearchTender(data) {
  return http.post(RouteUrls.getSearchTender, data, true);
}
function getSearchTenderCount(data) {
  return http.post(RouteUrls.getTenderCount, data, true);
}
function getSearchTendeResultCount(data) {
  return http.post(RouteUrls.getTenderResultCount, data, true);
}
function getTenderResultSearch(data) {
  return http.post(RouteUrls.getTenderResultSearch, data, true);
}
