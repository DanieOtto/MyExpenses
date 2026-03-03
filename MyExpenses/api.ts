import axios from "axios";
const api = axios.create({
  baseURL: "https://your-api.example.com", // set your backend URL
  headers: { "Content-Type": "application/json" },
});
export default api;
