import { http } from "../_apiConfig/http";
import { RouteUrls } from "../_apiConfig/routeUrls";
import api from "../_apiConfig/baseapi";

export const checklistService = {
  checklistStanadradSubmit,
  checklistTenderSubmitted,
  checklistListing,
  checklistInsert,
  checklistId,
  checklistDelete,
  checklistUpdate,
  checklistMapingDownload,

  checklistMapingInsert,
  checklistMapingUpdate,
  checklistMapingDelete,
  checklistMapingId,
  eligibilitySummary,
  probidderList,
  productGetId,
  maxiumWinList,
};

function checklistTenderSubmitted(data) {
  return http.get(`${RouteUrls.checklistTenderSubmitted}/${data}`, true);
}

function checklistListing() {
  return http.get(RouteUrls.checklistListing, true);
}

function checklistId(data) {
  const encodedData = encodeURIComponent(data);
  return http.get(`${RouteUrls.checklistId}/${encodedData}`, true);
}
function checklistInsert(data) {
  return http.post(`${RouteUrls.checklistInsert}`, data, true);
}

function checklistDelete(data) {
  return http.remove(
    `${RouteUrls.checklistDelete}/${data?.check_list_id}/${data.checkListNew}`,
    true
  );
}

function checklistStanadradSubmit(data) {
  return http.update(`${RouteUrls.checklistStanadradSubmit}`, data, true);
}
function checklistUpdate(data) {
  return http.update(`${RouteUrls.checklistUpdate}`, data, true);
}

// ----------- Checklist Maping --start----------------

function checklistMapingId(data) {
  return http.get(`${RouteUrls.checklistMapingId}/${data}`, true);
}

function checklistMapingInsert(data) {
  return http.post(`${RouteUrls.checklistMapingInsert}`, data, true, {
    "Content-Type": "multipart/form-data",
  });
}

function checklistMapingUpdate(data) {
  return http.update(`${RouteUrls.checklistMapingUpdate}`, data, true);
}

function checklistMapingDelete(data) {
  return http.post(`${RouteUrls.checklistMapingDelete}`, data, true);
}

async function checklistMapingDownload(data) {
  const response = await fetch(
    `${api.defaults.baseURL}${RouteUrls.checklistMapingDownload}`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );
  return response;
}

// ----------- Checklist Maping --end----------------

function eligibilitySummary(data) {
  return http.post(RouteUrls.eligibilitySummary, data, true);
}

function probidderList(data) {
  return http.post(RouteUrls.probidderList, data, true);
}

function productGetId(data) {
  return http.get(`${RouteUrls.productGetId}/${data?.tender_id}`, true);
}

function maxiumWinList(data) {
  return http.post(RouteUrls.maxiumWinList, data, true);
}
