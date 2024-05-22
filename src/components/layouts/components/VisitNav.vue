<template>
    <div class="md:flex items-center h-full">
        <div class="flex shrink grow">
            <img
                src="@/assets/icon.png"
                alt="Image description"
                class="w-16 h-16"
            />
            <span class="flex items-center text-sky-500 font-semibold text-2xl"
                >Bee Home</span
            >
        </div>
        <div class="flex items-center px-4 h-full">
            <a
                class="p-2 bg-sky-500 text-white font-bold rounded-3xl hover:cursor-pointer"
                >Join as a pro</a
            >
        </div>
        <a
            class="flex items-center h-full px-4 text-slate-600 hover:border-b-slate-300 hover:border-b-2"
            >Explore</a
        >
        <RouterLink
            :to="{ name: 'signup' }"
            class="flex items-center h-full px-4 text-slate-600 hover:border-b-slate-300 hover:border-b-2"
            >Sign up</RouterLink
        >
        <RouterLink
            :to="{ name: 'login' }"
            class="flex items-center h-full px-4 text-slate-600 hover:border-b-slate-300 hover:border-b-2"
            >Log in</RouterLink
        >
    </div>
</template>
<script setup lang="ts"></script>
