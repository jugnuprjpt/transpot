import { http } from "../_apiConfig/http";
import { RouteUrls } from "../_apiConfig/routeUrls";

export const financeManagmentServices = {
  getAllDepartments,
  getAllDesignations,
  getDeparmentById,
  getDeparmentUpdate,
  DeparmentDelete,
  designationInsert,
  getDesignationById,
  getDesignationUpdate,
  deleteFinanceFile,
  getAllRole,
  roleInsert,
  getRoleUpdate,
  getRoleById,
  roleDelete,
  getAllUserManagement,
  getUserManagementById,
  getUserManagementUpdate,
  userManagementDelete,
  userManagementInsert,
  userMasterInsert,
  getUserById,
  deleteUserById,
  updateUser,
  getUserManagementUpdatePassword,
  getFinanceRequestSearch,
  getFinanceRequestSearchById,
  getFinanceRequestSearchByTenderId,
  financeRequestApprovalInsert,
  followupRequestInsert,
  getfollowupRequestById,
  getRequestApprovalById,
  financeRequestReassignInsert,
  getRequestAssignmentById,
  getAllFinanceStatusMaster,
  financePaymentDetailsInsert,
  getFinancePaymentDetailsGetById,
  financeRequestApprovalUpdate,
  getFinanceRequestSearchCount,
  getFinanceRequestAssignmentTrackingByRequestId,
  getFinanceApproval,
  getFinanceRequestUpdateMasterGetAll,
  getFinanceRequestUpdateMasterGetid,
  getFinanceRequestUpdateMasterInsert,
  getFinanceRequestUpdateMasterHistory,
};

function deleteFinanceFile(data) {
  return http.remove(
    `${RouteUrls.deleteFinanceFile}/${data.finance_request_document_id}/${data.tender_id}/${data.fileName}`,
    data,
    true
  );
}
function getAllDepartments() {
  return http.get(RouteUrls.getAllDepartments, true);
}
function getFinanceRequestUpdateMasterGetAll(data) {
  return http.get(
    `${RouteUrls.getFinanceRequestUpdateMasterGetAll}/${data}`,
    true
  );
}
function getAllDesignations() {
  return http.get(RouteUrls.getAllDesignations, true);
}
function getAllRole() {
  return http.get(RouteUrls.getAllRole, true);
}
function getAllFinanceStatusMaster() {
  return http.get(RouteUrls.getAllFinanceStatusMaster, true);
}
function getFinanceRequestSearchById(data) {
  return http.get(`${RouteUrls.getFinanceRequestSearchById}/${data}`, true);
}
function getFinanceRequestUpdateMasterGetid(data) {
  return http.get(
    `${RouteUrls.getFinanceRequestUpdateMasterGetid}/${data}`,
    true
  );
}
function getFinancePaymentDetailsGetById(data) {
  return http.get(`${RouteUrls.getFinancePaymentDetailsGetById}/${data}`, true);
}
function getFinanceRequestUpdateMasterHistory(data) {
  return http.get(
    `${RouteUrls.getFinanceRequestUpdateMasterHistory}/${data}`,
    true
  );
}
function getFinanceRequestSearchByTenderId(data) {
  return http.post(
    `${RouteUrls.getFinanceRequestSearchByTenderId}`,
    data,
    true
  );
}
function financeRequestApprovalInsert(data) {
  return http.post(`${RouteUrls.financeRequestApprovalInsert}`, data, true);
}
function getFinanceRequestUpdateMasterInsert(data) {
  return http.post(
    `${RouteUrls.getFinanceRequestUpdateMasterInsert}`,
    data,
    true
  );
}

function financeRequestApprovalUpdate(data) {
  return http.update(`${RouteUrls.financeRequestApprovalUpdate}`, data, true);
}

