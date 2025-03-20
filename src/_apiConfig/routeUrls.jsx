export const RouteUrls = {
  login: "/api/user/login",

  // --------------Doc-management--------------

  docManagementListing: "api/driver_document_management/get",
  driverListing: "api/user/get",
  documentInsert: "api/driver_document_management/insert",

  autologin: "api/user/get-auto-login",
  getSearchTender: "api/tender/search",
  getTenderResultSearch: "api/result/search",
  getTenderCount: "api/tender/search/count",
  getTenderResultCount: "api/result/search/count",
  getTenderDetails: "api/tender/detail",
  tenderDownloadNew: "api/manual_tender/download_document/zip",
  tenderSubmitInsert: "api/prepare_respose/tender_submitted/insert",
  tenderChecklistListing: "api/prepare_respose/check_list/get",
  tenderActivityLog: "api/tender/tenderActivityLog/get",
  getSiteLocationDetail: "api/tender/site_location/detail/get",
  getTenderResultDetails: "api/result/detail/get",
  getSiteLocationTenderResultDetail: "api/result/site_location/detail/get",
  getUserManagementUpdatePassword: "api/user/change_password",
  getBidderListDetail: "api/result/participating_bidder/get",
  fileRevokeDownload: "api/tender/download/documents/revoke",
  salesmisExport: "api/tender/sales_mis/export_excel",
  tenderInterested: "api/tender/interested/update",
  getTenderReminder: "api/tender_reminder/get",
  insertTenderReminder: "api/tender_reminder/insert",
  tenderReminderByUserId: "api/tender_reminder/get/user_id",
  updateTenderReminder: "api/tender_reminder/update",
  insertTenderAssignment: "api/tender/assignment/insert",
  getTenderAssignment: "api/tender/assignment/get",
  tenderStatusMaster: "api/tender/status_master/get",
  getOrganization: "api/authority/get",
  gettenderAssignmentById: "/api/tender/assignment/get/id",
  updateTenderAssignment: "api/tender/assignment/update",
  downloadForZip:
    "https://document.bidmorning.com/NewT247DocumentDownloadApplication/result-download-document-all",
  deleteTenderAssignment: "api/tender/assignment/delete",
  getAllRequestType: "api/finance/request/type/get/all",
  getAllInstrumentType: "api/finance/instrument_type/get/all",
  insertFinanceRequest: "api/finance/request/insert",
  getFinanceRequestByTenderId: "api/finance/request/get/tender_id",
  getFinanceRequestById: "api/finance/request/get/id",
  updateFinanceRequest: "api/finance/request/update",
  fileDownload: "api/document/download_document",
  financefileDownload: "api/finance/download_document",
  tenderDownload:
    "https://document.bidmorning.com/NewT247DocumentDownloadApplication/tender-download-document-all",

  tenderDetailDownload:
    "https://document.bidmorning.com/NewT247DocumentDownloadApplication/tender-download-document",
  getApprovalByApprovalId: "api/tender_approval/get/approval_id",
  tenderStatusInsert: "api/tender/status-insert",
  gettenderStatus: "api/tender_submitted/get",
  tenderAssignDownload: "api/tender/download-all-files",

  // ******************************dashBoard*************************//
  dashbaordCalender: "api/dashboard/calendar",
  dashbaordTenderActivityAssignToTeam:
    "api/dashboard/tender_activity/assign_to_team",
  dashbaordTenderActivityReminder: "api/dashboard/tender_activity/reminder",
  dashbaordTenderActivityKickOffCall:
    "api/dashboard/tender_activity/kick_of_call",
  dashbaordTenderActivityInprocess: "api/dashboard/tender_activity/inprocess",
  dashbaordTenderActivityAssignTo: "api/dashboard/tender_activity/assign_to",
  dashbaordTenderActivityApproval: "api/dashboard/tender_activity/approval",

  // ******************************FinanceDashBoard*************************//
  financeDashbaordCalender: "api/dashboard/finance_dashboard_calendar/count",
  getFinanceDashboard: "api/dashboard/finance-dashboard/get",
  financeActivity: "api/dashboard/finance_activity",

  // ******************************Mis*************************//
  misFinanceCount: "api/mis_finance/count/get",
  misFinanceSearchCount: "api/mis_finance/mis/search/count/get",
  misFinanceSearch: "api/mis_finance/mis/search",
  misReportDownload: "api/mis_finance/export_excel",
  getAllSalesMis: "api/tender/sales_mis/get",
  getTenderAssignSales: "api/tender/sales_mis_details/get",
  getAllLoginMis: "api/user/login_report",

  // ******************************Common*************************//
  tenderFilterStates: "api/location/state/get",
  tenderFilterCity: "api/location/city/get",
  tenderFilterOrganizationType: "api/authority/authority_type/get",
  tenderFilterKeyWord: "api/common/keyword/get",
  tenderFilterKeyWordName: "api/common/keyword/get/name",
  manualTenderLocation: "api/manual_tender/location/get/name",
  getAllOwnership: "/api/authority/authority_type/get",

  // ******************************User*************************//
  getAllUserManagement: "api/user/get",
  userManagementInsert: "api/get-All-user",
  getUserManagementById: "api/user/get/id",
  getUserManagementUpdate: "api/user/get/id",
  userManagementDelete: "api/user/get/id",
  getUserById: "api/user/get/id",
  userMasterInsert: "api/user/insert",
  deleteUserById: "api/user/delete",
  updateUser: "api/user/update",
  userType: "api/user/get/user_type",

  // ******************************Designation*************************//
  getAllDesignations: "api/designation/get/all",
  getDesignationUpdate: "api/designation/update",
  DesigantionDelete: "api/designation/delete",
  designationInsert: "api/designation/insert",
  getDesignationById: "api/designation/get/id",

  // ******************************Department*************************//
  deparmentInsert: "api/department/insert",
  getDeparmentById: "api/department/get/id",
  getDeparmentUpdate: "api/department/update",
  DeparmentDelete: "api/department/delete",
  getAllDepartments: "api/department/get/all",

  // ******************************Role*************************//
  getAllRole: "api/role/get",
  roleInsert: "api/role/insert",
  getRoleById: "api/role/get/id",
  roleDelete: "api/role/delete",
  getRoleUpdate: "api/role/update",
  moduleMasterGetByRoleId: "api/role/module_master/get/role_id",
  moduleMasterActionGetByRoleId: "api/role/module_master_action/get/role_id",
  insertRoleModuleMapping: "api/role/module_mapping/insert",
  insertRoleModuleMappingAction: "api/insert-role-module-mapping-action",

  // ******************************Approval*************************//
  updateApprovalStatus: "api/tender_approval/status/update",
  approvalStatusCancel: "api/tender_approval/status/cancel",
  getAllTenderApproval: "api/tender_approval/get/status_master",
  getApprovalSearch: "api/tender_approval/search",
  getApprovalSearchCount: "api/tender_approval/search-count",
  getApprovalTenderById: "api/tender_approval/get/tender_id",
  getApprovalStatus: "api/tender_approval/status/get",
  insertTenderApproval: "api/tender_approval/insert",
  getApprovalByTenderId: "api/tender_approval/get/tender_id",
  getApproval: "api/tender/get/approval_user",
  fileDownloadBeforeApproval: "api/tender_approval/download_document",

  // ******************************kick   off call*************************//
  gettKickOffCallByTenderId: "api/koc/get/tender_id",
  getKickOffCallGetById: "api/koc/get/id",
  getKickOffCallMom: "api/koc/mom/get/id",
  insertKickOffCall: "api/koc/insert",
  insertKickOffCallMom: "api/koc/mom/insert",
  kickOffCallReschedule: "api/koc/reschedule",
  updateKickOffCallMom: "api/koc/mom/update",
  updateKickOffCall: "api/koc/update",
  deleteFileKickOfCall: "api/koc/koc_document_delete",
  cancelKickOffCall: "api/koc/cancel",
  kickOffEditFile: "api/koc/multiple_doc/insert",

  // ******************************document-download*************************//
  getAllBriefDocument: "api/brief-case-search",
  getAllBrief: "api/briefcase/get/all",
  insertBriefDocument: "api/brief-case-insert",
  updateBriefDocument: "api/brief-case-update",
  deleteBriefDocument: "api/brief-case-delete",
  downloadBriefDocument: "api/download-document",
  getAllBriefDocumentById: "api/get-brief-case-by-id",
  getAllFolders: "api/get-all-folders",
  getSubFolders: "api/get-sub-folders-by-id",
  insertFolder: "api/insert-folder",
  updateFolder: "api/update-folder",
  deleteFolder: "api/delete-folder",
  searchDocumentInTable: "api/brief-case-search",
  mainFolderList: "api/get-folders-main-list",
  getFolderById: "api/get-sub-folder-name",

  fileDownloadForMom: "api/koc/download_document",
  fileDownloadKickOfCall: "api/koc/download_document",

  // *******************************document-mangement********************//
  newInsertFolder: "api/folder/insert",
  newgetAllFolder: "api/folder/get/all",
  newFolderUpdate: "api/folder/update",
  newFolderById: "api/folder/details/get",
  newgetMainFolders: "api/folder/main_list/get",
  newDeleteFolder: "api/folder/delete",
  newgetAllSubFolder: "api/folder/sub_folder/get",

  // briefcase new.....
  getNewAllBriefDocument: "api/briefcase/search",
  getBriefForEditNew: "api/briefcase/get/id",
  newInsertBrief: "api/briefcase/insert",
  newdeleteBriefDocument: "api/briefcase/delete",
  newBriefDownload: "api/briefcase/download/document",
  newBriefUpdate: "api/briefcase/update",

  /* ************************ Finance Management ************************ */
  getFinanceRequestSearch: "api/finance/request/search",
  getFinanceApproval: "api/finance/get/approval_user",
  getFinanceRequestSearchCount: "api/finance/request/search/count/get",
  getFinanceRequestSearchById: "api/finance/request/get/id",
  getFinanceRequestSearchByTenderId: "api/finance/request/get/tender_id",
  financeRequestApprovalInsert: "api/finance/request/approval/insert",
  followupRequestInsert: "api/finance/follow_up/insert",
  getfollowupRequestById: "api/finance/follow_up/get/request_id",
  getRequestApprovalById: "api/finance/request/approval/get/request_id",
  financeRequestReassignInsert: "api/finance/request/assign",
  getRequestAssignmentById:
    "api/finance/request/assignment_tracking/get/request_id",
  getAllFinanceStatusMaster: "api/finance/status_master/get/all",
  financePaymentDetailsInsert: "api/finance/payment_details/insert",
  financeRequestApprovalUpdate: "api/finance/request/approval_status/update",
  getFinancePaymentDetailsGetById: "api/finance/payment_details/get/id",
  getFinanceRequestAssignmentTrackingByRequestId:
    "api/finance/request/assignment_tracking/get/request_id",
  getFinanceRequestUpdateMasterGetAll:
    "api/finance/request/update_status_master/get/all",
  getFinanceRequestUpdateMasterGetid:
    "api/finance/request/update_status_master/get/id",
  getFinanceRequestUpdateMasterInsert:
    "api/finance/request/update_status_master/update",
  getFinanceRequestUpdateMasterHistory:
    "api/finance/request/update_status_master/history/get/id",
  FinanceEditFile: "api/finance/finance_multiple_doc/insert",
  deleteFinanceFile: "api/finance/document_delete",
  tenderDownloadDetails:
    "https://www.tender247.com/apigateway/T247Tender/api/tender/tender-document-list",

  /* ************************ Tender task ************************** */
  getTenderTaskCount: "api/tender/search/task/count",
  getTenderTask: "api/tender/search/task",
  getTenderCountWork: "api/task_allocation/search/count",
  getTenderListing: "api/task_allocation/search",
  tenderAllWorkDownload: "api/task_allocation/export_excel",
  tenderFilterWork: "api/task_allocation/status/get",

  /* ************************ Tender Checklist ********************* */
  getTenderSubmittedCheckListByTenderId:
    "api/prepare_respose/tender_submitted/check_list",
  getTenderSubmittedDetailsTenderId:
    "api/prepare_respose/tender_submitted_details",
  uploadResponse: "api/prepare_respose/upload_response",
  TenderSubmittedCheckListInsert:
    "api/prepare_respose/tender-submitted/check_list/insert",
  TenderSubmittedCheckListRemove:
    "api/prepare_respose/tender_submitted/check_list/delete",
  tenderResponseRemove: "api/prepare_respose/tender_submitted_details/delete",
  TenderSubmittedDetailInsert:
    "api/prepare_respose/tender_submitted_details/insert",
  TenderSubmittedUpdate: "api/prepare_respose/tender_submitted/update",
  getAllResponseType: "api/prepare_respose/response_type/get",
  getTenderSubmittedStatus: "api/tender_submitted/tender/status/get",
  prepareResponseDownload: "api/prepare_respose/download_document",

  /* ************************ OEM ********************* */
  dealerMasterInsert: "api/oem/dealer/insert",
  oemInsert: "api/oem/insert",
  oemSearch: "api/oem/search",
  oemSearchCount: "api/oem/search/count",
  getDealer: "api/oem/dealer/get",
  getOemById: "api/oem/get/id",
  dealerSearch: "api/oem/dealer/search",
  dealerSearchCount: "api/oem/dealer/search/count",
  getdealerById: "api/oem/dealer/get/id",
  DealerUpdate: "api/oem/dealer/update",
  oemUpdate: "api/oem/update",
  deleteDealer: "api/oem/dealer/delete",
  deleteOem: "api/oem/delete",
  authDownloadFile: "api/oem/download/auth_document",
  poDownloadFile: "api/oem/download/po_document",
  followUpGetId: "api/oem/followup/get/id",
  followUpInsert: "api/oem/followup/insert",
  getTenderStatus: "api/oem/get/tender_status",
  StatusUpdate: "api/oem/status_update",

  /*******************manual-tender-controller********************/
  manualTenderInsert: "api/manual_tender/manualTenderinsertForMultipleFile",
  manualTenderGetId: "api/manual_tender/get/id",
  manualTenderDocumentInsert: "api/manual_tender/document/insert",
  manualTenderUpdate: "api/manual_tender/update",
  manualTenderFile: "api/manual_tender/download/document",
  manualTenderFileDelete: "api/manual_tender/document/delete",
  manualTenderDelete: "api/manual_tender/delete",

  /*******************bulk-tender-upload********************/
  bulkTenderListing: "api/bulk_tender/get/all",
  bulkTenderInsertExcel: "api/bulk_tender/insert/with/excel",
  bulkTenderDownload: "api/bulk_tender/download/sample/excel/document",
  bulkTenderDownloadFromListing: "api/manual_tender/download/document",

  /******************* upload Document ********************/
  docuementInsert: "api/pre_post_document/insert/",
  docuementList: "api/pre_post_document/get/all",
  docuementDelete: "api/pre_post_document/delete",
  uploadDocDownload: "api/pre_post_document/download/document/",
  docuementUpdate: "api/pre_post_document/update",
  docuementGetSingle: "api/pre_post_document/get",
  docushowDelete: "api/pre_post_document/get/deleted/document",

  /******************* Import Excel Docuement ********************/
  // delearsDownload: "api/oem/dealer/export_excel",
  delearsDownload: "api/oem/dealer/export_excel/allDealerData",
  oemDownload: "api/oem/OEM/export_excel",
  newrequestDownload: "api/finance/newRequest/export_excel",
  approvalDownload: "api/tender_approval/approvals/export_excel",

  tenderListDownload: "api/tender/tenderList/export_excel",
  tenderResultDownload: "api/result/export_excel",
  tenderTaskDownload: "api/tender/tenderTask/export_excel",

  /******************* Download All ********************/
  prePostDownloadAll: "api/tender/download-zip-pre-post-document",
  prepareChecklistDownloadAll:
    "api/prepare_respose/download-zip-for-tender-checklist",
  briefCaseDownloadAll:
    "api/briefcase/download-zip-folder-for-individual-brief-case-documents",
  folderDownloadAll: "api/briefcase/download-zip-folder-for-brief-case",

  /******************* Profile ********************/
  profileInsert: "api/profile/user-profile-mapping-insert",
  profileId: "api/profile/get",
  profileList: "api/profile/profile/get",
  profileDelete: "api/profile/delete",

  profileDataInsert: "api/profile/profile/profile_insert",
  profileDataId: "api/profile/user_profile_mapping/get",
  profileDataUpdate: "api/profile/profile/profile_update",
  profileDataDelete: "api/profile/user_profile_mapping/delete",

  /******************* Cheklist ********************/
  checklistInsert: "api/check_list/insert",
  checklistId: "api/check_list/get/id",
  checklistUpdate: "api/check_list/update",
  checklistListing: "api/check_list/get/all",
  checklistDelete: "api/check_list/delete/id",

  checklistMapingInsert: "api/check_list/document/insert",
  checklistMapingUpdate: "api/check_list/document/update",
  checklistMapingDelete: "api/check_list/document/delete",
  checklistMapingId: "api/check_list/document/get/check_list_id",
  checklistMapingDownload: "api/check_list/download_document",

  checklistTenderSubmitted: "api/tender/tender_submitted/get/id",
  checklistStanadradSubmit: "api/check_list/type/update",

  /******************* eligibility Summary ********************/
  eligibilitySummary:
    "https://www.tender247.com/apigateway/T247TenderAI/api/summary",
  probidderList:
    "https://www.tender247.com/apigateway/t247resultinsights/detail/insights-highest-top-participate-bidder",
  productGetId: "api/tender/tender/insight/get",
  maxiumWinList:
    "https://www.tender247.com/apigateway/t247resultinsights/detail/insights-highest-top-win-bidder",

  /******************* Rewoak ********************/
  getAllHistoryRevoked: "api/tender/tender_status/update_history/get/id",

  /******************* Task Allocation ********************/
  taskAllocationListing: "api/task_allocation/task/tender_id/get",
  taskAllocationInsert: "api/task_allocation/insert",
  taskAllocationUpdate: "api/task_allocation/update",
  taskAllocationEdit: "api/task_allocation/get/task_id",
  taskAllocationFileAdded: "api/task_allocation/task_allocation_doc/insert",
  taskAllocatedDownload: "api/task_allocation/download-all-files",
  taskAllocationFileDelete: "api/task_allocation/document/delete",

  /******************* Activity ****************************/
  taskAllocationDetails: "api/task_allocation/get/task_id",
  taskActivityHistory: "api/task_allocation/activity/get",
  taskActivityHistoryDelete: "api/task_allocation/activity/delete",

  /******************** Task Review ***********************/
  taskAssignerInsert: "api/task_allocation/activity/insert",

  /******************** Task Followup ***********************/
  taskAllocationFollowListing:
    "api/task_allocation/task_follow_up/get_by_task_id",
  taskAllocationFollowInsert: "api/task_allocation/task_follw_up/insert",
  taskAllocationFollowEdit:
    "api/task_allocation/task_follw_up/get_by_followup_id",
  taskAllocationFollowUpdate: "api/task_allocation/task_follw_up/update",
  taskAllocationFollowDelete: "api/task_allocation/task_follw_up/delete",
};
