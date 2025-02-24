import { http } from "../_apiConfig/http";
import { RouteUrls } from "../_apiConfig/routeUrls";
export const moduleServices = {
  moduleMasterGetByRoleId,
  moduleMasterActionGetByRoleId,
  insertRoleModuleMapping,
  insertRoleModuleMappingAction,
};

function moduleMasterGetByRoleId(data) {
  return http.get(`${RouteUrls.moduleMasterGetByRoleId}/${data.role_id}`, true);
}
function moduleMasterActionGetByRoleId(data) {
  return http.get(
    `${RouteUrls.moduleMasterActionGetByRoleId}/${data.role_id}`,
    true
  );
}
function insertRoleModuleMapping(data) {
  return http.post(RouteUrls.insertRoleModuleMapping, data, true);
}
function insertRoleModuleMappingAction(data) {
  return http.post(RouteUrls.insertRoleModuleMappingAction, data, true);
}
