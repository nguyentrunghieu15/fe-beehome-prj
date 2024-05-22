<template>
    <div class="w-full">
        <div class="flex flex-column items-center">
            <Avatar class="w-32 h-32" avatar-url="" initials="HN"></Avatar>
            <button class="bg-sky-500 text-white font-bold px-6 py-2 rounded">
                Upload Photo
            </button>
            <p>Hiro Nguyen</p>
            <p>example@gmail.com</p>
            <div class="grid grid-cols-2 divide-x">
                <div>
                    <p>0</p>
                    <p>Projects</p>
                </div>
                <div>
                    <p>0</p>
                    <p>Reviews</p>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import Avatar from "@/components/base/Avatar.vue";
</script>
