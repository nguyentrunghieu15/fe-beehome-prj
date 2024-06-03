export interface CreateHireResponse {
    hire: Hire;
}

export interface FindAllHireResponse {
    hires: Hire[];
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
}