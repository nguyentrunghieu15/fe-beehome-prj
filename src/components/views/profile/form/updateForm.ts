import { useForm } from "vee-validate";
import * as yup from "yup";

export default function () {
    const schema = yup.object({
        firstName: yup.string().required("First name is required"),
        lastName: yup.string().required("Last name is required"),
        phone: yup
            .string()
            .matches(/^[0-9]{10}$/, "Phone number must be exactly 10 digits")
            .required("Phone number is required"),
        timeZone: yup.string().required("Time zone is required"),
    });

    const { handleSubmit, errors, isValidating, defineField, resetForm } =
        useForm({
            validationSchema: schema,
        });

    const onSubmit = handleSubmit(async (data) => {
        // Handle form submission logic here (e.g., sending signup data to server)
        console.log("Form data:", data);
    });

    const [firstName, firstNameAttrs] = defineField("firstName");
    const [lastName, lastNameAttrs] = defineField("lastName");
    const [phone, phoneAttrs] = defineField("phone");
    const [timeZone, timeZoneAttrs] = defineField("timeZone");

    return {
        onSubmit,
        firstName,
        firstNameAttrs,
        lastName,
        lastNameAttrs,
        phone,
        phoneAttrs,
        timeZone,
        timeZoneAttrs,
        errors,
        isValidating,
        resetForm,
    };
}
