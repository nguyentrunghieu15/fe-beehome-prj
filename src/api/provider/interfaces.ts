export interface FindProsResponse {
    providers: ProviderInfo[];
}

export interface ProviderInfo {
    id: string;
    createdAt: string;
    createdBy: string;
    updatedAt: string;
    updatedBy: string;
    deletedBy: string;
    deletedAt: string;
    name: string;
    introduction: string;
    years: number;
    postalCode: PostalCode;
}

export interface PostalCode {
    id: number;
    countryCode: string;
    zipcode: string;
    place: string;
    state: string;
    stateCode: string;
    province: string;
    provinceCode: string;
    community: string;
    communityCode: string;
    latitude: number;
    longitude: number;
}

export interface AddPaymentMethodProRequest {
    name: string;
}

export interface AddServiceProRequest {
    serviceId: string;
}

export interface AddSocialMediaProRequest {
    name: string;
    link: string;
}

export interface JoinAsProviderResponse {
    providerToken: string;
}

export interface ReplyReviewProRequest {
    reviewId: string;
    reply: string;
}

export interface ReviewProRequest {
    providerId: string;
    rating: number;
    comment: string;
}

export interface SignUpProRequest {
    name: string;
    introduction: string;
    years: number;
    postalCode: string;
}

export interface FindProByIdResponse {
    provider: ProviderInfo;
}

export interface ProServiceUpdateProBody {
    name?: string;
    introduction?: string;
    years?: number;
    postalCode?: string;
}

export interface ProviderProfileResponse {
    provider: ProviderInfo;
}
