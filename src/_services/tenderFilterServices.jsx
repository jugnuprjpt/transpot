import { http } from "../_apiConfig/http";
import { RouteUrls } from "../_apiConfig/routeUrls";

export const tenderFilterServices = {
  getState,
  getCity,
  getOrganizationType,
  getKeyword,
  tenderStatusMaster,
  getOrganization,
  tenderFilterKeyWordName,
  manualTenderLocation,
  tenderFilterWork,
  ownershipMaster
};

function getState(data) {
  return http.post(
    `${RouteUrls.tenderFilterStates}?id=${data.id}&pageNo=${data.pageNo}&parentids=${data.parentids}&noofrecords=${data.noofrecords}&name=${data.name}`,
    data,
    true
  );
}
function getCity(data) {
  return http.post(
    `${RouteUrls.tenderFilterCity}?id=${data.id}&pageNo=${data.pageNo}&parentids=${data.parentids}&noofrecords=${data.noofrecords}&name=${data.name}`,
    data,
    true
  );
}
function getOrganization(data) {
  return http.post(
    `${RouteUrls.getOrganization}?id=${data.id}&noOfRecords=${data.noOfRecords}&parentids=${data.parentids}&pageNo=${data.pageNo}&name=${data.name}`,
    data,
    true
  );
}
function getOrganizationType() {
  return http.get(RouteUrls.tenderFilterOrganizationType, true);
}
function getKeyword() {
  return http.get(RouteUrls.tenderFilterKeyWord, true);
}
function tenderStatusMaster(data) {
  return http.get(`${RouteUrls.tenderStatusMaster}/${data}`, true);
}

function tenderFilterKeyWordName(data) {
  return http.post(`${RouteUrls.tenderFilterKeyWordName}`, data, true);
}
function manualTenderLocation(data) {
  return http.post(`${RouteUrls.manualTenderLocation}`, data, true);
}

function tenderFilterWork() {
  return http.get(RouteUrls.tenderFilterWork, true);
}

function ownershipMaster() {
  return http.get(RouteUrls.getAllOwnership, true);
}
