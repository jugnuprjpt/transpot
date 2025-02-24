import { http } from "../_apiConfig/http";
import { RouteUrls } from "../_apiConfig/routeUrls";
import api from "../_apiConfig/baseapi";

export const manualServices = {
  manualTenderInsert,
  manualTenderGetId,
  manualTenderDocumentInsert,
  manualTenderUpdate,
  fileDownload,
  documentsDelete,
  manualTenderDelete,
};

// function manualTenderInsert(data) {
//   return http.post(
//     `${RouteUrls.manualTenderInsert}?tender_number=${
//       data.tender_number
//     }&estimated_cost=${
//       data.estimated_cost
//     }&submission_date=${data.submission_date
//       .toString()
//       .trim()}&organization_id=${data.organization_id}&organization_type_id=${
//       data.organization_type_id
//     }&site_location=${data.site_location}&tender_id=${
//       data.tender_id
//     }&work_brief=${data.work_brief}&city_id=${data.city_id}&keyword_id=${
//       data.keyword_id
//     }&document_fees=${data.document_fees}&earnest_money_deposite=${
//       data.earnest_money_deposite
//     }&tender_opening_date_time=${data.tender_opening_date_time
//       .toString()
//       .trim()}&user_email_service_query_id=${data.user_email_service_query_id}`,
//     {
//       document_path: data?.document_path,
//     },
//     true,
//     {
//       "Content-Type": "multipart/form-data",
//     }
//   );
// }
function manualTenderInsert(data) {
  return http.post(
    RouteUrls.manualTenderInsert,
    // `${}?tender_number=${
    //   data.tender_number
    // }&estimated_cost=${
    //   data.estimated_cost
    // }&submission_date=${data.submission_date
    //   .toString()
    //   .trim()}&organization_id=${data.organization_id}&organization_type_id=${
    //   data.organization_type_id
    // }&site_location=${data.site_location}&tender_id=${
    //   data.tender_id
    // }&work_brief=${data.work_brief}&city_id=${data.city_id}&keyword_id=${
    //   data.keyword_id
    // }&document_fees=${data.document_fees}&earnest_money_deposite=${
    //   data.earnest_money_deposite
    // }&tender_opening_date_time=${data.tender_opening_date_time
    //   .toString()
    //   .trim()}&document_sale_start_date_time=${
    //   data.document_sale_start_date_time
    // }&user_email_service_query_id=${data.user_email_service_query_id}`,
    data,
    true,
    {
      "Content-Type": "multipart/form-data",
    }
  );
}

function manualTenderGetId(data) {
  return http.get(`${RouteUrls.manualTenderGetId}/${data}`, true);
}

function manualTenderDocumentInsert(tender_id, data) {
  return http.post(
    `${RouteUrls.manualTenderDocumentInsert}?tender_id=${tender_id}`,
    data,
    true,
    {
      "Content-Type": "multipart/form-data",
    }
  );
}
function manualTenderUpdate(data) {
  return http.update(RouteUrls.manualTenderUpdate, data, true);
}
async function fileDownload(data) {
  const response = await fetch(
    `${api.defaults.baseURL}${RouteUrls.manualTenderFile}?file_path=${data.file_path}&tender_id=${data.tender_id}`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
  return response;
}
function documentsDelete(data) {
  return http.remove(
    `${RouteUrls.manualTenderFileDelete}?fileName=${data.fileName}&tender_id=${data.tender_id}&document_id=${data?.document_id}`,
    true
  );
}
function manualTenderDelete(data) {
  return http.remove(`${RouteUrls.manualTenderDelete}/${data}`, true);
}
