<template>
    <div class="w-[32rem] rounded-lg p-6 bg-white">
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
        <div class="flex w-full justify-between mb-6">
            <div>
                <input
                    type="checkbox"
                    class="w-[20px] h-[20px] border border-gray-300 rounded mr-2"
                />
                <span>Remember me</span>
            </div>
            <a href="#" class="hover:underline hover:text-sky-500"
                >Forgot password?</a
            >
        </div>
        <button
            class="bg-sky-500 text-white w-full py-2 text-xl font-bold rounded mb-6"
            @click="submit"
        >
            Login
        </button>
    </div>
</template>
<script setup lang="ts">
import InputField from "@/components/base/InputField.vue";
import useForm from "../form/loginForm";
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import providerService from "@/api/provider";

const form = useForm();
const router = useRouter();

onMounted(() => {
    form.resetForm();
});

const submit = () => {
    form.onSubmit().then(async () => {
        try {
            await providerService.joinAsProvider();
        } catch (error) {}
        router.push({ name: "main" });
    });
};
</script>
