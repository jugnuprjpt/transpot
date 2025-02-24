import { http } from "../_apiConfig/http";
import { RouteUrls } from "../_apiConfig/routeUrls";

export const dashBoardServices = {
  dashbaordTenderActivityAssignToTeam,
  dashbaordTenderActivityReminder,
  dashbaordTenderActivityKickOffCall,
  dashbaordTenderActivityInprocess,
  dashbaordTenderActivityAssignTo,
  dashbaordTenderActivityApproval,
};
function dashbaordTenderActivityAssignToTeam(data) {
  return http.post(RouteUrls.dashbaordTenderActivityAssignToTeam, data, true);
}
function dashbaordTenderActivityReminder(data) {
  return http.post(RouteUrls.dashbaordTenderActivityReminder, data, true);
}
function dashbaordTenderActivityKickOffCall(data) {
  return http.post(RouteUrls.dashbaordTenderActivityKickOffCall, data, true);
}
function dashbaordTenderActivityInprocess(data) {
  return http.post(RouteUrls.dashbaordTenderActivityInprocess, data, true);
}
function dashbaordTenderActivityAssignTo(data) {
  return http.post(RouteUrls.dashbaordTenderActivityAssignTo, data, true);
}
function dashbaordTenderActivityApproval(data) {
  return http.post(RouteUrls.dashbaordTenderActivityApproval, data, true);
}
