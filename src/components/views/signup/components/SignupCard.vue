<template>
    <div class="w-[32rem] rounded-lg p-6 bg-white">
        <div class="grid grid-cols-2 gap-4">
            <InputField
                :is-required="true"
                label="First name:"
                v-model:model-value="form.firstName.value"
                type="text"
                class="mb-6"
                :errors="form.errors.value.firstName"
            ></InputField>
            <InputField
                :is-required="true"
                label="Last name:"
                v-model:model-value="form.lastName.value"
                type="password"
                class="mb-6"
                :errors="form.errors.value.lastName"
            ></InputField>
        </div>
        <InputField
            :is-required="true"
            label="Email:"
            v-model:model-value="form.email.value"
            type="text"
            class="mb-6"
            :errors="form.errors.value.email"
        ></InputField>
        <InputField
            :is-required="true"
            label="Password"
            v-model:model-value="form.password.value"
            type="password"
            class="mb-6"
            :errors="form.errors.value.password"
        ></InputField>

        <div class="mb-6 text-slate-500">
            <p>Your password must:</p>
            <ul class="list-disc px-6 mb-2">
                <li>be 8 to 72 characters long</li>
                <li>not contain your name or email</li>
                <li>
                    not be commonly used, easily guessed or contain any
                    variation of the word “Beehome”
                </li>
            </ul>
            <p>
                By clicking Create Account, you agree to the
                <span class="text-cyan-500 underline hover:cursor-pointer"
                    >Terms of Use</span
                >
                and
                <span class="text-cyan-500 underline hover:cursor-pointer"
                    >Privacy Policy</span
                >.
            </p>
        </div>
        <button
            class="bg-sky-500 text-white w-full py-2 text-xl font-bold rounded mb-6"
            @click="submit"
        >
            Create Account
        </button>
    </div>
</template>
<script setup lang="ts">
import InputField from "@/components/base/InputField.vue";
import useForm from "../form/signupForm";
import { onMounted } from "vue";

const form = useForm();

onMounted(() => {
    form.resetForm();
});

const submit = () => {
    form.onSubmit();
};
</script>
