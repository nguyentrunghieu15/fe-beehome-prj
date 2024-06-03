<template>
    <div class="w-full flex flex-column items-center mb-15">
        <div class="w-[32rem] mt-6 mb-2">
            <v-btn
                class="text-none justify-self-start"
                color="blue-lighten-1"
                variant="text"
                prepend-icon="mdi-less-than"
                @click="$router.replace({ path: '/pro/profile' })"
                >Back</v-btn
            >
            <p class="font-semibold text-3xl">Profile Information</p>
        </div>
        <div class="w-[32rem] p-6">
            <div class="grid grid-cols-2 gap-4">
                <InputField
                    :is-required="true"
                    label="Name:"
                    type="text"
                    class="mb-6"
                ></InputField>
                <InputField
                    :is-required="true"
                    label="Year:"
                    type="number"
                    class="mb-6"
                ></InputField>
            </div>
            <div>
                <InputField
                    :is-required="true"
                    label="Postal Code:"
                    type="text"
                    class="mb-6 w-24"
                ></InputField>
            </div>
            <div>
                <AreaTextField
                    :rows="10"
                    :cols="3"
                    :is-required="true"
                    label="Introduction"
                    class="mb-6"
                ></AreaTextField>
            </div>
        </div>
        <div class="w-[32rem] mt-6 mb-2">
            <p class="font-semibold text-3xl">Services</p>
        </div>
        <div class="w-[32rem] p-6">
            <p>Home remove glass</p>
        </div>
    </div>
</template>
<script setup lang="ts">
import InputField from "@/components/base/InputField.vue";
import AreaTextField from "@/components/base/AreaTextField.vue";
</script>
