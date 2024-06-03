// interfaces.ts
export interface UserInfor {
    id: string;
    createdAt: string;
    createdBy: string;
    updatedAt: string;
    updatedBy: string;
    deletedBy: string;
    deletedAt: string;
    email: string;
    phone: string;
    status: string;
    firstName: string;
    lastName: string;
}

export interface AddCardRequest {
    card: Card;
}

export interface Card {
    cardNumber: string;
    ownerName: string;
    bankName: string;
}

export interface ChangeEmailRequest {
    email: string;
}

export interface ChangeNameRequest {
    name: string;
}

export interface CreateUserRequest {
    email: string;
    password: string;
    phone: string;
    firstName: string;
    lastName: string;
}

export interface ListUsersResponse {
    users: UserInfor[];
}

export interface Pagination {
    pageSize?: number;
    pageToken?: number;
}

export interface Sort {
    type?: string;
    field?: string;
}

export interface UserServiceBlockUserBody {
    description: string;
}

export interface UserServiceUpdateUserBody {
    email?: string;
    phone?: string;
    firstName?: string;
    lastName?: string;
    status?: string;
}
