<template>
    <div class="mb-4">
        <label v-if="label" class="block mb-2 text-sm font-bold text-gray-900"
            >{{ props.label }}
            <span v-if="isRequired" class="text-red-800">*</span></label
        >
        <v-autocomplete
            :items="items"
            variant="outlined"
            v-model="modelValue"
            :placeholder="props.placeholder"
            :disabled = "props.isDisable"
        ></v-autocomplete>
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
    errors?: string;
    label?: string;
    isRequired?: boolean;
    items: string[];
    placeholder?: string;
    isDisable?:boolean
}>();

const modelValue = defineModel();
</script>
