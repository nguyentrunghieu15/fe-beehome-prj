import providerService from "@/api/provider";
import type { ProServiceUpdateProBody } from "@/api/provider/interfaces";
import { useForm } from "vee-validate";
import * as yup from "yup";

export default function () {
    const schema = yup.object({
        name: yup.string().required("Name is required"),
        years: yup
            .number()
            .positive("Years of experience must be positive")
            .required("Years of experience is required"),
        address: yup.string().required("address is required"),
        introduction: yup.string().required("Introduction is required"),
    });

    const {
        handleSubmit,
        errors,
        isValidating,
        defineField,
        resetForm,
        setFieldValue,
        validate,
    } = useForm({
        validationSchema: schema,
    });

    const onSubmit = (id: string) => {
        return handleSubmit(async (data) => {
            // Handle form submission logic here (e.g., sending signup data to server)
            return providerService.updatePro(
                id,
                data as ProServiceUpdateProBody
            );
        })();
    };

    const [name, nameAttrs] = defineField("name");
    const [years, yearsAttrs] = defineField("years");
    const [address, addressAttrs] = defineField("address");
    const [introduction, introductionAttrs] = defineField("introduction");

    return {
        onSubmit,
        name,
        nameAttrs,
        years,
        yearsAttrs,
        address,
        addressAttrs,
        introduction,
        introductionAttrs,
        errors,
        isValidating,
        resetForm,
        setFieldValue,
        validate,
    };
}
