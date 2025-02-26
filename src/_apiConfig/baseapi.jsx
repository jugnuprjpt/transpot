import axios from "axios";

const apiurl =
  "https://e137-2409-40c1-403f-28a8-59d1-3652-2b9f-d726.ngrok-free.app";

export default axios.create({
  baseURL: apiurl,
  environment: "Live",
  DonwloadDoc: apiurl,
});
