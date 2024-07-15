import { BaseService } from "@/plugins/axios";
import { ErrorInterceptor } from "../user/interceptor";
import type {
    CreateGroupServiceRequest,
    FulltextSearchGroupServicesRequest,
    GroupService,
    ListGroupServicesRequest,
    ListGroupServicesResponse,
    UpdateGroupServiceRequest,
} from "./interfaces";

export class GroupServiceManagerService extends BaseService {
    constructor(baseURL: string) {
        super(baseURL);
        this.addInterceptor("error", new ErrorInterceptor());
    }

    public async listGroupServices(
        paramsData: ListGroupServicesRequest
    ): Promise<ListGroupServicesResponse> {
        const response =
            await this.axiosInstance.get<ListGroupServicesResponse>("", {
                params: paramsData,
            });
        return response.data;
    }

    public async fulltextSearchGroupServices(
        paramsData: FulltextSearchGroupServicesRequest
    ): Promise<ListGroupServicesResponse> {
        const response =
            await this.axiosInstance.get<ListGroupServicesResponse>(
                "/fulltext/search",
                {
                    params: paramsData,
                }
            );
        return response.data;
    }

    public async createGroupService(
        serviceData: CreateGroupServiceRequest
    ): Promise<GroupService> {
        const response = await this.axiosInstance.post<GroupService>(
            "",
            serviceData
        );
        return response.data;
    }

    public async getGroupService(id: string): Promise<GroupService> {
        const response = await this.axiosInstance.get<GroupService>(`/${id}`);
        return response.data;
    }

    public async deleteGroupService(id: string): Promise<void> {
        await this.axiosInstance.delete<void>(`/${id}`);
    }

    public async updateGroupService(
        updateData: UpdateGroupServiceRequest
    ): Promise<GroupService> {
        const response = await this.axiosInstance.patch<GroupService>(
            `/${updateData.id}`,
            updateData
        );
        return response.data;
    }
}

const groupServiceManagerService = new GroupServiceManagerService(
    `${import.meta.env.VITE_APP_BASE_URL}/api/v1/group_services`
);
export default groupServiceManagerService;
