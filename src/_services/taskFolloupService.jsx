import { http } from "../_apiConfig/http";
import { RouteUrls } from "../_apiConfig/routeUrls";

export const taskFolloupService = {
  taskAllocationFollowListing,
  taskAllocationFollowInsert,
  taskAllocationFollowEdit,
  taskAllocationFollowUpdate,
  taskAllocationFollowDelete,
};
function taskAllocationFollowListing(data) {
  return http.get(`${RouteUrls.taskAllocationFollowListing}/${data}`, true);
}
function taskAllocationFollowInsert(data) {
  return http.post(`${RouteUrls.taskAllocationFollowInsert}`, data, true);
}
function taskAllocationFollowEdit(data) {
  return http.get(`${RouteUrls.taskAllocationFollowEdit}/${data}`, true);
}
function taskAllocationFollowUpdate(data) {
  return http.update(`${RouteUrls.taskAllocationFollowUpdate}`, data, true);
}

function taskAllocationFollowDelete(data) {
  return http.remove(
    `${RouteUrls.taskAllocationFollowDelete}/${data?.task_follw_up_id}/${data?.tender_id}`,
    true
  );
}
