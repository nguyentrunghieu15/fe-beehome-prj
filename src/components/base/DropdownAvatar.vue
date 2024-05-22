<template>
    <div class="relative z-50">
        <button
            type="button"
            @click="toggleDropdown"
            class="rounded-full overflow-hidden"
        >
            <slot name="avatar">
                <img
                    v-if="props.avatarUrl"
                    :src="props.avatarUrl"
                    alt="Avatar"
                    class="w-10 h-10"
                />
                <span
                    v-else
                    class="text-xl font-bold bg-sky-100 text-sky-700 inline-flex items-center justify-center w-10 h-10 rounded-full"
                >
                    {{ props.initials }}
                </span>
            </slot>
        </button>
        <div
            v-show="isOpen"
            @click.away="closeDropdown"
            class="absolute right-0 mt-2 w-32 rounded-md shadow-sm bg-white"
        >
            <slot />
        </div>
    </div>

    <div
        v-if="isOpen"
        @click.away="closeDropdown"
        class="z-10 absolute top-0 w-full h-dvh"
    ></div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const props = defineProps<{
    avatarUrl: string;
    initials: string;
}>();

const isOpen = ref(false);
function toggleDropdown() {
    isOpen.value = !isOpen.value;
}
function closeDropdown() {
    isOpen.value = false;
}
</script>

<style scoped>
/* Add any additional styles for the dropdown content here */
</style>
