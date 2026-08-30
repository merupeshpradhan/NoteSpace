import axios from "axios";

// Base API instance with automatic cookie handling
const api = axios.create({
  baseURL: "http://localhost:4000/api/v1",
  withCredentials: true,
});

let isRefreshing = false;
let failedQueue = [];

// Helper to retry or reject queued requests
const processQueue = (error) => {
  failedQueue.forEach((prom) => {
    error ? prom.reject(error) : prom.resolve();
  });
  failedQueue = [];
};

// Response interceptor to catch expired tokens
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If access token expired (401)
    if (error.response?.status === 401 && !originalRequest._retry) {
      // Stop infinite loop if refresh route itself fails
      if (originalRequest.url === "/users/refresh-token") {
        window.location.href = "/";
        return Promise.reject(error);
      }

      // Hold incoming requests in a queue while refreshing
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then(() => api(originalRequest))
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        await api.post("/users/refresh-token"); // Request new token
        processQueue(null); // Release queued requests
        return api(originalRequest); // Retry failed request
      } catch (refreshError) {
        processQueue(refreshError);
        window.location.href = "/"; // Logout if refresh fails
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  },
);

export default api;
