<template>
    <div class="text-cyan-800 bg-blue-100 rounded-xl p-1 text-sm">
        <v-icon :icon="props.icon"></v-icon>
        <span>{{ props.label }}</span>
    </div>
</template>
<script setup lang="ts">
const props = defineProps<{
    icon: string;
    label: string;
}>();
</script>
