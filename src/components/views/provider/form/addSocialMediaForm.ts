import providerService from "@/api/provider";
import type {
    AddSocialMediaProRequest,
    ProServiceUpdateProBody,
} from "@/api/provider/interfaces";
import { useForm } from "vee-validate";
import * as yup from "yup";

export default function () {
    const schema = yup.object({
        name: yup.string().required("Name is required"),
        link: yup
            .string()
            .url("Link must be a valid URL")
            .required("Link is required"),
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
            // Handle form submission logic here (e.g., sending social media data to server)
            return providerService.addSocialMediaForPro(
                data as AddSocialMediaProRequest
            );
        })();
    };

    const [name, nameAttrs] = defineField("name");
    const [link, linkAttrs] = defineField("link");

    return {
        onSubmit,
        name,
        nameAttrs,
        link,
        linkAttrs,
        errors,
        isValidating,
        resetForm,
        setFieldValue,
        validate,
    };
}
