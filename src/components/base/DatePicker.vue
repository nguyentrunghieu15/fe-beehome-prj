<template>
    <div class="date-input w-full">
        <label for="input" class="block mb-2 text-sm font-bold text-gray-900"
            >{{ props.label }}
            <span v-if="isRequired" class="text-red-800">*</span></label
        >
        <input
            v-model="modelValue"
            :type="typeInput ? typeInput : 'date'"
            class="w-full h-[2.375rem] border rounded-lg px-2 py-1 focus:outline-none focus:ring focus:ring-blue-500"
            :class="[!modelValue ? 'text-slate-400' : '']"
            :min="minDate"
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
    label?: string;
    isRequired?: boolean;
    typeInput?: string;
    errors?: string;
    minDate?: string;
}>();
const modelValue = defineModel();
</script>
<style scoped>
.date-input {
    align-items: center;
    margin-bottom: 1rem;
}
</style>