function financePaymentDetailsInsert(data) {
  return http.post(`${RouteUrls.financePaymentDetailsInsert}`, data, true, {
    "Content-Type": "multipart/form-data",
  });
}
function financeRequestReassignInsert(data) {
  return http.post(`${RouteUrls.financeRequestReassignInsert}`, data, true);
}
function getRequestApprovalById(data) {
  return http.get(`${RouteUrls.getRequestApprovalById}/${data}`, true);
}
function getRequestAssignmentById(data) {
  return http.get(`${RouteUrls.getRequestAssignmentById}/${data}`, true);
}
function followupRequestInsert(data) {
  return http.post(`${RouteUrls.followupRequestInsert}`, data, true);
}
function getfollowupRequestById(data) {
  return http.get(`${RouteUrls.getfollowupRequestById}/${data}`, true);
}
function getFinanceRequestSearch(data) {
  return http.post(`${RouteUrls.getFinanceRequestSearch}`, data, true);
}
function getFinanceRequestSearchCount(data) {
  return http.post(`${RouteUrls.getFinanceRequestSearchCount}`, data, true);
}
function roleInsert(data) {
  const encodedData = encodeURIComponent(data);
  return http.post(`${RouteUrls.roleInsert}`, data, true);
}
function designationInsert(data) {
  const encodedData = encodeURIComponent(data);
  return http.post(`${RouteUrls.designationInsert}`, data, true);
}
function userMasterInsert(data) {
  return http.post(
    `${RouteUrls.userMasterInsert}?email_id=${data?.email_id}&password=${data?.password}&first_name=${data?.first_name}&last_name=${data?.last_name}&department_id=${data?.department_id}&designation_id=${data?.designation_id}&role_id=${data?.role_id}&contact_no=${data?.contact_no}&state_id=${data?.state_id}&city_id=${data?.city_id}&address=${data?.address}`,
    data,
    true
  );
}
function getDeparmentById(data) {
  const encodedData = encodeURIComponent(data);
  return http.get(`${RouteUrls.getDeparmentById}/${encodedData}`, true);
}
function getRoleById(data) {
  const encodedData = encodeURIComponent(data);
  return http.get(`${RouteUrls.getRoleById}/${encodedData}`, true);
}
function getDesignationById(data) {
  const encodedData = encodeURIComponent(data);
  return http.get(`${RouteUrls.getDesignationById}/${encodedData}`, true);
}
function getUserById(data) {
  const encodedData = encodeURIComponent(data);
  return http.get(`${RouteUrls.getUserById}?user_id=${encodedData}`, true);
}
function getDeparmentUpdate(data) {
  return http.update(
    `${RouteUrls.getDeparmentUpdate}?department_id=${data.department_id}&department_name=${data.department_name}`,
    data,
    true
  );
}
function getRoleUpdate(data) {
  return http.update(`${RouteUrls.getRoleUpdate}`, data, true);
}
function getDesignationUpdate(data) {
  return http.update(
    `${RouteUrls.getDesignationUpdate}?designation_id=${data.designation_id}&designation_name=${data.designation_name}`,
    data,
    true
  );
}
function updateUser(data) {
  return http.update(`${RouteUrls.updateUser}`, data, true);
}
function DeparmentDelete(data) {
  return http.remove(
    `${RouteUrls.DeparmentDelete}?department_id=${data}`,
    true
  );
}
function roleDelete(data) {
  return http.remove(`${RouteUrls.roleDelete}/${data}`, true);
}
function deleteUserById(data) {
  return http.remove(`${RouteUrls.deleteUserById}/${data}`, true);
}

function getAllUserManagement() {
  return http.get(RouteUrls.getAllUserManagement, true);
}
function userManagementInsert(data) {
  const encodedData = encodeURIComponent(data);
  return http.post(
    `${RouteUrls.userManagementInsert}?department_name=${encodedData}`,
    data,
    true
  );
}
function getUserManagementById(data) {
  const encodedData = encodeURIComponent(data);
  return http.get(
    `${RouteUrls.getUserManagementById}?user_id=${encodedData}`,
    true
  );
}
function getUserManagementUpdate(data) {
  return http.update(
    `${RouteUrls.getUserManagementUpdate}?department_id=${data.department_id}&department_name=${data.department_name}`,
    data,
    true
  );
}
function userManagementDelete(data) {
  return http.remove(
    `${RouteUrls.userManagementDelete}?department_id=${data}`,
    true
  );
}

function getUserManagementUpdatePassword(data) {
  return http.update(
    `${RouteUrls.getUserManagementUpdatePassword}?user_id=${data.user_id}&password=${data.password}`,
    data,
    true
  );
}

function getFinanceRequestAssignmentTrackingByRequestId(data) {
  return http.get(
    `${RouteUrls.getFinanceRequestAssignmentTrackingByRequestId}/${data}`,
    true
  );
}
function getFinanceApproval() {
  return http.get(`${RouteUrls.getFinanceApproval}`, true);
}
