<template>
    <div class="date-input w-full">
        <label
            for="input"
            class="block mb-2 text-sm font-bold text-gray-900 dark:text-gray-400"
            >{{ props.label }}
            <span v-if="isRequired" class="text-red-800">*</span></label
        >
        <input
            v-model="modelValue"
            type="date"
            class="w-full h-[2.375rem] border rounded-lg px-2 py-1 focus:outline-none focus:ring focus:ring-blue-500"
        />
    </div>
</template>
<script setup lang="ts">
const props = defineProps<{
    label: string;
    isRequired: boolean;
}>();
const modelValue = defineModel();
</script>
<style scoped>
.date-input {
    align-items: center;
    margin-bottom: 1rem;
}
</style>
