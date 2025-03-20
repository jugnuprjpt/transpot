import api from "../../src/_apiConfig/baseapi";
import { ApiResponse } from "../../src/_apiConfig/api.response";
import axios from "axios";

export const http = {
  get,
  post,
  logout,
  update,
  remove,
  download,
  downloadBob,
  downloadExcel,
};

function get(routeUrl, isToken, customHeader = "") {
  return new Promise((resolve) => {
    return api
      .get(routeUrl, { headers: getHeaders(isToken, customHeader) })
      .then((res) => {
        resolve(res.data);
      })

      .catch(function (err) {
        try {
          if (err.response.status === 401) {
            logout();
          }
          console.log(err, "err");
          resolve(
            ApiResponse(false, err.response.data.Message, false, err.code, 0)
          );
        } catch (commonerror) {
          resolve(ApiResponse(false, err.message, false, err.code, 0));
        }
      });
  });
}

function post(routeUrl, formdata, isToken, customHeader = "") {
  return new Promise((resolve) => {
    return api
      .post(routeUrl, formdata, { headers: getHeaders(isToken, customHeader) })
      .then((res) => {
        resolve(res.data);
      })
      .catch(function (err) {
        try {
          if (err.response.status === 401) {
            logout();
          }
          resolve(
            ApiResponse(false, err.response.data.Message, false, err.code, 0)
          );
        } catch (commonerror) {
          resolve(ApiResponse(false, err.message, false, err.code, 0));
        }
      });
  });
}

function update(routeUrl, formdata, isToken, customHeader = "") {
  return new Promise((resolve) => {
    return api
      .put(routeUrl, formdata, { headers: getHeaders(isToken, customHeader) })
      .then((res) => {
        resolve(res.data);
      })
      .catch(function (err) {
        try {
          if (err.response.status === 401) {
            logout();
          }
          resolve(ApiResponse(false, err.message, false, err.code, 0));
        } catch (commonerror) {
          resolve(ApiResponse(false, err.message, false, err.code, 0));
        }
      });
  });
}

function remove(routeUrl, isToken, customHeader = "") {
  return new Promise((resolve) => {
    return api
      .delete(routeUrl, { headers: getHeaders(isToken, customHeader) })
      .then((res) => {
        resolve(res.data);
      })
      .catch(function (err) {
        try {
          if (err.response.status === 401) {
            logout();
          }
          resolve(
            ApiResponse(false, err.response.data.Message, false, err.code, 0)
          );
        } catch (commonerror) {
          resolve(ApiResponse(false, err.message, false, err.code, 0));
        }
      });
  });
}

function download(routeUrl, isToken, customHeader = "") {
  return new Promise((resolve) => {
    return api
      .get(routeUrl, { headers: getHeaders(isToken, customHeader) })
      .then((res) => {
        resolve(res.blob());
      })
      .catch(function (err) {
        try {
          if (err.response.status === 401) {
            logout();
          }
          resolve(ApiResponse(false, err.message, false, err.code, 0));
        } catch (commonerror) {
          resolve(ApiResponse(false, commonerror.message, false, err.code, 0));
        }
      });
  });
}

function downloadBob(routeUrl, DownloadFileName, isToken, customHeader = "") {
  axios({
    url: routeUrl,
    method: "GET",
    responseType: "blob",
  })
    .then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", DownloadFileName);
      document.body.appendChild(link);
      link.click();
    })
    .catch(function (err) {
      try {
        if (err.response.status === 401) {
          logout();
        }
        resolve(ApiResponse(false, err.message, false, err.code, 0));
      } catch (commonerror) {
        resolve(ApiResponse(false, err.message, false, err.code, 0));
      }
    });
}
// function downloadBob(routeUrl, DownloadFileName, isToken, customHeader = "") {
//   const headers = {};

//   // Add authorization token to headers if isToken is true
//   if (isToken) {
//     // const authToken = getAuthToken(); // Replace this with your actual function to retrieve the authorization token
//     headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
//   }

//   // Add custom headers if provided
//   if (customHeader) {
//     Object.assign(headers, customHeader);
//   }

//   axios({
//     url: routeUrl,
//     method: "GET",
//     responseType: "blob",
//     headers: headers, // Set the headers for the request
//   })
//     .then((response) => {
//       const url = window.URL.createObjectURL(new Blob([response.data]));
//       const link = document.createElement("a");
//       link.href = url;
//       link.setAttribute("download", DownloadFileName);
//       document.body.appendChild(link);
//       link.click();
//     })
//     .catch(function (err) {
//       try {
//         if (err.response && err.response.status === 401) {
//           logout();
//         }
//         resolve(ApiResponse(false, err.message, false, err.code, 0));
//       } catch (commonerror) {
//         resolve(ApiResponse(false, err.message, false, err.code, 0));
//       }
//     });
// }

// function downloadBob(routeUrl, DownloadFileName, isToken, customHeader = "") {
//   axios({
//     url: routeUrl,
//     method: "GET",
//     responseType: "blob",
//   })
//     .then((response) => {
//       const url = window.URL.createObjectURL(new Blob([response.data]));
//       const link = document.createElement("a");
//       link.href = url;
//       link.setAttribute("download", DownloadFileName);
//       document.body.appendChild(link);
//       link.click();
//     })
//     .catch(function (err) {
//       try {
//         if (err.response.status === 401) {
//           logout();
//         }
//         resolve(ApiResponse(false, err.message, false, err.code, 0));
//       } catch (commonerror) {
//         resolve(ApiResponse(false, err.message, false, err.code, 0));
//       }
//     });
// }

// async function downloadExcel(url, requestData) {
//   console.log(url, "url");
//   console.log(requestData, "requestData");
//   try {
//     debugger;
//     const requestOptions = {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/pdf",
//       },
//       body: JSON.stringify(requestData),
//     };
//     const response = await fetch(url, requestOptions);

//     if (!response.ok) {
//       throw new Error(
//         `API request failed: ${response.status} ${response.statusText}`
//       );
//     }
//     return response;
//   } catch (error) {
//     console.error("Error while fetching the document:", error);
//     throw error;
//   }
// }

async function downloadExcel(url, requestData, isToken, customHeader = "") {
  try {
    const requestOptions = {
      method: "POST",
      headers: getHeaders(isToken, customHeader),
      body: JSON.stringify(requestData),
    };
    const response = await fetch(url, requestOptions);
    if (!response.ok) {
      throw new Error(
        `API request failed: ${response.status} ${response.statusText}`
      );
    }
    if (response.status === 204) {
      return alert("No Record Found");
    }
    return response;
  } catch (error) {
    console.error("Error while fetching the document:", error);
    resolve(ApiResponse(false, error.message, false, err.code, 0));
    throw error;
  }
}

export function logout() {
  localStorage.removeItem("token");
  localStorage.clear();
  setTimeout(() => {
    window.location.href = "/login";
  }, 500);
}

function getHeaders(boolToken, custheader) {
  if (boolToken) {
    const userdata = localStorage.getItem("token");

    // const userdata = store.getState().auth?.data?.token;
    if (userdata) {
      return custheader === ""
        ? {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${userdata}`,
          }
        : {
            ...custheader,
            Authorization: `Bearer ${userdata}`,
          };
    } else {
      window.location = "/";
    }
  } else {
    return custheader === ""
      ? { Accept: "application/json", "Content-Type": "application/json" }
      : custheader;
  }
}
