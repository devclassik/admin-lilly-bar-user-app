import axios from "axios";
import { toast } from "react-toastify";

// Axios instance configuration
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:8000/api", // Default baseURL fallback
});

// Helper function to get the access token from 'ar'
const getAccessToken = () => {
  const authData = localStorage.getItem("ar");
  if (authData) {
    try {
      const parsedData = JSON.parse(authData);
      return parsedData.access || null;
    } catch (error) {
      console.error("Error parsing 'ar' from localStorage:", error);
      return null;
    }
  }
  return null;
};

api.interceptors.request.use(
  (config) => {
    const token = getAccessToken();
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = error.response?.data?.message || "Something went wrong!";
    toast.error(message);
    return Promise.reject(error);
  }
);

export const postData = async (url, data) => {
  try {
    const response = await api.post(url, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getData = async (url, params = {}) => {
  try {
    const response = await api.get(url, { params });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateData = async (url, data, method = "PUT") => {
  try {
    const response =
      method === "PATCH"
        ? await api.patch(url, data)
        : await api.put(url, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteData = async (url) => {
  try {
    const response = await api.delete(url);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default api;
