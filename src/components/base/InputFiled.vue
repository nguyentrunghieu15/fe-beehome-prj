<template>
    <div class="mb-4">
        <label
            for="input"
            class="block mb-2 text-sm font-bold text-gray-900 dark:text-gray-400"
            >{{ props.label }}
            <span v-if="isRequired" class="text-red-800">*</span></label
        >
        <input
            type="text"
            id="input"
            :value="props.modelValue"
            @input="emit('update:modelValue', $event.target.value)"
            :required="isRequired"
            class="text-gray-900 dark:text-gray-400 placeholder-gray-700 dark:placeholder-gray-500 text-sm rounded-lg focus:ring-bule-500 focus:border-bule-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-500"
            :placeholder="props.placeHolder"
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
const props = defineProps<{
    label: string;
    isRequired: boolean;
    placeHolder?: string;
    errors?: string;
    modelValue: string | undefined;
}>();
const emit = defineEmits(["update:modelValue"]);
</script>
