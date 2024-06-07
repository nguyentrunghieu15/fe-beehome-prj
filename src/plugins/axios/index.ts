import axios, { type AxiosInstance } from "axios";
import type { IIndentifyInterceptor, IInterceptorConfig } from "./interfaces";
import _ from "lodash";

export class BaseService {
    public axiosInstance: AxiosInstance;

    constructor(baseURL: string, headers?: { [key: string]: string }) {
        this.axiosInstance = axios.create({
            baseURL,
            headers: headers || {
                "Content-Type": "application/json",
                // Add other default headers here if needed
            },
            paramsSerializer: function (params) {
                const flatedParam = flattenObject(params);
                const urlParam = new URLSearchParams(flatedParam);
                return urlParam.toString();
            },
        });
    }

    /**
     * Adds an interceptor to the Axios instance.
     *
     * @param interceptorId A unique identifier for the interceptor
     * @param config Configuration object for the interceptor
     */
    public addInterceptor(
        interceptorId: string,
        config: IInterceptorConfig
    ): IIndentifyInterceptor {
        if (!interceptorId) {
            throw new Error("Interceptor ID is required.");
        }

        const result: IIndentifyInterceptor = {};

        const requestInterceptor = config.onRequest;
        if (requestInterceptor) {
            result.idRequest =
                this.axiosInstance.interceptors.request.use(requestInterceptor);
        }

        const responseInterceptor = config.onResponse;
        if (responseInterceptor) {
            result.idResponse =
                this.axiosInstance.interceptors.response.use(
                    responseInterceptor
                );
        }

        const errorInterceptor = config.onError;
        if (errorInterceptor) {
            result.idError = this.axiosInstance.interceptors.response.use(
                undefined,
                errorInterceptor
            );
        }
        return result;
    }

    /**
     * Removes an interceptor from the Axios instance.
     *
     * @param interceptorId The ID of the interceptor to remove
     */
    public removeInterceptor(interceptorId: number): void {
        if (typeof interceptorId !== "number") {
            throw new Error("Interceptor ID must be a number.");
        }

        this.axiosInstance.interceptors.request.eject(interceptorId);
        this.axiosInstance.interceptors.response.eject(interceptorId);
    }
}

function flattenObject(obj: any, prefix = "") {
    const result: any = {};
    for (const key in obj) {
        const value = obj[key];
        const newPrefix = prefix ? `${prefix}.${key}` : key;
        if (typeof value === "object" && value !== null) {
            Object.assign(result, flattenObject(value, newPrefix));
        } else {
            result[newPrefix] = value;
        }
    }
    return result;
}
