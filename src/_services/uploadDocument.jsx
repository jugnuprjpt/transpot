import { http } from "../_apiConfig/http";
import { RouteUrls } from "../_apiConfig/routeUrls";
import api from "../_apiConfig/baseapi";

export const uploadDocument = {
  docuementInsert,
  docuementList,
  docuementDelete,
  uploadDocDownload,
  docuementUpdate,
  docuementGetSingle,
  docushowDelete,
};

function docuementInsert(data) {
  return http.post(`${RouteUrls?.docuementInsert}`, data, true, {
    "Content-Type": "multipart/form-data",
  });
}

function docuementList(data) {
  return http.get(`${RouteUrls.docuementList}/${data.tender_id}`, data, true);
}

function docushowDelete(data) {
  return http.get(`${RouteUrls.docushowDelete}/${data.tender_id}`, data, true);
}

function docuementGetSingle(data) {
  return http.get(`${RouteUrls.docuementGetSingle}/${data}`, true);
}

function docuementDelete(data) {
  return http.remove(
    `${RouteUrls.docuementDelete}/${data.tender_pre_post_doc_id}/${data.tender_id}/${data.document_type_id}`,
    data,
    true
  );
}

async function uploadDocDownload(data) {
  const response = await fetch(
    `${api.defaults.baseURL}${RouteUrls.uploadDocDownload}?file_path=${data.file_path}&tender_id=${data.tender_id}&document_type_id=${data.document_type_id}&is_deleted_document=${data.is_deleted_document}`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
  return response;
}

function docuementUpdate(data) {
  return http.update(
    `${RouteUrls.docuementUpdate}?tender_pre_post_doc_id=${
      data.tender_pre_post_doc_id
    }&tender_id=${data.tender_id}&document_type_id=${
      data.document_type_id
    }&document_name=${data.document_name}
    &document_path=${
      typeof data.document_path === "string" ? data.document_path : ""
    }`,
    {
      file_data:
        typeof data.document_path === "object" ? data.document_path : {},
    },
    true,
    {
      "Content-Type": "multipart/form-data",
    }
  );
}
