// ProfileService.ts
import { BaseService } from "@/plugins/axios";
import type { UserInfor } from "../user/interfaces";
import type {
    AddCardRequest,
    ChangeEmailRequest,
    ChangeNameRequest,
} from "./interfaces";

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
}

const profileService = new ProfileService(
    "http://localhost:3000/api/v1/profile"
);
export default profileService;
