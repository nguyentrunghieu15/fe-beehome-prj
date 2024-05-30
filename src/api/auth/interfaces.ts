export interface ILoginRequest {
    email: string;
    password: string;
    captcha?: string;
}
export interface ILoginResponse {
    accessToken: string;
    expireTime: number;
    refreshToken: string;
    tokenType: string;
}
export interface IRefreshTokenResponse {
    accessToken: string;
}

export interface IRefreshTokenRequest {
    refreshToken: string;
}

export interface IForgotPasswordRequest {
    email: string;
}

export interface ISignUpRequest {
    email: string;
    password: string;
    phone: string;
    firstName: string;
    lastName: string;
}

export interface IResetPasswordRequest {
    newPassword: string;
    confirmPassword: string;
    resetToken: string;
}
