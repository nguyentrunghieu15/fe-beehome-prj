<template>
    <div class="md:flex items-center h-full z-20">
        <div class="flex shrink grow items-center" @click="returnHome">
            <img
                src="@/assets/icon.png"
                alt="Image description"
                class="w-16 h-16 hover:cursor-pointer"
            />
            <span
                class="flex items-center text-sky-500 font-semibold text-2xl hover:cursor-pointer"
                >Bee Home</span
            >
            <input
                type="text"
                class="ml-4 w-80 border focus:text-gray-900 border-gray-300 text-gray-400 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="What's on to-do list?"
            />
            <v-btn class="m-0" color="primary">
                Search
                <v-icon  icon="mdi-magnify"></v-icon>
            </v-btn>
        </div>
        <div class="flex items-center px-4 h-full z-20">
            <RouterLink
                :to="{ name: 'error' }"
                class="p-2 bg-sky-500 text-white font-bold rounded-3xl hover:cursor-pointer"
                >Sign up as a pro</RouterLink
            >
        </div>
        <a
            class="flex items-center h-full px-4 text-slate-600 hover:border-b-slate-300 hover:border-b-2 z-20"
            >Project</a
        >
        <RouterLink
            :to="{ name: 'signup' }"
            class="flex items-center h-full px-4 text-slate-600 hover:border-b-slate-300 hover:border-b-2 z-20"
            >Team</RouterLink
        >
        <RouterLink
            :to="{ name: 'login' }"
            class="flex items-center h-full px-4 text-slate-600 hover:border-b-slate-300 hover:border-b-2 z-20"
            >Inbox</RouterLink
        >
        <DropdownAvatar class="mr-4" avatar-url="" initials="JM">
            <a href="#" class="block px-4 py-2 hover:bg-gray-100">Profile</a>
            <a href="#" class="block px-4 py-2 hover:bg-gray-100">Settings</a>
            <a href="#" class="block px-4 py-2 hover:bg-gray-100">Logout</a>
        </DropdownAvatar>
    </div>
</template>
<script setup lang="ts">
import { useRouter } from "vue-router";
import DropdownAvatar from "@/components/base/DropdownAvatar.vue";

const router = useRouter();
const returnHome = () => {
    router.push({ path: "/" });
};
</script>
