<template>
    <div class="flex flex-column items-center">
        <Avatar class="w-32 h-32 mb-2" avatar-url="" initials="HN"></Avatar>
        <button class="bg-sky-500 text-white font-bold px-6 py-2 rounded mb-4">
            Upload Photo
        </button>
        <p class="font-bold text-xl">Hiro Nguyen</p>
        <p class="text-slate-600">example@gmail.com</p>
        <div class="grid grid-cols-2 divide-x">
            <div class="p-3 flex flex-column items-center">
                <p class="text-xl font-bold">0</p>
                <p class="text-slate-600">Projects</p>
            </div>
            <div class="p-3 flex flex-column items-center">
                <p class="text-xl font-bold">0</p>
                <p class="text-slate-600">Reviews</p>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import Avatar from "@/components/base/Avatar.vue";
</script>
