import type { Pagination, Service } from "../service/interfaces";

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
    numHires: number; // Not present in original interface, added from JSON
    socialMedias: SocialMedia[];
    paymentMethod: PaymentMethod[];
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

export interface AddSocialMediaProRequest {
    name: string;
    link: string;
}

export interface UpdateSocialMediaProRequest {
    id: string;
    name?: string;
    link?: string;
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

export interface AddServiceForProRequest {
    servicesId: string[];
}

export interface GetAllServiceOfProviderRequest {
    id: string;
}

export interface GetAllServiceOfProviderResponse {
    services: Service[];
}

export interface Review {
    id: string;
    createdAt: string;
    createdBy: string;
    updatedAt: string;
    updatedBy: string;
    deletedBy: string;
    deletedAt: string;
    userId: string;
    providerId: string;
    rating: number;
    comment: string;
    reply: string;
    serviceId: string;
}

export interface GetAllReviewOfProviderResponse {
    reviews: Review[];
}

export interface DeleteServiceForProRequest {
    servicesId: string[];
}

export interface FindProsResponse {
    providers: ProviderViewInfo[];
}

export interface ProviderViewInfo {
    id: string;
    createdAt: string;
    createdBy: string;
    updatedAt: string;
    updatedBy: string;
    deletedBy: string | null; // Optional string
    deletedAt: string | null; // Optional string
    name: string;
    introduction: string;
    years: number;
    postalCode: PostalCode;
    numHires: number;
    rating: Rating;
}

export interface Rating {
    numRating: number;
    avgRating: number;
}

export interface FindProsRequest {
    pagination?: Pagination;
    filter?: FilterProRequest;
}

export interface FilterProRequest {
    name?: string;
    introduction?: string;
    years?: number;
    postalCode?: string;
    serviceName?: string;
}

export interface PaymentMethod {
    id: string;
    createdAt: string;
    createdBy: string;
    updatedAt: string;
    updatedBy: string;
    deletedBy: string;
    deletedAt: string;
    name: string;
}

export interface SocialMedia {
    id: string;
    createdAt: string;
    createdBy: string;
    updatedAt: string;
    updatedBy: string;
    deletedBy: string;
    deletedAt: string;
    name: string;
    link: string;
    providerId: string;
}
