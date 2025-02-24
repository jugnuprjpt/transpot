import { http } from "../_apiConfig/http";
import { RouteUrls } from "../_apiConfig/routeUrls";

export const revokeService = {
  getAllDepartments,
  getAllDesignations,
  deparmentInsert,
  getDeparmentById,
  getDeparmentUpdate,
  DeparmentDelete,
  designationInsert,
  getDesignationById,
  getDesignationUpdate,
  DesigantionDelete,
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
  allUserType,
  getApproval,
  getListingUserManagement,
  getAllUserSubmisssionManagement,
  getAllUserSubmission,
  getAllUserAssign,
  getAllHistoryRevoked,
  getAllRevokedUpdate,
};

function getAllDepartments() {
  return http.get(RouteUrls.getAllDepartments, true);
}

function getAllHistoryRevoked(data) {
  return http.get(`${RouteUrls.getAllHistoryRevoked}/${data}`, true);
}

function getAllRevokedUpdate(data) {
  return http.update(`${RouteUrls.getAllRevokedUpdate}`, data, true, {
    "Content-Type": "multipart/form-data",
  });
}

function getAllDesignations() {
  return http.get(RouteUrls.getAllDesignations, true);
}
function getAllRole() {
  return http.get(RouteUrls.getAllRole, true);
}
function allUserType() {
  return http.get(RouteUrls.userType, true);
}
function deparmentInsert(data) {
  const encodedData = encodeURIComponent(data);
  return http.post(`${RouteUrls.deparmentInsert}`, data, true);
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
  return http.post(`${RouteUrls.userMasterInsert}`, data, true);
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
  return http.get(`${RouteUrls.getUserById}/${encodedData}`, true);
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
  return http.remove(`${RouteUrls.DeparmentDelete}/${data}`, true);
}
function roleDelete(data) {
  return http.remove(`${RouteUrls.roleDelete}/${data}`, true);
}
function deleteUserById(data) {
  return http.remove(`${RouteUrls.deleteUserById}/${data}`, true);
}
function DesigantionDelete(data) {
  return http.remove(`${RouteUrls.DesigantionDelete}/${data}`, true);
}
function getAllUserManagement(data) {
  // return http.get(RouteUrls.getAllUserManagement/${data}, true);
  return http.get(`${RouteUrls.getAllUserManagement}/${0}`, true);
}

// getAllUserAssign

function getAllUserAssign(data) {
  // return http.get(RouteUrls.getAllUserManagement/${data}, true);
  return http.get(`${RouteUrls.getAllUserAssign}/${data}`, true);
}

function getAllUserSubmission(data) {
  // return http.get(RouteUrls.getAllUserManagement/${data}, true);
  return http.get(`${RouteUrls.getAllUserSubmission}/${data}`, true);
}

function getAllUserSubmisssionManagement() {
  return http.get(RouteUrls.getAllUserSubmisssionManagement, true);
}
function getListingUserManagement() {
  return http.get(RouteUrls.getListingUserManagement, true);
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
  return http.get(`${RouteUrls.getUserManagementById}/${encodedData}`, true);
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
function getApproval(data) {
  return http.get(`${RouteUrls.getApproval}`, true);
}
