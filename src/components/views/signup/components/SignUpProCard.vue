<template>
    <div class="w-[32rem] rounded-lg p-6 bg-white">
        <div class="grid grid-cols-2 gap-4">
            <InputField
                :is-required="true"
                label="Name:"
                v-model:model-value="form.firstName.value"
                type="text"
                class="mb-6"
                :errors="form.errors.value.firstName"
            ></InputField>
            <InputField
                :is-required="true"
                label="Year:"
                v-model:model-value="form.lastName.value"
                type="number"
                class="mb-6"
                :errors="form.errors.value.lastName"
            ></InputField>
        </div>
        <div>
            <InputField
                :is-required="true"
                label="Postal Code:"
                v-model:model-value="form.email.value"
                type="text"
                class="mb-6 w-24"
                :errors="form.errors.value.email"
            ></InputField>
        </div>
        <div>
            <AreaTextField
                :rows="10"
                :cols="3"
                :is-required="true"
                label="Introduction"
                v-model:model-value="form.password.value"
                class="mb-6"
                :errors="form.errors.value.password"
            ></AreaTextField>
        </div>
        <div class="mb-6 text-slate-500">
            <p>
                By clicking Create Provider Profile, you agree to the
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
            Create Provider Profile
        </button>
    </div>
</template>
<script setup lang="ts">
import AreaTextField from "@/components/base/AreaTextField.vue";
import InputField from "@/components/base/InputField.vue";
import useForm from "../form/signupProForm";
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import { useMainStore } from "@/stores/mainStore";

const form = useForm();
const router = useRouter();
const mainStore = useMainStore();

onMounted(() => {
    form.resetForm();
});

const submit = () => {
    form.onSubmit().then(() => {
        mainStore.showNofitication({
            content: "Sign up success",
            title: "Success",
            typeNotification: "infor",
        });
        router.push({ name: "main" });
    });
};
</script>
