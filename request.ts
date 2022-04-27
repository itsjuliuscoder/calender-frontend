import axios from "axios";
/**
 * Helper function that configures axios requests
 * @param {object} config The configuration data.
 * route - The route to make request to. e.g profiles, search?q=term&size=5
 * method - The HTTP method to use. e.g post, get, patch,
 * payload - The request body payload
 * token - The authorization token to use if any
 * @returns {Promise} The axios promise
 */
const request = async ({ route, method, payload, params }) => {
  const token = "";
  method = method || "get";
  const headers = {
    Accept: "application/json",
    Authorization: token,
  };
  if (!token) {
    delete headers.Authorization;
    delete headers.companyId;
  }
  return axios({
    data: payload,
    // url: `${process.env.NEXT_PUBLIC_API_URL}/v1/${route}`,
    url: `https://api.oleefee.com/v1/${route}`,
    method,
    headers,
    params,
  });
};

export default request;
