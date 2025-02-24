import { http } from "../_apiConfig/http";
import { RouteUrls } from "../_apiConfig/routeUrls";

export const FinamcedashBoardServices = {
  getFinanceDashboard,
  financeDashbaordCalender,
  financeActivity,
  misFinanceCount,
};

function getFinanceDashboard() {
  return http.get(RouteUrls.getFinanceDashboard, true);
}
function misFinanceCount() {
  return http.get(RouteUrls.misFinanceCount, true);
}
function financeDashbaordCalender(data) {
  return http.post(RouteUrls.financeDashbaordCalender, data, true);
}
function financeActivity(data) {
  return http.post(RouteUrls.financeActivity, data, true);
}
