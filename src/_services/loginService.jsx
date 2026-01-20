import { http } from "../_apiConfig/http";
import { RouteUrls } from "../_apiConfig/routeUrls";

export const loginService = {
  login,
  Autologin,
};

// function login(data) {
//   return http.post(RouteUrls.login, data, false);
// }

function login(data) {
  return http.post(
    `${RouteUrls.login}`,
   data,
   false
  );
}

function Autologin(data) {
  return http.post(`${RouteUrls.autologin}/${data}`, data, false);
}
