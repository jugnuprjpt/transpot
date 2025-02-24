import { RouteUrls } from "../_apiConfig/routeUrls";
import api from "../_apiConfig/baseapi";

export const importExcelDownloadServics = {
  delearsDownload,
  oemDownload,
  newrequestDownload,
  approvalDownload,
  tenderResultDownload,
  tenderListDownload,
  tenderTaskDownload,
  tenderAllWorkDownload,
};

async function tenderAllWorkDownload(data) {
  const response = await fetch(
    `${api.defaults.baseURL}${RouteUrls.tenderAllWorkDownload}`,
    {
      method: "POST", // or 'GET' or any other HTTP method you intend to use
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json", // Adjust content type as per your requirement
      },
      body: JSON.stringify(data), // Serialize data to JSON format if needed
    }
  );
  return response;
}

async function delearsDownload(data) {
  const response = await fetch(
    `${api.defaults.baseURL}${RouteUrls.delearsDownload}`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );
  return response;
}
async function oemDownload(data) {
  const response = await fetch(
    `${api.defaults.baseURL}${RouteUrls.oemDownload}`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );
  return response;
}

async function newrequestDownload(data) {
  const response = await fetch(
    `${api.defaults.baseURL}${RouteUrls.newrequestDownload}`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );
  return response;
}

async function approvalDownload(data) {
  const response = await fetch(
    `${api.defaults.baseURL}${RouteUrls.approvalDownload}`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );
  return response;
}
async function tenderResultDownload(data) {
  const response = await fetch(
    `${api.defaults.baseURL}${RouteUrls.tenderResultDownload}`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );
  return response;
}
async function tenderListDownload(data) {
  const response = await fetch(
    `${api.defaults.baseURL}${RouteUrls.tenderListDownload}`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );
  return response;
}

async function tenderTaskDownload(data) {
  const response = await fetch(
    `${api.defaults.baseURL}${RouteUrls.tenderTaskDownload}`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );
  return response;
}
