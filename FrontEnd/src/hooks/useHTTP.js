import { useState, useCallback } from "react";
import axios from "axios";

const useHttp = (baseURL = "") => {
  // State management
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Create axios instance with default configuration
  const axiosInstance = axios.create({
    baseURL: baseURL,
    withCredentials: true, // Enable cookie handling
    timeout: 10000, // 10 second timeout
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });

  // Generic request method
  const request = useCallback(
    async (method, endpoint, requestData = null, config = {}) => {
      setLoading(true);
      setError(null);

      try {
        const response = await axiosInstance({
          method,
          url: endpoint,
          data: requestData,
          ...config,
        });

        setData(response.data);
        return response.data;
      } catch (err) {
        // Detailed error handling
        const errorMessage =
          err.response?.data?.message ||
          err.response?.data ||
          err.message ||
          "An unexpected error occurred";

        setError({
          status: err.response?.status,
          message: errorMessage,
        });
        console.error(err.response?.data.message || err.message);

        throw err;
      } finally {
        setLoading(false);
      }
    },
    [axiosInstance]
  );

  // Convenience methods for different HTTP verbs
  const get = useCallback(
    (endpoint, config = {}) => {
      return request("get", endpoint, null, config);
    },
    [request]
  );

  const post = useCallback(
    (endpoint, data, config = {}) => {
      return request("post", endpoint, data, config);
    },
    [request]
  );

  const patch = useCallback(
    (endpoint, data, config = {}) => {
      return request("patch", endpoint, data, config);
    },
    [request]
  );

  const del = useCallback(
    (endpoint, config = {}) => {
      return request("delete", endpoint, null, config);
    },
    [request]
  );

  // Reset function to clear states
  const reset = useCallback(() => {
    setData(null);
    setError(null);
    setLoading(false);
  }, []);

  return {
    data,
    loading,
    error,
    get,
    post,
    patch,
    del,
    request,
    reset,
  };
};

export default useHttp;
