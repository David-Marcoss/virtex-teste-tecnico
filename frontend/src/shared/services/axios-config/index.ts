import axios from "axios";
import { errorInterceptor, responseInterceptor } from "./interceptors";

export const Api = axios.create({
  baseURL: "https://open.er-api.com/v6/latest",
});

Api.interceptors.response.use(
  (response) => responseInterceptor(response),
  (error) => errorInterceptor(error)
);
