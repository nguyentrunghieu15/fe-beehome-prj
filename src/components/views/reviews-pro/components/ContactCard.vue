<template>
    <div
        class="w-72 flex flex-col mt-8 border-2 border-t-4 border-slate-100 border-t-sky-500 divide-y px-4 py-6 ml-2"
    >
        <p class="flex items-center text-sky-500">
            Liên hệ để biết thông tin giá dịch vụ
            <v-icon class="ml-2" icon="mdi-cash-multiple"></v-icon>
        </p>
        <div class="pt-4">
            <InputField
                class=""
                :is-required="true"
                label="Vị trí"
            ></InputField>
            <DatePicker
                label="Đặt lịch"
                :is-required="true"
                v-model:model-value="test"
            ></DatePicker>
            <v-btn class="w-full" size="large" color="blue-lighten-1"
                >Liên hệ nhà cung cấp</v-btn
            >
            <p
                class="w-full flex justify-center flex text-slate-500 text-sm mt-2"
            >
                <v-icon icon="mdi-chat-outline" class="mr-2"></v-icon>
                Phản hồi trong khoảng 2 phut
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
