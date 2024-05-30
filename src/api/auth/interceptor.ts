import type { IInterceptorConfig } from "@/plugins/axios/interfaces";
import type { AxiosRequestConfig, AxiosResponse } from "axios"; // Use built-in Axios types
import type { AuthService } from ".";
import type { ILoginResponse } from "./interfaces";
import { useMainStore } from "@/stores/mainStore";
// Use built-in Axios types

export class LoginInterceptor implements IInterceptorConfig {
    public onResponse(
        response: AxiosResponse
    ): AxiosResponse | Promise<AxiosResponse> {
        if (response.config.url === "/login" && response.status === 200) {
            const loginData: ILoginResponse = response.data;
            sessionStorage.setItem("ACCESS_TOKEN", loginData.accessToken);
            sessionStorage.setItem("REFRESH_TOKEN", loginData.refreshToken);
            sessionStorage.setItem("TYPE_TOKEN", loginData.tokenType);
            sessionStorage.setItem(
                "EXPIRE_TIME",
                JSON.stringify(loginData.expireTime)
            ); // Store as string
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
        const mainStore = useMainStore();
        mainStore.showNofitication({
            title: error?.response?.statusText,
            content: error?.response?.data?.message,
            typeNotification: "error",
        });
        return Promise.reject(error); // Re-throw the error for further handling
    }
}
