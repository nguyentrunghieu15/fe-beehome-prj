import authService from "@/api/auth";
import providerService from "@/api/provider";
import type { SignUpProRequest } from "@/api/provider/interfaces";
import { useForm } from "vee-validate";
import * as yup from "yup";

export default function () {
    const schema = yup.object({
        name: yup.string().required("Name is required"),
        year: yup
            .number()
            .positive("Years of experience must be positive")
            .required("Years of experience is required"),
        postalCode: yup.string().required("Postal code is required"),
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

    const onSubmit = handleSubmit(async (data) => {
        // Handle form submission logic here (e.g., sending signup data to server)
        return providerService.signUpAsPro(data as SignUpProRequest);
    });

    const [name, nameAttrs] = defineField("name");
    const [year, yearAttrs] = defineField("year");
    const [postalCode, postalCodeAttrs] = defineField("postalCode");
    const [introduction, introductionAttrs] = defineField("introduction");

    return {
        onSubmit,
        name,
        nameAttrs,
        year,
        yearAttrs,
        postalCode,
        postalCodeAttrs,
        introduction,
        introductionAttrs,
        errors,
        isValidating,
        resetForm,
        setFieldValue,
        validate,
    };
}
