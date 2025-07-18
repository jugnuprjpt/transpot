import { http } from "../_apiConfig/http";
import { RouteUrls } from "../_apiConfig/routeUrls";

export const loadManagementService = {
  loadManagementListing,
  loadManagementListingByStatus,
  driverListing,
  documentInsert,
  loadAssign,
  loadAssigment,
  loadInsert,
  loadCancel,
  loadInProgress,
  progressComplated,
  requestToTonu,
  driverDispatchListing,
  invoicePendingInvoiced,
  invoiceComplete,
  requestToInvoiceId,
  requestToInvoice,
  requestToComplete,
  pendingAll,
  // driverDispatchListing,
  // loadCancel,
};

function loadAssigment(data) {
  return http.get(
    `${RouteUrls.loadAssigment}/${data?.load_id}/${data?.load_number}`,
    true
  );
}

function loadManagementListing() {
  return http.get(RouteUrls.loadManagementListing, true);
}

// function driverDispatchListing() {
//   return http.get(RouteUrls.driverDispatchListing, true);
// }

function loadManagementListingByStatus(data) {
  return http.get(`${RouteUrls.loadManagementListingByStatus}/${data}`, true);
}

function driverListing() {
  return http.get(RouteUrls.driverListing, true);
}

function documentInsert(data) {
  return http.post(`${RouteUrls.documentInsert}`, data, true, {
    "Content-Type": "multipart/form-data",
  });
}
function loadInsert(data) {
  return http.post(`${RouteUrls.loadInsert}`, data, true, {
    "Content-Type": "multipart/form-data",
  });
}

function loadAssign(data) {
  return http.post(RouteUrls.loadAssign, data, true);
}

function loadInProgress(data) {
  return http.post(
    `${RouteUrls.loadInProgress}/${data.load_id}/${data.load_number}`,
    data,
    true
  );
}

function progressComplated(data) {
  return http.post(`${RouteUrls.progressComplated}`, data, true, {
    "Content-Type": "multipart/form-data",
  });
}

function requestToTonu(data) {
  return http.post(`${RouteUrls.requestToTonu}`, data, true, {
    "Content-Type": "multipart/form-data",
  });
}

function invoicePendingInvoiced(data) {
  return http.get(`${RouteUrls.invoicePendingInvoiced}/${data}`, true);
}

function invoiceComplete(data) {
  return http.get(`${RouteUrls.invoiceComplete}`, true);
}

function requestToInvoiceId(data) {
  return http.get(`${RouteUrls.requestToInvoiceId}/${data}`, true);
}

function loadCancel(data) {
  return http.post(`${RouteUrls.loadCancel}`, data, true, {
    "Content-Type": "multipart/form-data",
  });
}
function requestToInvoice(data) {
  return http.post(`${RouteUrls.requestToInvoice}`, data, true, {
    "Content-Type": "multipart/form-data",
  });
}

function requestToComplete(data) {
  return http.update(`${RouteUrls.requestToComplete}`, data, true);
}

function driverDispatchListing(data) {
  return http.get(
    `${RouteUrls.driverDispatchListing}/${data?.driver_id}/${data?.year_month}`,
    true
  );
}

function pendingAll(data) {
  return http.get(`${RouteUrls.pendingAll}/${data}`, true);
}
