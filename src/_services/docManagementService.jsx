import { http } from "../_apiConfig/http";
import { RouteUrls } from "../_apiConfig/routeUrls";

export const docManagementService = {
  docManagementListing,
  driverListing,
  documentInsert,

  profileInsert,
  // profileId,
  profileDelete,

  profileDataInsert,
  profileDataId,
  profileDataUpdate,
  profileDataDelete,
};

function docManagementListing() {
  return http.get(RouteUrls.docManagementListing, true);
}

function driverListing() {
  return http.get(RouteUrls.driverListing, true);
}

function documentInsert(data) {
  return http.post(`${RouteUrls.documentInsert}`, data, true, {
    "Content-Type": "multipart/form-data",
  });
}

function profileId(data) {
  const encodedData = encodeURIComponent(data);
  return http.get(`${RouteUrls.profileId}/${encodedData}`, true);
}
function profileInsert(data) {
  const encodedData = encodeURIComponent(data);
  return http.post(`${RouteUrls.profileInsert}`, data, true);
}

function profileDelete(data) {
  return http.remove(`${RouteUrls.profileDelete}/${data}`, true);
}

function profileDataInsert(data) {
  const encodedData = encodeURIComponent(data);
  return http.post(`${RouteUrls.profileDataInsert}`, data, true);
}

function profileDataId(data) {
  const encodedData = encodeURIComponent(data);
  return http.get(`${RouteUrls.profileDataId}/${encodedData}`, true);
}

function profileDataDelete(data) {
  return http.remove(`${RouteUrls.profileDataDelete}/${data}`, true);
}

function profileDataUpdate(data) {
  return http.update(`${RouteUrls.profileDataUpdate}`, data, true);
}
