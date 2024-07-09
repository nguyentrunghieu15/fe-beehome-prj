import { BaseService } from "@/plugins/axios";
import type {
    CheckExistAddressResponse,
    FindAllAddressResponse,
    FindAllNameOfAddressUnitResponse,
} from "./interfaces.ts";
import { ErrorInterceptor } from "../provider/interceptors";

export class AddressService extends BaseService {
    constructor(baseURL: string) {
        super(baseURL);
    }

    public async checkExistAddress(
        wardFullName?: string,
        districtFullName?: string,
        provinceFullName?: string
    ): Promise<CheckExistAddressResponse> {
        const response =
            await this.axiosInstance.get<CheckExistAddressResponse>(
                "/check",
                {
                    params: {
                        "address.wardFullName": wardFullName,
                        "address.districtFullName": districtFullName,
                        "address.provinceFullName": provinceFullName,
                    },
                }
            );
        return response.data;
    }

    public async findAllAddress(
        query?: string
    ): Promise<FindAllAddressResponse> {
        const response = await this.axiosInstance.get<FindAllAddressResponse>(
            "/search",
            {
                params: { query },
            }
        );
        return response.data;
    }

    public async findAllNameOfAddressUnit(
        type?: string,
        name?: string,
        code?: string
    ): Promise<FindAllNameOfAddressUnitResponse> {
        const response =
            await this.axiosInstance.get<FindAllNameOfAddressUnitResponse>(
                "/search-unit",
                {
                    params: {
                        type,
                        "unit.name": name,
                        "unit.code": code,
                    },
                }
            );
        return response.data;
    }
}
const addressService = new AddressService("http://localhost:3004/api/v1/address");
addressService.addInterceptor("error", new ErrorInterceptor());
export default addressService;
