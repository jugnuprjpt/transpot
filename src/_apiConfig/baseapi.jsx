import axios from "axios";

//const apiurl = "http://192.168.7.81:9400/";
const apiurl = "https://nationalinfra.tender247.com/";
//  const apiurl = "http://192.168.8.128:9400/";

export default axios.create({
  baseURL: apiurl,
  environment: "Live",
  DonwloadDoc: apiurl,
});
