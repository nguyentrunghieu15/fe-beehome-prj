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

export enum TypeSort {
    NONE = 0,
    ASC = 1,
    DESC = 2,
}

export interface Pagination {
    limit?: number; // optional
    page?: number; // optional
    pageSize?: number; // optional
    sort?: TypeSort; // optional
    sortBy?: string; // optional
}

export interface FilterServices {
    name?: string; // optional
    createdAtFrom?: string; // optional
    createdAtTo?: string; // optional
    updatedAtFrom?: string; // optional
    updatedAtTo?: string; // optional
}

export interface ListServicesRequest {
    filter?: FilterServices; // optional
    pagination?: Pagination; // optional
}
