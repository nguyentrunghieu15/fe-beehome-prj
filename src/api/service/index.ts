import { BaseService } from "@/plugins/axios";

import { ErrorInterceptor } from "../user/interceptor";
import type {
    CreateServiceRequest,
    ListServicesRequest,
    ListServicesResponse,
    Service,
    ServiceManagerServiceUpdateServiceBody,
} from "./interfaces";

export class ServiceManagerService extends BaseService {
    constructor(baseURL: string) {
        super(baseURL);
        this.addInterceptor("error", new ErrorInterceptor());
        // this.addInterceptor("auth", new AuthInterceptor());
    }

    public async listServices(
        paramsData: ListServicesRequest
    ): Promise<ListServicesResponse> {
        const response = await this.axiosInstance.get<ListServicesResponse>(
            "",
            {
                params: paramsData,
            }
        );
        return response.data;
    }

    public async fulltextSearchServices(
        name?: string
    ): Promise<ListServicesResponse> {
        const response = await this.axiosInstance.get<ListServicesResponse>(
            "/fulltext/search",
            {
                params: {
                    name,
                },
            }
        );
        return response.data;
    }

    public async createService(
        serviceData: CreateServiceRequest
    ): Promise<Service> {
        const response = await this.axiosInstance.post<Service>(
            "",
            serviceData
        );
        return response.data;
    }

    public async getService(id: string): Promise<Service> {
        const response = await this.axiosInstance.get<Service>(`/${id}`);
        return response.data;
    }

    public async deleteService(id: string): Promise<void> {
        await this.axiosInstance.delete<void>(`/${id}`);
    }

    public async updateService(
        id: string,
        updateData: ServiceManagerServiceUpdateServiceBody
    ): Promise<Service> {
        const response = await this.axiosInstance.patch<Service>(
            `/${id}`,
            updateData
        );
        return response.data;
    }
}

const serviceManagerService = new ServiceManagerService(
    `${import.meta.env.VITE_APP_BASE_URL}/api/v1/services`
);
export default serviceManagerService;
