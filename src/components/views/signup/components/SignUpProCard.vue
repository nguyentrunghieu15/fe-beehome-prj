<template>
    <div class="w-[32rem] rounded-lg p-6 bg-white">
        <div class="grid grid-cols-2 gap-4">
            <InputField
                :is-required="true"
                label="Name:"
                v-model:model-value="form.name.value"
                type="text"
                class="mb-6"
                :errors="form.errors.value.name"
            ></InputField>
            <InputField
                :is-required="true"
                label="Year:"
                v-model:model-value="form.years.value"
                type="number"
                class="mb-6"
                :errors="form.errors.value.years"
            ></InputField>
        </div>
        <div>
            <InputField
                :is-required="true"
                label="Postal Code:"
                v-model:model-value="form.postalCode.value"
                type="text"
                class="mb-6 w-24"
                :errors="form.errors.value.postalCode"
            ></InputField>
        </div>
        <div>
            <AreaTextField
                :rows="10"
                :cols="3"
                :is-required="true"
                label="Introduction"
                v-model:model-value="form.introduction.value"
                class="mb-6"
                :errors="form.errors.value.introduction"
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
import providerService from "@/api/provider";

const form = useForm();
const router = useRouter();

onMounted(() => {
    form.resetForm();
});

const submit = async () => {
    if ((await form.validate()).valid) {
        form.onSubmit().then(async () => {
            try {
                await providerService.joinAsProvider();
                router.push({ name: "main" });
            } catch (error) {}
        });
    }
};
</script>
