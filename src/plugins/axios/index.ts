import axios, { type AxiosInstance } from "axios";
import type { IIndentifyInterceptor, IInterceptorConfig } from "./interfaces";

export class BaseService {
    public axiosInstance: AxiosInstance;

    constructor(baseURL: string, headers?: { [key: string]: string }) {
        this.axiosInstance = axios.create({
            baseURL,
            headers: headers || {
                "Content-Type": "application/json",
                // Add other default headers here if needed
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
