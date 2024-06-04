import type { IInterceptorConfig } from "@/plugins/axios/interfaces";
import type { AxiosResponse, InternalAxiosRequestConfig } from "axios";
import type { JoinAsProviderResponse } from "./interfaces";
import { useMainStore } from "@/stores/mainStore";

export class AuthProviderInterceptor implements IInterceptorConfig {
    public onRequest(
        config: InternalAxiosRequestConfig
    ): InternalAxiosRequestConfig {
        // Check if the access token is available before adding the header
        const providerToken = sessionStorage.getItem("PROVIDER_TOKEN");
        if (providerToken) {
            config.headers = config.headers || {}; // Ensure headers exist
            config.headers.set("Provider-Id", providerToken);
        }
        return config;
    }
}

export class JoinAsProviderInterceptor implements IInterceptorConfig {
    public onResponse(
        response: AxiosResponse
    ): AxiosResponse | Promise<AxiosResponse> {
        if (
            response.config.url === "" &&
            response.config.method === "post" &&
            response.status === 200
        ) {
            const data: JoinAsProviderResponse = response.data;
            sessionStorage.setItem("PROVIDER_TOKEN", data.providerToken);
        }
        return response;
    }
}

export class ErrorInterceptor implements IInterceptorConfig {
    public onResponse(
        response: AxiosResponse
    ): AxiosResponse | Promise<AxiosResponse> {
        return response; // Pass through successful responses
    }

    public onError(error: any): Promise<any> | any {
        if (error?.config?.url === "" && error?.config?.method === "post") {
            return Promise.reject(error);
        }
        const mainStore = useMainStore();
        mainStore.showNofitication({
            title: error?.response?.statusText,
            content: error?.response?.data?.message,
            typeNotification: "error",
        });
        return Promise.reject(error); // Re-throw the error for further handling
    }
}
