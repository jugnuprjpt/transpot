import { http } from "../_apiConfig/http";
import { RouteUrls } from "../_apiConfig/routeUrls";
import api from "../_apiConfig/baseapi";

export const tenderServices = {
  tenderDownloadNew,
  getTenderDetails,
  getSiteLocationDetail,
  tenderInterested,
  getTenderReminder,
  insertTenderReminder,
  tenderReminderByUserId,
  updateTenderReminder,
  insertTenderAssignment,
  getTenderAssignment,
  gettenderAssignmentById,
  updateTenderAssignment,
  deleteTenderAssignment,
  insertKickOffCall,
  gettKickOffCallByTenderId,
  getAllTenderApproval,
  getKickOffCallGetById,
  updateKickOffCall,
  cancelKickOffCall,
  kickOffCallReschedule,
  insertKickOffCallMom,
  getKickOffCallMom,
  updateKickOffCallMom,
  getAllRequestType,
  getAllInstrumentType,
  insertFinanceRequest,
  getFinanceRequestByTenderId,
  getFinanceRequestById,
  insertTenderApproval,
  getApprovalByTenderId,
  updateFinanceRequest,
  approvalStatusCancel,
  fileDownload,
  tenderDownload,
  tenderSubmitInsert,
  tenderChecklistListing,
  dashbaordCalender,
  tenderStatusInsert,
  gettenderStatus,
  getTenderSubmittedStatus,
  kickOffEditFile,
  fileDownloadKickOfCall,
  fileDownloadForMom,
  FinanceEditFile,
  fileDownloadBeforeApproval,
  financefileDownload,
  deleteDocument,
  tenderActivityLog,
  fileRevokeDownload,
  tenderAssignDownload,
  salesmisExport,
};

function tenderActivityLog(data) {
  return http.get(
    `${RouteUrls.tenderActivityLog}/${data.tender_id}/${data.sort_type}`,
    true
  );
}

