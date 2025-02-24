import { http } from "../_apiConfig/http";
import { RouteUrls } from "../_apiConfig/routeUrls";

export const tenderTaskServices = {
  getTenderTaskCount,
  getTenderTask,
  getTenderCountWork,
  getTenderListing,
  tenderDownloadDetails,
  tenderDetailDownload,
};

// function tenderDownloadDetails(data) {
//   return http.post(RouteUrls.tenderDownloadDetails, data, true);
// }

function tenderDownloadDetails(data) {
  return http.post(
    `${RouteUrls.tenderDownloadDetails}/${data?.t247_id}`,
    data,
    true
  );
}
function getTenderTaskCount(data) {
  return http.post(RouteUrls.getTenderTaskCount, data, true);
}

function getTenderTask(data) {
  return http.post(RouteUrls.getTenderTask, data, true);
}

function getTenderCountWork(data) {
  return http.post(RouteUrls.getTenderCountWork, data, true);
}

function getTenderListing(data) {
  return http.post(RouteUrls.getTenderListing, data, true);
}

async function tenderDetailDownload(data) {
  const response = await fetch(`${RouteUrls.tenderDetailDownload}/${data}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return response;
}
