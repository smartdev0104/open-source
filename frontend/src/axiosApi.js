import axios from "axios";

const axiosApi = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

// Add a response interceptor
axiosApi.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API call error:", error);
    return Promise.reject(error);
  }
);

export default axiosApi;
