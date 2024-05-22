<template>
    <div class="md:flex items-center h-full z-20">
        <div class="flex shrink grow" @click="returnHome">
            <img
                src="@/assets/icon.png"
                alt="Image description"
                class="w-16 h-16 hover:cursor-pointer"
            />
            <span
                class="flex items-center text-sky-500 font-semibold text-2xl hover:cursor-pointer"
                >Bee Home</span
            >
        </div>
        <div class="flex items-center px-4 h-full z-20">
            <a
                class="p-2 bg-sky-500 text-white font-bold rounded-3xl hover:cursor-pointer"
                >Join as a pro</a
            >
        </div>
        <a
            class="flex items-center h-full px-4 text-slate-600 hover:border-b-slate-300 hover:border-b-2 z-20"
            >Explore</a
        >
        <RouterLink
            :to="{ name: 'signup' }"
            class="flex items-center h-full px-4 text-slate-600 hover:border-b-slate-300 hover:border-b-2 z-20"
            >Sign up</RouterLink
        >
        <RouterLink
            :to="{ name: 'login' }"
            class="flex items-center h-full px-4 text-slate-600 hover:border-b-slate-300 hover:border-b-2 z-20"
            >Log in</RouterLink
        >
    </div>
</template>
<script setup lang="ts">
import { useRouter } from "vue-router";

const router = useRouter();
const returnHome = () => {
    router.push({ path: "/" });
};
</script>
