import hireService from "@/api/hire";
import type { CreateHireRequest } from "@/api/hire/interfaces";
import { useForm } from "vee-validate";
import * as yup from "yup";

export default function () {
    const schema = yup.object({
        providerId: yup.string().required("Provider ID is required"),
        serviceId: yup.string().required("Service ID is required"),
        workTimeFrom: yup.string().required("Work time from is required"),
        workTimeTo: yup
            .string()
            .required("Work time to is required")
            .test(
                "is-greater",
                "Work time to must be greater than work time from",
                function (value) {
                    const { workTimeFrom } = this.parent;
                    return !workTimeFrom || !value || value > workTimeFrom;
                }
            ),
        status: yup.string().optional(),
        paymentMethodId: yup.number().optional(),
        issue: yup.string().required("Issue is required"),
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

    const onSubmit = () => {
        return handleSubmit(async (data) => {
            // Handle form submission logic here (e.g., sending hire request data to server)
            data["status"] = "pendding";
            return hireService.createHire(data as CreateHireRequest);
        })();
    };

    const [providerId, providerIdAttrs] = defineField("providerId");
    const [serviceId, serviceIdAttrs] = defineField("serviceId");
    const [workTimeFrom, workTimeFromAttrs] = defineField("workTimeFrom");
    const [workTimeTo, workTimeToAttrs] = defineField("workTimeTo");
    const [status, statusAttrs] = defineField("status");
    const [paymentMethodId, paymentMethodIdAttrs] =
        defineField("paymentMethodId");
    const [issue, issueAttrs] = defineField("issue");

    return {
        onSubmit,
        providerId,
        providerIdAttrs,
        serviceId,
        serviceIdAttrs,
        workTimeFrom,
        workTimeFromAttrs,
        workTimeTo,
        workTimeToAttrs,
        status,
        statusAttrs,
        paymentMethodId,
        paymentMethodIdAttrs,
        issue,
        issueAttrs,
        errors,
        isValidating,
        resetForm,
        setFieldValue,
        validate,
    };
}
