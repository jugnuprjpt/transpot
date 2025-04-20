import { http } from "../_apiConfig/http";
import { RouteUrls } from "../_apiConfig/routeUrls";

export const loadManagementService = {
  loadManagementListing,
  loadManagementListingByStatus,
  driverListing,
  documentInsert,
  loadInsert,
};

function loadManagementListing() {
  return http.get(RouteUrls.loadManagementListing, true);
}

function loadManagementListingByStatus(data) {
  return http.get(`${RouteUrls.loadManagementListingByStatus}/${data}`, true);
}

function driverListing() {
  return http.get(RouteUrls.driverListing, true);
}

function documentInsert(data) {
  return http.post(`${RouteUrls.documentInsert}`, data, true, {
    "Content-Type": "multipart/form-data",
  });
}
function loadInsert(data) {
  return http.post(`${RouteUrls.loadInsert}`, data, true, {
    "Content-Type": "multipart/form-data",
  });
}
