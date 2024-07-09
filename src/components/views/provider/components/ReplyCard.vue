<template>
    <div>
        <div class="max-w-sm rounded overflow-hidden shadow-lg p-4 bg-white">
            <div class="font-bold text-xl mb-2">Đánh giá của khách hàng:</div>
            <div class="mt-4">
                <span class="font-bold">Số điểm:</span>
                <div class="flex items-center">
                    <span
                        v-for="n in rating"
                        :key="`filled-${n}`"
                        class="text-yellow-500 star animate-star"
                    >
                        &#9733;
                    </span>
                    <span
                        v-for="n in 5 - rating"
                        :key="`empty-${n}`"
                        class="text-gray-400 star animate-star"
                    >
                        &#9733;
                    </span>
                </div>
            </div>
            <div class="mt-4">
                <span class="font-bold">Nhận xét:</span>
                <p class="text-gray-700">{{ comment }}</p>
            </div>
            <div class="mt-4">
                <span class="font-bold">Lưu ý:</span>
                <p class="text-gray-700">{{ note }}</p>
            </div>
        </div>
        <div
            class="max-w-sm rounded overflow-hidden shadow-lg p-4 bg-gray-100 mt-4 ml-8"
        >
            <div class="font-bold text-lg mb-2">{{ title }}</div>
            <AreaTextField
                :cols="3"
                :rows="3"
                errors=""
                :is-required="false"
                label=""
                v-model:model-value="message"
                :is-disable="(message?.length ?? 0) > 0"
            ></AreaTextField>
            <div class="mt-4 text-right">
                <span class="font-bold">- {{ author }}</span>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import AreaTextField from "@/components/base/AreaTextField.vue";

const props = defineProps<{
    reviewAt?: String;
    rating: number;
    comment: String;
    note: String;
    title: String;
    author: String;
}>();

const message = defineModel<string>("message");
</script>
