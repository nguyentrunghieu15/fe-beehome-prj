<template>
    <div class="progress-bar relative rounded-full overflow-hidden bg-gray-200">
        <div
            :style="{ width: progress + '%' }"
            class="progress-bar-fill h-full rounded-full"
            :class="color"
        ></div>
    </div>
</template>
<script setup lang="ts">
const props = defineProps<{
    progress: number;
    color: string;
}>();
</script>
<style scoped>
.progress-bar {
    width: 100%;
    height: 4px;
}
</style>
