import type { Pagination, TypeSort } from "../service/interfaces";

// Define the GroupService interface
export interface GroupService {
    id: string;
    createdAt: string;
    createdBy: string;
    updatedAt: string;
    updatedBy: string;
    deletedBy: string;
    deletedAt: string;
    name: string;
    detail: string;
}

// Define the CreateGroupServiceRequest interface
export interface CreateGroupServiceRequest {
    name: string;
    detail: string;
}

// Define the FulltextSearchGroupServicesRequest interface
export interface FulltextSearchGroupServicesRequest {
    name?: string;
}

// Define the ListGroupServicesRequest interface
export interface ListGroupServicesRequest {
    filter?: FilterGroupServices;
    pagination?: Pagination;
}

// Define the ListGroupServicesResponse interface
export interface ListGroupServicesResponse {
    groupServices: GroupService[];
}

// Define the UpdateGroupServiceRequest interface
export interface UpdateGroupServiceRequest {
    id: string;
    name?: string;
    detail?: string;
}

// Define the FilterGroupServices interface
export interface FilterGroupServices {
    name?: string;
    createdAtFrom?: string;
    createdAtTo?: string;
    updatedAtFrom?: string;
    updatedAtTo?: string;
}
