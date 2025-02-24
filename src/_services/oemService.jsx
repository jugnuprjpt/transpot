import { http } from "../_apiConfig/http";
import { RouteUrls } from "../_apiConfig/routeUrls";
import api from "../_apiConfig/baseapi";
export const oemServices = {
  oemInsert,
  dealerMasterInsert,
  oemSearch,
  oemSearchCount,
  getDealer,
  getOemById,
  dealerSearch,
  dealerSearchCount,
  getDealerById,
  DealerUpdate,
  oemUpdate,
  deleteDealer,
  deleteOem,
  authDownloadFile,
  poDownloadFile,
  followUpGetId,
  followUpInsert,
  getTenderStatus,
  StatusUpdate,
};

function oemInsert(data) {
  return http.post(
    `${RouteUrls.oemInsert}?oem_id=${data.oem_id}&tender_no=${
      data.tender_no
    }&department_name=${data.department_name}&dealer_id=${
      data.dealer_id
    }&authorization_letter_brief=${
      data.authorization_letter_brief
    }&authorization_date_time=${data.authorization_date_time
      .toString()
      .trim()}&reminder_date_time=${data.reminder_date_time
      .toString()
      .trim()}&next_followup_date_time=${data.next_followup_date_time
      .toString()
      .trim()}&next_followup_remarks=${
      data.next_followup_remarks
    }&file_path_Auth=${data.file_path_Auth}`,
    {
      authorization_doc_path: data?.authorization_doc_path,
    },
    true,
    {
      "Content-Type": "multipart/form-data",
    }
  );
}

function dealerMasterInsert(data) {
  return http.post(RouteUrls.dealerMasterInsert, data, true);
}
function oemSearch(data) {
  return http.post(RouteUrls.oemSearch, data, true);
}
function oemSearchCount(data) {
  return http.post(RouteUrls.oemSearchCount, data, true);
}
function getDealer(data) {
  return http.get(RouteUrls.getDealer, true);
}
function getTenderStatus(data) {
  return http.get(RouteUrls.getTenderStatus, true);
}

function getOemById(data) {
  return http.get(`${RouteUrls.getOemById}/${data}`, true);
}
function dealerSearch(data) {
  return http.post(RouteUrls.dealerSearch, data, true);
}
function dealerSearchCount(data) {
  return http.post(RouteUrls.dealerSearchCount, data, true);
}
function getDealerById(data) {
  return http.get(`${RouteUrls.getdealerById}/${data}`, true);
}

function DealerUpdate(data) {
  return http.update(RouteUrls.DealerUpdate, data, true);
}

function oemUpdate(data) {
  return http.update(
    `${RouteUrls.oemUpdate}?oem_id=${data.oem_id}&tender_no=${
      data.tender_no
    }&department_name=${data.department_name}&dealer_id=${
      data.dealer_id
    }&authorization_letter_brief=${
      data.authorization_letter_brief
    }&authorization_date_time=${data.authorization_date_time
      .toString()
      .trim()}&reminder_date_time=${data.reminder_date_time
      .toString()
      .trim()}&next_followup_date_time=${data.next_followup_date_time
      .toString()
      .trim()}&next_followup_remarks=${
      data.next_followup_remarks
    }&file_path_Auth=${
      typeof data.authorization_doc_path === "string"
        ? data.authorization_doc_path
        : ""
    }`,
    {
      authorization_doc_path:
        typeof data.authorization_doc_path === "object"
          ? data.authorization_doc_path
          : {},
    },
    true,
    {
      "Content-Type": "multipart/form-data",
    }
  );
}
function deleteDealer(data) {
  return http.remove(`${RouteUrls.deleteDealer}/${data}`, true);
}
function deleteOem(data) {
  return http.remove(`${RouteUrls.deleteOem}/${data}`, true);
}
async function authDownloadFile(data) {
  const response = await fetch(
    `${api.defaults.baseURL}${RouteUrls.authDownloadFile}/${data?.download_authorization_doc_path}/${data?.tender_no}`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
  return response;
}
async function poDownloadFile(data) {
  const response = await fetch(
    `${api.defaults.baseURL}${RouteUrls.poDownloadFile}/${data?.download_authorization_doc_path}/${data?.tender_no}`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
  return response;
}

function followUpGetId(data) {
  return http.get(`${RouteUrls.followUpGetId}/${data}`, true);
}

function followUpInsert(data) {
  return http.post(RouteUrls.followUpInsert, data, true);
}

function StatusUpdate(data) {
  return http.post(
    `${RouteUrls.StatusUpdate}?oem_id=${data.oem_id}&oem_tender_status_id=${data.oem_tender_status_id}&po_doc_path=${data.po_doc_path}&po_remarks=${data.po_remarks}&tender_no=${data.tender_no}`,
    {
      po_doc: data?.po_doc,
    },
    true,
    {
      "Content-Type": "multipart/form-data",
    }
  );
}
