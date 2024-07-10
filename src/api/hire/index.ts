// HireService.ts
import { BaseService } from "@/plugins/axios";
import type {
    CreateHireRequest,
    CreateHireResponse,
    FindAllHireResponse as FindHireResponse,
    FindHiresRequest,
    UpdateStatusHireResponse,
} from "./interfaces";
import { AuthInterceptor } from "../user/interceptor";
import { ErrorInterceptor } from "../provider/interceptors";

export class HireService extends BaseService {
    constructor(baseURL: string) {
        super(baseURL);
    }

    public async findHires(
        data: FindHiresRequest
    ): Promise<FindHireResponse> {
        const response = await this.axiosInstance.get<FindHireResponse>("", {
            params: data,
        });
        return response.data;
    }

    public async createHire(
        hireData: CreateHireRequest
    ): Promise<CreateHireResponse> {
        hireData.workTimeFrom = new Date(hireData.workTimeFrom).toISOString();
        hireData.workTimeTo = new Date(hireData.workTimeTo).toISOString();
        const response = await this.axiosInstance.post<CreateHireResponse>(
            "",
            hireData
        );
        return response.data;
    }

    public async deleteHire(hireId: string): Promise<void> {
        await this.axiosInstance.delete(`/${hireId}`);
    }

    public async updateStatusHire(
        hireId: string,
        newStatus: string
    ): Promise<UpdateStatusHireResponse> {
        const response =
            await this.axiosInstance.patch<UpdateStatusHireResponse>(
                `/${hireId}`,
                { newStatus }
            );
        return response.data;
    }

    // Add other methods as needed
}

const hireService = new HireService("http://localhost:3003/api/v1/hires");
hireService.addInterceptor("auth", new AuthInterceptor());
hireService.addInterceptor("error", new ErrorInterceptor());
export default hireService;
