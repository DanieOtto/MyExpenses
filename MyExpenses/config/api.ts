import axios from "axios";
const api = axios.create({
  baseURL:
    "https://manualexpesetracker-b7aaevhkgjgtfbb2.southafricanorth-01.azurewebsites.net",
  headers: { "Content-Type": "application/json" },
});
export default api;
