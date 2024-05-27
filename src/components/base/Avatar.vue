<template>
    <div
        class="relative z-50 box-border"
        :class="props.isRounded ? ' rounded-full' : ''"
    >
        <slot name="avatar">
            <img
                v-if="props.avatarUrl"
                :src="props.avatarUrl"
                alt="Avatar"
                class="w-full h-full"
            />
            <span
                v-else
                class="text-xl font-bold bg-sky-100 text-sky-700 inline-flex items-center justify-center w-full h-full"
                :class="props.isRounded ? ' rounded-full' : ''"
            >
                {{ props.initials }}
            </span>
        </slot>
    </div>
</template>

<script setup lang="ts">
const props = defineProps<{
    avatarUrl: string;
    initials: string;
    isRounded: boolean;
}>();
</script>
