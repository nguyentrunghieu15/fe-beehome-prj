// HireService.ts
import { BaseService } from "@/plugins/axios";
import type {
    CreateHireResponse,
    FindAllHireResponse,
    UpdateStatusHireResponse,
} from "./interfaces";

export class HireService extends BaseService {
    constructor(baseURL: string) {
        super(baseURL);
    }

    public async findAllHires(
        userId?: string,
        providerId?: string,
        status?: string
    ): Promise<FindAllHireResponse> {
        const response = await this.axiosInstance.get<FindAllHireResponse>("", {
            params: { userId, providerId, status },
        });
        return response.data;
    }

    public async createHire(hireData: any): Promise<CreateHireResponse> {
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
                null,
                {
                    params: { newStatus },
                }
            );
        return response.data;
    }

    // Add other methods as needed
}

const hireService = new HireService("http://localhost:3000/api/v1/hires");
export default hireService;
