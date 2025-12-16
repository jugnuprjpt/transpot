// import axios from "axios";

// const apiurl = "https://ded575057d1d.ngrok-free.app";

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
