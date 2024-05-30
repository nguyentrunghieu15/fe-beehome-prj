import authService from "@/api/auth";
import { useForm } from "vee-validate";
import * as yup from "yup";
export default function () {
    const schema = yup.object({
        email: yup
            .string()
            .email("Invalid email format")
            .required("Email is required"),
        password: yup
            .string()
            .min(8, "Password must be at least 6 characters")
            .required("Password is required"),
    });

    const { handleSubmit, errors, isValidating, defineField, resetForm } =
        useForm({
            validationSchema: schema,
        });

    const onSubmit = handleSubmit(async (data) => {
        // Handle form submission logic here (e.g., sending login data to server)
        return authService.login({ email: data["email"], password: data["password"] });
    });
    const [email, emailAttrs] = defineField("email");
    const [password, passwordAttrs] = defineField("password");

    // ... your existing logic using email, password, errors, etc.

    return {
        // ... your existing return object excluding resetForm and setFieldValue
        onSubmit,
        email,
        emailAttrs,
        password,
        passwordAttrs,
        errors, // Expose errors for potential rendering elsewhere
        isValidating,
        resetForm, // Expose isValidating state for potential rendering elsewhere
    };
}
