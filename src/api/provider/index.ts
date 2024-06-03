// ProviderService.ts
import { BaseService } from "@/plugins/axios";
import type {
    AddPaymentMethodProRequest,
    AddServiceProRequest,
    AddSocialMediaProRequest,
    FindProsResponse,
    JoinAsProviderResponse,
    ProviderInfo,
    ReplyReviewProRequest,
    ReviewProRequest,
    SignUpProRequest,
    FindProByIdResponse,
    ProServiceUpdateProBody,
} from "./interfaces";
import { AuthInterceptor, ErrorInterceptor } from "../user/interceptor";

export class ProviderService extends BaseService {
    constructor(baseURL: string) {
        super(baseURL);
    }

    public async findProviders(): Promise<FindProsResponse> {
        const response = await this.axiosInstance.get<FindProsResponse>("");
        return response.data;
    }

    public async addPaymentMethodForPro(paymentMethodData: any): Promise<void> {
        await this.axiosInstance.post<void>(
            "/add-payment-method",
            paymentMethodData
        );
    }

    public async addServiceForPro(serviceData: any): Promise<void> {
        await this.axiosInstance.post<void>("/add-service", serviceData);
    }

    public async addSocialMediaForPro(
        requestData: AddSocialMediaProRequest
    ): Promise<void> {
        await this.axiosInstance.post<void>("/add-social-media", requestData);
    }

    public async joinAsProvider(): Promise<JoinAsProviderResponse> {
        const response = await this.axiosInstance.get<JoinAsProviderResponse>(
            "/join/user"
        );
        return response.data;
    }

    public async replyReviewAsPro(
        requestData: ReplyReviewProRequest
    ): Promise<void> {
        await this.axiosInstance.post<void>("/reply-review", requestData);
    }

    public async reviewPro(requestData: ReviewProRequest): Promise<void> {
        await this.axiosInstance.post<void>("/review", requestData);
    }

    public async signUpAsPro(
        requestData: SignUpProRequest
    ): Promise<ProviderInfo> {
        const response = await this.axiosInstance.post<ProviderInfo>(
            "/signup",
            requestData
        );
        return response.data;
    }

    public async findProById(id: string): Promise<FindProByIdResponse> {
        const response = await this.axiosInstance.get<FindProByIdResponse>(
            `/${id}`
        );
        return response.data;
    }

    public async deleteProById(id: string): Promise<void> {
        await this.axiosInstance.delete<void>(`/${id}`);
    }

    public async updatePro(
        id: string,
        body: ProServiceUpdateProBody
    ): Promise<ProviderInfo> {
        const response = await this.axiosInstance.put<ProviderInfo>(
            `/api/v1/providers/${id}`,
            body
        );
        return response.data;
    }
}

const providerService = new ProviderService(
    "http://localhost:3000/api/v1/providers"
);

providerService.addInterceptor("auth", new AuthInterceptor());
providerService.addInterceptor("error", new ErrorInterceptor());
export default providerService;
