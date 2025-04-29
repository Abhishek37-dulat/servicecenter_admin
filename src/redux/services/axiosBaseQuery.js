import axios from "axios";
import { setStudent } from "../slices/studentSlice";
import { setLoading } from "../slices/loadingSlice";

const axiosInstance = axios.create({
  // baseURL: `http://localhost:5000/api/`,
  // baseURL: `http://97.74.87.147:5000/api/v1`,
  baseURL: `http://localhost:5000/api/v1`,

  headers: {
    accept: `application/json`,
    "Content-Type": "application/json",
  },
});

const setUpInterceptors = (getState, dispatch) => {
  axiosInstance.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("authToken");
      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }

      if (config.method === "post" || config.method === "delete") {
        dispatch(setLoading(true));
      }
      // Handle FormData (don't set Content-Type manually)
      if (config.data instanceof FormData) {
        delete config.headers["Content-Type"]; // Let Axios handle it
      }
      return config;
    },
    (error) => {
      dispatch(setLoading(false));
      return Promise.reject(error);
    }
  );

  axiosInstance.interceptors.response.use(
    (res) => {
      if (res.config.method === "post" || res.config.method === "delete") {
        dispatch(setLoading(false));
      }
      return res;
    },
    async (err) => {
      const originalConfig = err.config;

      if (err.config.method === "post" || err.config.method === "delete") {
        dispatch(setLoading(false));
      }

      if (originalConfig.url !== "/auth/login" && err.response) {
        if (err.response.status === 401 && !originalConfig._retry) {
          originalConfig._retry = true;
          try {
            return axiosInstance(originalConfig);
          } catch (_error) {
            dispatch(setStudent(null));
            localStorage.removeItem("authToken");
            return Promise.reject(_error);
          }
        }
      }

      if (err.response.status === 401 && !originalConfig._retry) {
        originalConfig._retry = true;

        // Dispatch action to reset student state and remove token
        dispatch(setStudent(null));
        localStorage.removeItem("authToken");

        window.location.href = "/login";

        return Promise.reject(err); // Reject the error after handling
      }

      return Promise.reject(err);
    }
  );
};

// Ensure interceptors are set up once
let interceptorsSet = false;

const axiosBaseQuery =
  () =>
  async (
    { url, method, body, params, ...requestOpts },
    { getState, dispatch }
  ) => {
    if (!interceptorsSet) {
      setUpInterceptors(getState, dispatch);
      interceptorsSet = true;
    }
    try {
      const axiosOptions = {
        url,
        method,
        data: body,
        params,
        headers: requestOpts.headers,
      };

      if (/^(auth\/)/.test(url)) {
        axiosOptions["withCredentials"] = true;
      }
      const result = await axiosInstance(axiosOptions);

      return { data: result.data };
    } catch (axiosError) {
      let err = axiosError;
      return {
        error: {
          status: err.response?.status,
          data: err.response?.data || err.message,
        },
      };
    }
  };

export default axiosBaseQuery();

// baseURL: `https://lmslegacy.onrender.com/api/`,
