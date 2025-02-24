import { http } from "../_apiConfig/http";
import { RouteUrls } from "../_apiConfig/routeUrls";
import api from "../_apiConfig/baseapi";

export const taskAllocationService = {
  taskAllocationListing,
  taskAllocationInsert,
  taskAllocationUpdate,
  taskAllocationEdit,
  taskAllocationFileAdded,
  taskAllocationDetails,
  taskAllocatedDownload,
  taskAllocationFileDelete,

  taskActivityHistory,
  taskActivityHistoryDelete,
  taskAssignerInsert,
};

function taskAllocationListing(data) {
  return http.get(`${RouteUrls.taskAllocationListing}/${data}`, true);
}

function taskAllocationInsert(data) {
  return http.post(RouteUrls.taskAllocationInsert, data, true, {
    "Content-Type": "multipart/form-data",
  });
}

function taskAllocationUpdate(data) {
  return http.update(RouteUrls.taskAllocationUpdate, data, true, {
    "Content-Type": "multipart/form-data",
  });
}

function taskAllocationEdit(data) {
  return http.get(`${RouteUrls.taskAllocationEdit}/${data}`, true);
}

function taskAllocationFileAdded(tender_id, task_id, data) {
  return http.post(
    `${RouteUrls.taskAllocationFileAdded}?tender_id=${tender_id}&task_id=${task_id}`,
    data,
    true,
    {
      "Content-Type": "multipart/form-data",
    }
  );
}

function taskAllocationFileDelete(data) {
  return http.remove(
    `${RouteUrls.taskAllocationFileDelete}/${data?.task_document_id}/${data?.tender_id}/${data?.document_path}`,
    true
  );
}

function taskAllocationDetails(data) {
  return http.get(`${RouteUrls.taskAllocationDetails}/${data}`, true);
}

async function taskAllocatedDownload(data) {
  const response = await fetch(
    `${api.defaults.baseURL}${RouteUrls.taskAllocatedDownload}?file_name=${data.file_name}&tender_id=${data.tender_id}&button_name=${data.button_name}`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
  return response;
}

function taskActivityHistory(data) {
  return http.get(`${RouteUrls.taskActivityHistory}/${data}`, true);
}

function taskActivityHistoryDelete(data) {
  return http.remove(
    `${RouteUrls.taskActivityHistoryDelete}/${data?.task_activity_id}/${data?.tender_id}`,
    true
  );
}

function taskAssignerInsert(data) {
  return http.post(`${RouteUrls.taskAssignerInsert}`, data, true, {
    "Content-Type": "multipart/form-data",
  });
}
