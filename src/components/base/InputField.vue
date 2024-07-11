<template>
    <div class="mb-4">
        <label
            v-if="label?.length"
            class="block mb-2 text-sm font-bold text-gray-900"
            >{{ props.label }}
            <span v-if="isRequired" class="text-red-800">*</span></label
        >
        <input
            :type="props.type"
            v-model="modelValue"
            :required="isRequired"
            :class="{
                'text-gray-400': props.isDisable,
                'text-gray-900': !props.isDisable,
            }"
            class="border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full"
            :placeholder="props.placeHolder"
            :disabled="props.isDisable"
            @keyup.enter="emit('enter')"
        />
        <p
            v-if="props.errors"
            class="mt-2 text-xs italic text-red-600 dark:text-red-500"
        >
            <span class="font-medium">! {{ props.errors }}</span>
        </p>
    </div>
</template>
<script setup lang="ts">
import type { InputTypeHTMLAttribute } from "vue";

const props = defineProps<{
    label?: string;
    isRequired?: boolean;
    placeHolder?: string;
    errors?: string;
    isDisable?: boolean;
    type?: InputTypeHTMLAttribute | "text";
}>();

const modelValue = defineModel();
const emit = defineEmits<{
    enter: [];
}>();
</script>
