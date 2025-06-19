export const RouteUrls = {
  login: "/api/user/login",

  // --------------Doc-management--------------

  docManagementListing: "api/driver_document_management/get",
  documentInsert: "api/driver_document_management/insert",
  documentInsertMonthbulkWise:
    "api/driver_document_management/insert/bulk/month_wise",
  driverListing: "api/user/get",
  companyListing: "api/load/get_all_company_name",

  // --------------Load-management--------------

  loadManagementListing: "api/load/get",
  loadManagementListingByStatus: "api/load/get/status_id",
  loadInsert: "api/load/insert",
  loadAssigment: "api/load/get/assignment_details",
  loadAssign: "api/load/assign",
  loadCancel: "api/load/cancel_load",
  loadInProgress: "api/load/in_progress",
  progressComplated: "api/load/completion",

  // --------------Invoice--------------
  invoicePendingInvoiced: "api/invoice_summary/by-invoiced-status",
  invoiceComplete: "api/invoice_summary/get_paid_invoices",
  requestToInvoiceId: "api/invoice_summary/get_pending_charges",
  invoiceComplated: "api/invoice_summary/get_paid_invoices",
  requestToInvoice: "api/load/request_to_invoice",
  requestToComplete: "api/invoice_summary/update_payment_status",
  // --------------Driver dipatch--------------
  driverDispatchListing: "api/driver_summary/get",
};

// companyName
// :
// "ARRIVE LOGISTICS, LLC"
// driverName
// :
// "Tom Brown"
// invoiceDate
// :
// "05-11-2025"
// invoiceNumber
// :
// 202504070003
// isInvoiced
// :
// false
// loadNumber
// :
// "LD-05"
// paymentReceivedDate
// :
// null
// paymentStatus
// :
// "Pending"
// [[Prototype]]
// :
// Object
