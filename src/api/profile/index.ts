// ProfileService.ts
import { BaseService } from "@/plugins/axios";
import type { UserInfor } from "../user/interfaces";
import type {
    AddCardRequest,
    ChangeEmailRequest,
    ChangeNameRequest,
} from "./interfaces";
import { AuthInterceptor, ErrorInterceptor } from "../user/interceptor";

export class ProfileService extends BaseService {
    constructor(baseURL: string) {
        super(baseURL);
    }

    public async getProfile(): Promise<UserInfor> {
        const response = await this.axiosInstance.get<UserInfor>("");
        return response.data;
    }

    public async addCard(cardData: AddCardRequest): Promise<void> {
        await this.axiosInstance.post<void>("/add-card", cardData);
    }

    public async changeEmail(
        emailData: ChangeEmailRequest
    ): Promise<UserInfor> {
        const response = await this.axiosInstance.post<UserInfor>(
            "/change-mail",
            emailData
        );
        return response.data;
    }

    public async changeName(nameData: ChangeNameRequest): Promise<UserInfor> {
        const response = await this.axiosInstance.post<UserInfor>(
            "/change-name",
            nameData
        );
        return response.data;
    }

    public async deactiveAccount(): Promise<void> {
        const response = await this.axiosInstance.delete<void>("");
        return response.data;
    }
}

const profileService = new ProfileService(
    `${import.meta.env.VITE_APP_BASE_URL}/api/v1/profile`
);
profileService.addInterceptor("error", new ErrorInterceptor());
profileService.addInterceptor("auth", new AuthInterceptor());
export default profileService;
