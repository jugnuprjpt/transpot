import api from "../_apiConfig/baseapi";
import { http } from "../_apiConfig/http";
import { RouteUrls } from "../_apiConfig/routeUrls";

export const TenderCheckListServices = {
  getTenderSubmittedCheckListByTenderId,
  tenderCheckListInsert,
  tenderCheckListRemove,
  TenderSubmittedUpdate,
  getTenderSubmittedDetailsTenderId,
  tenderSubmittedDetailInsert,
  getAllResponseType,
  uploadResponse,
  prepareResponseDownloadDocument,
  tenderResponseRemove,
};

function getTenderSubmittedCheckListByTenderId(data) {
  return http.get(
    `${RouteUrls.getTenderSubmittedCheckListByTenderId}/${data?.tender_id}`,
    data,
    true
  );
}

function getAllResponseType(data) {
  return http.get(RouteUrls.getAllResponseType, true);
}

function getTenderSubmittedDetailsTenderId(data) {
  return http.get(
    `${RouteUrls.getTenderSubmittedDetailsTenderId}/${data?.tender_id}`,
    true
  );
}
async function prepareResponseDownloadDocument(data) {
  const response = await fetch(
    `${api.defaults.baseURL}${RouteUrls.prepareResponseDownload}/${data}`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
  return response;
}

function uploadResponse(data, qyery) {
  return http.post(`${RouteUrls.uploadResponse}${qyery}`, data, true, {
    "Content-Type": "multipart/form-data",
  });
}

function tenderSubmittedDetailInsert(data) {
  return http.post(`${RouteUrls.TenderSubmittedDetailInsert}`, data, true, {
    "Content-Type": "multipart/form-data",
  });
}
function TenderSubmittedUpdate(data) {
  return http.update(
    `${RouteUrls.TenderSubmittedUpdate}?tender_id=${
      data.tender_id
    }&submitted_date_time=${data.submitted_date_time
      .toString()
      .trim()}&remarks=${data.remarks}`,
    data,
    true
  );
}

function tenderCheckListInsert(data, qyery) {
  return http.post(
    `${RouteUrls.TenderSubmittedCheckListInsert}${qyery}`,
    data,
    true,
    {
      "Content-Type": "multipart/form-data",
    }
  );
}
function tenderCheckListRemove(data) {
  return http.remove(
    `${RouteUrls.TenderSubmittedCheckListRemove}/${data.tender_submitted_check_list_id}/${data?.tender_id}/${data?.document_path}`,
    data,
    true
  );
}
function tenderResponseRemove(data) {
  return http.remove(
    `${RouteUrls.tenderResponseRemove}/${data.tender_submitted_details_id}/${data?.tender_id}`,
    data,
    true
  );
}
