import type { IInterceptorConfig } from "@/plugins/axios/interfaces";
import type {
    AxiosRequestConfig,
    AxiosResponse,
    InternalAxiosRequestConfig,
} from "axios"; // Use built-in Axios types
import { useMainStore } from "@/stores/mainStore";
// Use built-in Axios types
export class ErrorInterceptor implements IInterceptorConfig {
    public onResponse(
        response: AxiosResponse
    ): AxiosResponse | Promise<AxiosResponse> {
        return response; // Pass through successful responses
    }

    public onError(error: any): Promise<any> | any {
        const mainStore = useMainStore();
        mainStore.showNofitication({
            title: error?.response?.statusText,
            content: error?.response?.data?.message,
            typeNotification: "error",
        });
        return Promise.reject(error); // Re-throw the error for further handling
    }
}

export class AuthInterceptor implements IInterceptorConfig {
    public onRequest(
        config: InternalAxiosRequestConfig
    ): InternalAxiosRequestConfig {
        // Check if the access token is available before adding the header
        const accessToken = sessionStorage.getItem("ACCESS_TOKEN");
        if (accessToken) {
            config.headers = config.headers || {}; // Ensure headers exist
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    }
}
