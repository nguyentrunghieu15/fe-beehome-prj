// ProviderService.ts
import { BaseService } from "@/plugins/axios";
import type {
    AddPaymentMethodProRequest,
    AddSocialMediaProRequest,
    FindProsResponse,
    JoinAsProviderResponse,
    ProviderInfo,
    ReplyReviewProRequest,
    ReviewProRequest,
    SignUpProRequest,
    FindProByIdResponse,
    ProServiceUpdateProBody,
    ProviderProfileResponse,
    AddServiceForProRequest,
    GetAllServiceOfProviderRequest,
    GetAllServiceOfProviderResponse,
    DeleteServiceForProRequest,
    FindProsRequest,
    GetAllReviewOfProviderResponse,
    UpdateSocialMediaProRequest,
    GetReviewsOfProviderRequest,
} from "./interfaces";
import { AuthInterceptor } from "../user/interceptor";
import {
    AuthProviderInterceptor,
    ErrorInterceptor,
    JoinAsProviderInterceptor,
} from "./interceptors";

export class ProviderService extends BaseService {
    constructor(baseURL: string) {
        super(baseURL);
    }

    public async findProviders(
        req: FindProsRequest
    ): Promise<FindProsResponse> {
        const response = await this.axiosInstance.get<FindProsResponse>("", {
            params: req,
        });
        return response.data;
    }

    public async addPaymentMethodForPro(
        paymentMethodData: AddPaymentMethodProRequest
    ): Promise<void> {
        await this.axiosInstance.post<void>(
            "/add-payment-method",
            paymentMethodData
        );
    }

    public async addServiceForPro(
        serviceData: AddServiceForProRequest
    ): Promise<void> {
        await this.axiosInstance.post<void>("/add-service", serviceData);
    }

    public async addSocialMediaForPro(
        requestData: AddSocialMediaProRequest
    ): Promise<void> {
        await this.axiosInstance.post<void>("/add-social-media", requestData);
    }

    public async joinAsProvider(): Promise<JoinAsProviderResponse> {
        const response = await this.axiosInstance.post<JoinAsProviderResponse>(
            ""
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
            `/${id}`,
            body
        );
        return response.data;
    }

    // New method to get provider profile of user logged in
    public async getProviderProfile(): Promise<ProviderProfileResponse> {
        const response = await this.axiosInstance.get<ProviderProfileResponse>(
            "/owner/profile"
        );
        return response.data;
    }

    public async getAllServicesOfProvider(
        data: GetAllServiceOfProviderRequest
    ): Promise<GetAllServiceOfProviderResponse> {
        const response =
            await this.axiosInstance.get<GetAllServiceOfProviderResponse>(
                `/${data.id}/services`
            );
        return response.data;
    }

    public async getAllReviewsOfProvider(
        id: string
    ): Promise<GetAllReviewOfProviderResponse> {
        const response =
            await this.axiosInstance.get<GetAllReviewOfProviderResponse>(
                `/${id}/reviews/all`
            );
        return response.data;
    }

     // New method to get filtered reviews of a provider
     public async getReviewsOfProvider(
        id: string,
        query: GetReviewsOfProviderRequest
    ): Promise<GetAllReviewOfProviderResponse> {
        const response =
            await this.axiosInstance.get<GetAllReviewOfProviderResponse>(
                `/${id}/reviews`, {
                    params: query
                }
            );
        return response.data;
    }

    public async deleteServiceForPro(
        serviceData: DeleteServiceForProRequest
    ): Promise<void> {
        await this.axiosInstance.post<void>("/delete-service", serviceData);
    }

    public async updateSocialMediaForPro(
        requestData: UpdateSocialMediaProRequest
    ): Promise<void> {
        await this.axiosInstance.post<void>(
            "/update-social-media",
            requestData
        );
    }

    public async deleteSocialMediaForPro(id: string): Promise<void> {
        await this.axiosInstance.delete<void>(`/delete-social-media/${id}`);
    }
}

const providerService = new ProviderService(
    "http://localhost:3003/api/v1/providers"
);

providerService.addInterceptor("auth", new AuthInterceptor());
providerService.addInterceptor("error", new ErrorInterceptor());
providerService.addInterceptor("auth-provider", new AuthProviderInterceptor());
providerService.addInterceptor(
    "join-provider",
    new JoinAsProviderInterceptor()
);
export default providerService;
