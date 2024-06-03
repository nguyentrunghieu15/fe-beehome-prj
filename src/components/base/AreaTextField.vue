<template>
    <div class="mb-4">
        <label for="" class="block mb-2 text-sm font-bold text-gray-900"
            >{{ props.label }}
            <span v-if="isRequired" class="text-red-800">*</span></label
        >
        <textarea
            :rows="props.rows"
            :cols="props.cols"
            v-model="modelValue"
            :class="{
                'text-gray-400': props.isDisable,
                'text-gray-900': !props.isDisable,
            }"
            class="border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full"
            :placeholder="props.placeHolder"
            :disabled="props.isDisable"
        >
        </textarea>
        <p
            v-if="props.errors"
            class="mt-2 text-xs italic text-red-600 dark:text-red-500"
        >
            <span class="font-medium">! {{ props.errors }}</span>
        </p>
    </div>
</template>
<script setup lang="ts">

const props = defineProps<{
    label: string;
    isRequired: boolean;
    placeHolder?: string;
    errors?: string;
    isDisable?: boolean;
    rows: number;
    cols: number;
}>();

const modelValue = defineModel({ type: String });
</script>
