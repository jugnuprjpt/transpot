import { RouteUrls } from "../_apiConfig/routeUrls";
import api from "../_apiConfig/baseapi";

export const downloadAllService = {
  prePostDownloadAll,
  prepareChecklistDownloadAll,
  folderDownloadAll,
  briefCaseDownloadAll,
};

async function prePostDownloadAll(data) {
  const response = await fetch(
    `${api.defaults.baseURL}${RouteUrls.prePostDownloadAll}/${data.tender_id}/${data?.isDeletedFlag}`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data.body),
    }
  );
  return response;
}

async function prepareChecklistDownloadAll(data) {
  const response = await fetch(
    `${api.defaults.baseURL}${RouteUrls.prepareChecklistDownloadAll}/${data.tender_id}`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data.body),
    }
  );
  return response;
}
async function folderDownloadAll(data) {
  const response = await fetch(
    `${api.defaults.baseURL}${RouteUrls.folderDownloadAll}`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify([data]),
    }
  );
  return response;
}

async function briefCaseDownloadAll(data) {
  const response = await fetch(
    `${api.defaults.baseURL}${RouteUrls.briefCaseDownloadAll}/${data?.isDeletedFlag}`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data.body),
    }
  );
  return response;
}
