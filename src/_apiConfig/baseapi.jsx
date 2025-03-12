import axios from "axios";

const apiurl =
  "https://da04-2409-40c2-2057-ee19-5cfb-7afa-33a-23ac.ngrok-free.app";

export default axios.create({
  baseURL: apiurl,
  environment: "Live",
  DonwloadDoc: apiurl,
});
