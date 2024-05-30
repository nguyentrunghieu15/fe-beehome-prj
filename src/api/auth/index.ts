import { BaseService } from "@/plugins/axios";
import type {
    IForgotPasswordRequest,
    ILoginRequest,
    ILoginResponse,
    IRefreshTokenRequest,
    IRefreshTokenResponse,
    IResetPasswordRequest,
    ISignUpRequest,
} from "./interfaces";
import { ErrorInterceptor, LoginInterceptor } from "./interceptor";

export class AuthService extends BaseService {
    constructor(baseURL: string) {
        super(baseURL);
    }

    public async login(credentials: ILoginRequest): Promise<ILoginResponse> {
        const response = await this.axiosInstance.post<ILoginResponse>(
            "/login",
            credentials
        );
        return response.data;
    }

    public async refreshToken(
        data: IRefreshTokenRequest
    ): Promise<IRefreshTokenResponse> {
        const response = await this.axiosInstance.post<IRefreshTokenResponse>(
            "/refresh-token",
            data
        );
        return response.data;
    }

    public async forgotPassword(data: IForgotPasswordRequest): Promise<void> {
        // Assuming the API endpoint expects just the email in the request body
        await this.axiosInstance.post<void>("/forgot-password", data);
        return;
    }

    public async signup(userData: ISignUpRequest): Promise<void> {
        await this.axiosInstance.post<void>("/sign-up", userData);
        return;
    }

    public async resetPassword(data: IResetPasswordRequest): Promise<void> {
        await this.axiosInstance.post<void>("/reset-password", data);
        return;
    }
}

const authService = new AuthService("http://localhost:3000/api/v1/auth");
authService.addInterceptor("login", new LoginInterceptor());
authService.addInterceptor("error", new ErrorInterceptor());

export default authService;
