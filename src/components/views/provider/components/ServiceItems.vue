<template>
    <div>
        <div
            class="flex border-2 p-1 rounded-xl hover:bg-sky-600 hover:text-slate-50 bg-sky-50 border-sky-500"
            @mouseenter="isHover = !isHover"
            @mouseleave="isHover = !isHover"
        >
            <p class="font-bold px-1">{{ name }}</p>
            <div
                class="hover:cursor-pointer hover:text-red-600 mx-1"
                :class="{
                    hidden: !isHover,
                    block: isHover,
                }"
                @click="$emit('remove', idService)"
            >
                <v-icon icon="mdi-tag-remove-outline"></v-icon>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { ref } from "vue";

const props = defineProps<{
    name: string;
    idService: string;
    isDisable?: boolean;
}>();

const isHover = ref(false);

const emit = defineEmits<{
    remove: [id: string];
}>();
</script>
