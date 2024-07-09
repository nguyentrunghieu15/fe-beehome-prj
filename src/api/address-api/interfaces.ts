export interface Address {
    wardFullName?: string;
    districtFullName?: string;
    provinceFullName?: string;
}

export interface AddressUnit {
    name?: string;
    code?: string;
}

export interface CheckExistAddressResponse {
    address: Address;
}

export interface FindAllAddressResponse {
    address: string[];
}

export interface FindAllNameOfAddressUnitResponse {
    unit: AddressUnit[];
}

export interface rpcStatus {
    code: number;
    message: string;
    details: any[];
}
