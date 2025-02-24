import { http } from "../_apiConfig/http";
import { RouteUrls } from "../_apiConfig/routeUrls";

export const ApprovalServices = {
  getSearchApproval,
  getSearchApprovalCount,
  getApprovalTenderById,
  updateApprovalStatus,
  getApprovalStatus,
  getApprovalByApprovalId,
};

function getSearchApproval(data) {
  return http.post(RouteUrls.getApprovalSearch, data, true);
}

function getSearchApprovalCount(data) {
  return http.post(RouteUrls.getApprovalSearchCount, data, true);
}
function getApprovalTenderById(data) {
  return http.get(`${RouteUrls.getApprovalTenderById}/${data}`, true);
}
function getApprovalStatus(data) {
  return http.get(
    `${RouteUrls.getApprovalStatus}/${data.approval_id}`,
    data,
    true
  );
}

function updateApprovalStatus(data) {
  return http.update(`${RouteUrls.updateApprovalStatus}`, data, true, {
    "Content-Type": "multipart/form-data",
  });
}

function getApprovalByApprovalId(data) {
  return http.get(`${RouteUrls.getApprovalByApprovalId}/${data}`, true);
}
