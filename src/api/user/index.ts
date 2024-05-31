import { BaseService } from "@/plugins/axios";
import type {
    CreateUserRequest,
    ListUsersResponse,
    UserServiceBlockUserBody,
    UserServiceUpdateUserBody,
    UserInfor,
    Pagination,
    Sort,
} from "./interfaces";
import { AuthInterceptor, ErrorInterceptor } from "./interceptor";

export class UserService extends BaseService {
    constructor(baseURL: string) {
        super(baseURL);
    }

    public async listUsers(
        pagination?: Pagination,
        sort?: Sort
    ): Promise<ListUsersResponse> {
        const params = { pagination, sort };
        const response = await this.axiosInstance.get<ListUsersResponse>(
            "/user",
            { params }
        );
        return response.data;
    }

    public async createUser(userData: CreateUserRequest): Promise<UserInfor> {
        const response = await this.axiosInstance.post<UserInfor>(
            "/user",
            userData
        );
        return response.data;
    }

    public async blockUser(
        userId: string,
        blockBody: UserServiceBlockUserBody
    ): Promise<void> {
        await this.axiosInstance.post<void>(`/user/block/${userId}`, blockBody);
    }

    public async getUser(userId: string): Promise<UserInfor> {
        const response = await this.axiosInstance.get<UserInfor>(
            `/user/${userId}`
        );
        return response.data;
    }

    public async deleteUser(userId: string): Promise<void> {
        await this.axiosInstance.delete<void>(`/user/${userId}`);
    }

    public async updateUser(
        userId: string,
        updateUserBody: UserServiceUpdateUserBody
    ): Promise<UserInfor> {
        const response = await this.axiosInstance.patch<UserInfor>(
            `/user/${userId}`,
            updateUserBody
        );
        return response.data;
    }
}

const userService = new UserService("http://localhost:3000/api/v1");
userService.addInterceptor("error", new ErrorInterceptor());
userService.addInterceptor("auth", new AuthInterceptor());

export default userService;
