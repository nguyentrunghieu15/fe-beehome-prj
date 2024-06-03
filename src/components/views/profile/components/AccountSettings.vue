<template>
    <div class="w-full flex flex-column items-center mb-15">
        <div class="w-[32rem] mt-6 mb-8">
            <v-btn
                class="text-none justify-self-start"
                color="blue-lighten-1"
                variant="text"
                prepend-icon="mdi-less-than"
                @click="$router.replace({ path: '/profile' })"
                >Back</v-btn
            >
            <p class="flex justify-center font-semibold text-3xl">
                Edit personal information
            </p>
        </div>
        <div class="w-[32rem] p-6">
            <div class="grid grid-cols-2 gap-4">
                <InputField
                    :is-required="false"
                    label="First name:"
                    v-model:model-value="updateForm.firstName.value"
                    type="text"
                    class="mb-6"
                    :errors="updateForm.errors.value.firstName"
                ></InputField>
                <InputField
                    :is-required="false"
                    label="Last name:"
                    v-model:model-value="updateForm.lastName.value"
                    type="text"
                    class="mb-6"
                    :errors="updateForm.errors.value.lastName"
                ></InputField>
            </div>
            <InputField
                :is-required="false"
                label="Email:"
                type="text"
                class="mb-6"
                :model-value="user?.email"
                :is-disable="true"
            ></InputField>
            <InputField
                :is-required="false"
                label="Phone:"
                v-model:model-value="updateForm.phone.value"
                type="text"
                class="mb-6"
                :errors="updateForm.errors.value.phone"
            ></InputField>

            <InputField
                :is-required="false"
                label="Timezone:"
                model-value="UTC +7.00"
                type="text"
                class="mb-6 w-1/2"
                :errors="updateForm.errors.value.timeZone"
                :is-disable="true"
            ></InputField>
            <div class="flex justify-end">
                <button
                    class="bg-sky-500 text-white py-2 px-6 text-xl font-bold rounded mr-2"
                    @click="submit"
                >
                    Save
                </button>
                <button
                    class="bg-gray-100 border-2 border-gray-400 py-2 px-6 text-xl font-bold rounded"
                    @click="$router.replace({ path: '/profile' })"
                >
                    Cancel
                </button>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import InputField from "@/components/base/InputField.vue";
import { onMounted } from "vue";
import useUpdateForm from "../form/updateForm";
import { useUserStore } from "@/stores/userStore";
import { useRouter } from "vue-router";

const updateForm = useUpdateForm();
const userStore = useUserStore();
const user = userStore.userComputed;
const router = useRouter();

function setFormValue() {
    updateForm.setFieldValue("firstName", user.value?.firstName);
    updateForm.setFieldValue("lastName", user.value?.lastName);
    updateForm.setFieldValue("phone", user.value?.phone);
}

onMounted(() => {
    updateForm.resetForm();
    setFormValue();
});

function submit() {
    updateForm.onSubmit().then((ok) => {
        if (ok != undefined) {
            userStore.updateUser().then(() => {
                setFormValue();
            });
        }
    });
}
</script>
