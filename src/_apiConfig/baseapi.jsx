// import axios from "axios";

// const apiurl =
//   "https://c2f5-2409-40c2-129c-f4b3-c4a6-b07-8fee-ab8e.ngrok-free.app";

// export default axios.create({
//   baseURL: apiurl,
//   environment: "Live",
//   DonwloadDoc: apiurl,
// });

import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 30000,
  withCredentials: true,
});

export default api;
