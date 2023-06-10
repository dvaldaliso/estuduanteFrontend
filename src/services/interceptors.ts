import { AxiosInstance } from "axios";
import handleError from "./httpErrorHandler";

export default function initInterceptors(httpService:AxiosInstance) {
    httpService.interceptors.request.use((request) => {
        return request;
    });

    httpService.interceptors.response.use(
        (res) => res,
        (error) => {
            if (error.response) {
                handleError(error.response.status);
            }
            return Promise.reject(error);
        }
    );
}