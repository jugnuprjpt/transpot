// ********************************

import api from "../_apiConfig/baseapi";
import { http } from "../_apiConfig/http";
import { RouteUrls } from "../_apiConfig/routeUrls";

export const documentDownloadServices = {
  getAllDocumentsBrief,
  documentsBriefTableSearch,
  documentsBriefInsert,
  documentsBriefUpdate,
  documentsBriefId,
  documentsBriefDelete,
  getAllFolders,
  getAllSubFolders,
  getMainFolders,
  folderInsert,
  folderUpdate,
  folderDelete,
  DocumentsBriefDownload,
  getAllBrief,
  getFolderByIdForEdit,
  DocumentsDownload,
  downloadNewBrief,
};

function getAllDocumentsBrief(data) {
  return http.post(RouteUrls.getNewAllBriefDocument, data, true);
}

function getAllBrief(data) {
  return http.get(RouteUrls.getAllBrief, true);
}

function downloadNewBrief(data) {
  return http.get(
    `${api.defaults.baseURL}${RouteUrls.newBriefDownload}/${data}`,
    false
  );
}

async function DocumentsBriefDownload(data) {
  const response = await fetch(
    `${api.defaults.baseURL}${RouteUrls.newBriefDownload}/${data?.path}/${data?.is_deleted_document}`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
  return response;
}

async function DocumentsDownload(data) {
  const response = await fetch(
    `${api.defaults.baseURL}${RouteUrls.downloadBriefDocument}?folderName=${data.folder_name}&fileName=${data.document_path}`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
  return response;
}

// function documentsBriefInsert(data) {
//   console.log(data, " data .......");
//   return http.post(
//     `${RouteUrls.newInsertBrief}?brief_case_id=${data.brief_case_id}&folder_id=${data.folder_id}&document_name=${data.document_name}&folder_name=${data.folder_name}&parent_folder_id=${data.parent_folder_id}&parent_folder_name=${data.parent_folder_name}&expiry_date=${data.expiry_date}&remarks=${data.remarks}`,
//     { file_data: data.document_path },
//     true,
//     {
//       "Content-Type": "multipart/form-data",
//     }
//   );
// }

function documentsBriefInsert(data) {
  return http.post(`${RouteUrls.newInsertBrief}`, data, true, {
    "Content-Type": "multipart/form-data",
  });
}



// function documentsBriefUpdate(data) {
//   return http.update(
//     `${RouteUrls.newBriefUpdate}?brief_case_id=${
//       data.brief_case_id
//     }&folder_id=${data.folder_id}&document_name=${
//       data.document_name
//     }&document_path=${
//       typeof data.document_path === "string" ? data.document_path : ""
//     }&folder_name=${data.folder_name}&parent_folder_id=${
//       data.parent_folder_id
//     }&parent_folder_name=${data.parent_folder_name}`,
//     {
//       file_data:
//         typeof data.document_path === "object" ? data.document_path : {},
//     },
//     true,
//     {
//       "Content-Type": "multipart/form-data",
//     }
//   );
// }

function documentsBriefUpdate(data) {
  return http.update(`${RouteUrls.newBriefUpdate}`, data, true, {
    "Content-Type": "multipart/form-data",
  });
}

function documentsBriefId(data) {
  return http.get(`${RouteUrls.getBriefForEditNew}/${data}`, true);
}

function documentsBriefTableSearch(data) {
  return http.post(RouteUrls.searchDocumentInTable, data, true);
}

function documentsBriefDelete(data) {
  return http.remove(`${RouteUrls.newdeleteBriefDocument}/${data}`, true);
}

// ****************************foldersapi********************************//

function getAllFolders() {
  return http.get(RouteUrls.newgetAllFolder, true);
}
function getMainFolders() {
  return http.get(RouteUrls.newgetMainFolders, true);
}

function getAllSubFolders(data) {
  return http.get(`${RouteUrls.newgetAllSubFolder}/${data}`, true);
}

function folderInsert(data) {
  return http.post(RouteUrls.newInsertFolder, data, true);
}

function folderUpdate(data) {
  return http.update(RouteUrls.newFolderUpdate, data, true);
}

function folderDelete(data) {
  return http.remove(`${RouteUrls.newDeleteFolder}/${data}`, true);
}

function getFolderByIdForEdit(data) {
  return http.get(`${RouteUrls.newFolderById}/${data}`, true);
}