async function fileDownloadBeforeApproval(data) {
  const response = await fetch(
    `${api.defaults.baseURL}${
      RouteUrls.fileDownloadBeforeApproval
    }?file_name=${data.file_name.replace(/&/g, "%26")}&tender_id=${
      data.tender_id
    }`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
  return response;
}

function getTenderSubmittedStatus(tender_id) {
  return http.get(`${RouteUrls.getTenderSubmittedStatus}/${tender_id}`, true);
}
function getTenderDetails(data) {
  return http.get(`${RouteUrls.getTenderDetails}/${data}`, data, true);
}
async function tenderDownloadNew(data) {
  const response = await fetch(
    `${api.defaults.baseURL}${RouteUrls.tenderDownloadNew}?tenderId=${data}`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
  return response;
}

function tenderSubmitInsert(data) {
  return http.post(
    `${RouteUrls.tenderSubmitInsert}?tender_id=${data.tender_id}`,
    data,
    true
  );
}

function tenderChecklistListing(data) {
  return http.get(
    `${RouteUrls.tenderChecklistListing}/${data.tender_id}/${1}`,
    data,
    true
  );
}
function dashbaordCalender(data) {
  return http.post(
    `${RouteUrls.dashbaordCalender}?start_date=${data.start_date}&end_date=${data.end_date}`,
    data,
    true
  );
}
function getAllTenderApproval(data) {
  return http.get(`${RouteUrls.getAllTenderApproval}/${data}`, true);
}
function getAllRequestType(data) {
  return http.get(RouteUrls.getAllRequestType, true);
}
function getAllInstrumentType(data) {
  return http.get(RouteUrls.getAllInstrumentType, true);
}
function getSiteLocationDetail(data) {
  return http.get(`${RouteUrls.getSiteLocationDetail}/${data}`, true);
}
function tenderInterested(data) {
  return http.post(RouteUrls.tenderInterested, data, true);
}
function getTenderReminder(data) {
  return http.get(`${RouteUrls.getTenderReminder}/${data}`, true);
}
function insertTenderReminder(data) {
  return http.post(RouteUrls.insertTenderReminder, data, true);
}
function insertTenderAssignment(data) {
  return http.post(RouteUrls.insertTenderAssignment, data, true);
}
function updateTenderReminder(data) {
  return http.update(RouteUrls.updateTenderReminder, data, true);
}

function updateKickOffCall(data) {
  return http.update(`${RouteUrls.updateKickOffCall}`, data, true, {
    "Content-Type": "multipart/form-data",
  });
}
function deleteDocument(data) {
  return http.remove(
    `${RouteUrls.deleteFileKickOfCall}/${data.kick_off_call_document_id}/${data.tender_id}/${data.fileName}`,
    true
  );
}

function getTenderAssignment(data) {
  return http.get(`${RouteUrls.getTenderAssignment}/${data}`, true);
}
function gettenderAssignmentById(data) {
  return http.get(RouteUrls.gettenderAssignmentById, true);
}
function tenderReminderByUserId() {
  return http.get(RouteUrls.tenderReminderByUserId, true);
}

function updateTenderAssignment(data) {
  return http.update(RouteUrls.updateTenderAssignment, data, true);
}
function updateKickOffCallMom(data) {
  return http.update(
    `${RouteUrls.updateKickOffCallMom}?kick_off_call_mom_id=${
      data.kick_off_call_mom_id
    }&document_path=${
      typeof data.document_path === "string" ? data.document_path : ""
    }&description=${data.description}&tender_id=${data?.tender_id}`,
    {
      file_data:
        typeof data.document_path === "object" ? data.document_path : {},
    },
    true,
    {
      "Content-Type": "multipart/form-data",
    }
  );
}

async function fileDownloadForMom(data) {
  const response = await fetch(
    `${api.defaults.baseURL}${RouteUrls.fileDownloadForMom}?folderName=${
      data.folderName
    }&fileName=${data.fileName.replace(/&/g, "%26")}
    &tender_id=${data.tender_id}
    &is_mom_submitted=${data.is_mom_submitted}`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
  return response;
}

async function fileRevokeDownload(data) {
  const response = await fetch(
    `${api.defaults.baseURL}${RouteUrls.fileRevokeDownload}?file_name=${data.file_name}&tender_id=${data.tender_id}`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
  return response;
}

async function salesmisExport(data) {
  const response = await fetch(
    `${api.defaults.baseURL}${RouteUrls.salesmisExport}`,
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

async function fileDownloadKickOfCall(data) {
  const response = await fetch(
    `${api.defaults.baseURL}${RouteUrls.fileDownloadKickOfCall}?folderName=${
      data.folderName
    }&fileName=${data.fileName.replace(/&/g, "%26")}&tender_id=${
      data.tender_id
    }&is_mom_submitted=${false}`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
  return response;
}
function kickOffCallReschedule(data) {
  return http.post(RouteUrls.kickOffCallReschedule, data, true);
}

function deleteTenderAssignment(data) {
  return http.remove(
    `${RouteUrls.deleteTenderAssignment}?tender_id=${data.tender_id}&tender_assignment_tracking_id=${data.tender_assignment_tracking_id}`,
    data,
    true
  );
}

function insertKickOffCall(data) {
  return http.post(`${RouteUrls.insertKickOffCall}`, data, true, {
    "Content-Type": "multipart/form-data",
  });
}
function gettKickOffCallByTenderId(data) {
  return http.get(`${RouteUrls.gettKickOffCallByTenderId}/${data}`, true);
}
function getKickOffCallGetById(data) {
  return http.get(`${RouteUrls.getKickOffCallGetById}/${data}`, true);
}
function cancelKickOffCall(data) {
  return http.post(RouteUrls.cancelKickOffCall, data, true);
}

function kickOffEditFile(tenderId, kick_off_call_id, data) {
  return http.post(
    `${RouteUrls.kickOffEditFile}?tender_id=${tenderId}&kick_off_call_id=${kick_off_call_id}`,
    data,
    true,
    {
      "Content-Type": "multipart/form-data",
    }
  );
}

function FinanceEditFile(tenderId, finance_request_id, data) {
  return http.post(
    `${RouteUrls.FinanceEditFile}?tender_id=${tenderId}&finance_request_id=${finance_request_id}`,
    data,
    true,
    {
      "Content-Type": "multipart/form-data",
    }
  );
}

function insertKickOffCallMom(data) {
  return http.post(
    `${RouteUrls.insertKickOffCallMom}?kick_off_call_id=${data.kick_off_call_id}&description=${data.description}&tender_id=${data.tender_id}`,
    { document_path: data?.document_path },
    true,
    {
      "Content-Type": "multipart/form-data",
    }
  );
}
function getKickOffCallMom(data) {
  return http.get(`${RouteUrls.getKickOffCallMom}/${data}`, true);
}

function insertFinanceRequest(data) {
  return http.post(RouteUrls.insertFinanceRequest, data, true, {
    "Content-Type": "multipart/form-data",
  });
}

function getFinanceRequestByTenderId(data) {
  return http.get(`${RouteUrls.getFinanceRequestByTenderId}/${data}`, true);
}
function getFinanceRequestById(data) {
  return http.get(`${RouteUrls.getFinanceRequestById}/${data}`, true);
}

function insertTenderApproval(data) {
  return http.post(`${RouteUrls.insertTenderApproval}`, data, true, {
    "Content-Type": "multipart/form-data",
  });
}
function getApprovalByTenderId(data) {
  return http.get(`${RouteUrls.getApprovalByTenderId}/${data}`, true);
}

function updateFinanceRequest(data) {
  return http.update(RouteUrls.updateFinanceRequest, data, true, {
    "Content-Type": "multipart/form-data",
  });
}

function approvalStatusCancel(data) {
  return http.post(
    `${RouteUrls.approvalStatusCancel}?approval_id=${data.approval_id}&comment=${data.comment}&tender_id=${data.tender_id}`,
    { document_path: data?.document_path },
    true,
    {
      "Content-Type": "multipart/form-data",
    }
  );
}
async function fileDownload(data) {
  const response = await fetch(
    `${api.defaults.baseURL}${RouteUrls.fileDownload}?folderName=${
      data.folderName
    }&fileName=${data.fileName.replace(/&/g, "%26")}`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
  return response;
}
async function financefileDownload(data) {
  const response = await fetch(
    `${api.defaults.baseURL}${RouteUrls.financefileDownload}?folderName=${
      data.folderName
    }&fileName=${data.fileName.replace(/&/g, "%26")}&tender_id=${
      data.tender_id
    }`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
  return response;
}
async function tenderDownload(data) {
  const response = await fetch(`${RouteUrls.tenderDownload}/${data}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return response;
}

function tenderStatusInsert(data) {
  return http.post(`${RouteUrls.tenderStatusInsert}`, data, true, {
    "Content-Type": "multipart/form-data",
  });
}

function gettenderStatus(data) {
  return http.get(`${RouteUrls.gettenderStatus}/${data}`, data, true);
}

async function tenderAssignDownload(data) {
  const response = await fetch(
    `${api.defaults.baseURL}${RouteUrls.tenderAssignDownload}?file_name=${data.file_name}&tender_id=${data.tender_id}&assign_to=${data.assign_to}`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
  return response;
}
