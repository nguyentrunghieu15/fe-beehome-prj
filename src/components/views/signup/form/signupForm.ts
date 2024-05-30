import authService from "@/api/auth";
import { useForm } from "vee-validate";
import * as yup from "yup";

export default function () {
    const schema = yup.object({
        firstName: yup.string().required("First name is required"),
        lastName: yup.string().required("Last name is required"),
        email: yup
            .string()
            .email("Invalid email format")
            .required("Email is required"),
        password: yup
            .string()
            .min(8, "Password must be at least 8 characters")
            .required("Password is required"),
    });

    const { handleSubmit, errors, isValidating, defineField, resetForm } =
        useForm({
            validationSchema: schema,
        });

    const onSubmit = handleSubmit(async (data) => {
        // Handle form submission logic here (e.g., sending signup data to server)
        return authService.signup({
            email: data["email"],
            password: data["password"],
            firstName: data["firstName"],
            lastName: data["lastName"],
            phone: data["phone"],
        });
    });

    const [firstName, firstNameAttrs] = defineField("firstName");
    const [lastName, lastNameAttrs] = defineField("lastName");
    const [email, emailAttrs] = defineField("email");
    const [password, passwordAttrs] = defineField("password");

    return {
        onSubmit,
        firstName,
        firstNameAttrs,
        lastName,
        lastNameAttrs,
        email,
        emailAttrs,
        password,
        passwordAttrs,
        errors,
        isValidating,
        resetForm,
    };
}
