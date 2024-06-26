import type { ProviderInfo, Review } from "../provider/interfaces";
import type { Service } from "../service/interfaces";

export interface CreateHireResponse {
    hire: Hire;
}

export interface FindAllHireResponse {
    hires: HireInfor[];
}

export interface UpdateStatusHireResponse {
    hire: Hire;
}

export interface Hire {
    id: string;
    createdAt: string;
    createdBy: string;
    updatedAt: string;
    updatedBy: string;
    deletedBy: string;
    deletedAt: string;
    userId: string;
    providerId: string;
    serviceId: string;
    workTimeFrom: string;
    workTimeTo: string;
    status: string;
    paymentMethodId: string;
    issue: string;
}

export interface HireInfor {
    id: string;
    createdAt: string;
    createdBy: string;
    updatedAt: string;
    updatedBy: string;
    deletedBy: string;
    deletedAt: string;
    userId: string;
    providerId: string;
    serviceId: string;
    workTimeFrom: string;
    workTimeTo: string;
    status: string;
    paymentMethodId: string;
    issue: string;
    service: Service;
    provider: ProviderInfo;
    review?: Review;
}

export interface CreateHireRequest {
    providerId: string;
    serviceId: string;
    workTimeFrom: string;
    workTimeTo: string;
    status?: string;
    paymentMethodId?: number;
    issue: string;
}

export interface FindAllHiresRequest {
    userId?: string;
    providerId?: string;
    status?: string;
}
