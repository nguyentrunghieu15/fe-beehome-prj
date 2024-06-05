export interface Service {
    id: string;
    createdAt: string;
    createdBy: string;
    updatedAt: string;
    updatedBy: string;
    deletedBy: string;
    deletedAt: string;
    name: string;
    detail: string;
    groupId: string;
}

export interface CreateServiceRequest {
    name: string;
    detail: string;
    groupId: string;
}

export interface ServiceManagerServiceUpdateServiceBody {
    name: string;
    detail: string;
}

export interface ListServicesResponse {
    services: Service[];
}
