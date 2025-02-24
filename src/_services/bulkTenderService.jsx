import { http } from "../_apiConfig/http";
import { RouteUrls } from "../_apiConfig/routeUrls";
import api from "../_apiConfig/baseapi";

export const bulkTenderService = {
  bulkTenderListing,
  bulkTenderInsertExcel,
  bulkTenderDownload,
  bulkTenderDownloadFromListing,
};
function bulkTenderListing() {
  return http.get(RouteUrls.bulkTenderListing, true);
}

function bulkTenderInsertExcel(data) {
  return http.post(
    `${RouteUrls?.bulkTenderInsertExcel}?file_name=${data?.folderName}`,
    {
      document_path: data?.listData,
    },
    true,
    {
      "Content-Type": "multipart/form-data",
    }
  );
}

async function bulkTenderDownload() {
  const response = await fetch(
    `${api.defaults.baseURL}${RouteUrls.bulkTenderDownload}`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
  return response;
}

async function bulkTenderDownloadFromListing(data) {
  const response = await fetch(
    `${api.defaults.baseURL}${RouteUrls.bulkTenderDownloadFromListing}?file_path=${data?.file_path}&tender_id=${data.tender_id}`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
  return response;
}
