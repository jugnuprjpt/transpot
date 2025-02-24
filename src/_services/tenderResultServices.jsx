import { http } from "../_apiConfig/http";
import { RouteUrls } from "../_apiConfig/routeUrls";

export const tenderResultServices = {
  getTenderDetails,
  getSiteLocationDetail,
  getBidderListDetail,
  downloadForZip,
};

function getTenderDetails(data) {
  return http.get(`${RouteUrls.getTenderResultDetails}/${data}`, true);
}
function getSiteLocationDetail(data) {
  return http.get(
    `${RouteUrls.getSiteLocationTenderResultDetail}/${data}`,
    data,
    true
  );
}
function getBidderListDetail(data) {
  return http.get(`${RouteUrls.getBidderListDetail}/${data}`, true);
}

async function downloadForZip(data) {
  const response = await fetch(`${RouteUrls.downloadForZip}/${data}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return response;
}
