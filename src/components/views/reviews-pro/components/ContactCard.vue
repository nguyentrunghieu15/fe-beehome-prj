<template>
    <div
        class="w-72 flex flex-col mt-8 border-2 border-t-4 border-slate-100 border-t-sky-500 divide-y px-4 py-6 ml-2"
    >
        <p class="flex items-center text-sky-500">
            Contact for price
            <v-icon class="ml-2" icon="mdi-cash-multiple"></v-icon>
        </p>
        <div class="pt-4">
            <InputField
                class=""
                :is-required="true"
                label="Zip code"
            ></InputField>
            <DatePicker
                label="Schedule"
                :is-required="true"
                v-model:model-value="test"
            ></DatePicker>
            <v-btn class="w-full" size="large" color="blue-lighten-1"
                >Contact Pro</v-btn
            >
            <p
                class="w-full flex justify-center flex text-slate-500 text-sm mt-2"
            >
                <v-icon icon="mdi-chat-outline" class="mr-2"></v-icon>
                Response in about 2 minute
            </p>
        </div>
    </div>
</template>
<script setup lang="ts">
import InputField from "@/components/base/InputField.vue";
import DatePicker from "@/components/base/DatePicker.vue";
import { ref } from "vue";

const test = ref();
</script>
