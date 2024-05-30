import type { AxiosResponse, InternalAxiosRequestConfig } from "axios";

// Interface for custom interceptor configuration
export interface IInterceptorConfig {
    onRequest?: (
        config: InternalAxiosRequestConfig
    ) => InternalAxiosRequestConfig | Promise<InternalAxiosRequestConfig>;
    onResponse?: (
        response: AxiosResponse
    ) => AxiosResponse | Promise<AxiosResponse>;
    onError?: (error: any) => Promise<any> | any;
}

export interface IIndentifyInterceptor {
    idRequest?: number;
    idResponse?: number;
    idError?: number;
}
