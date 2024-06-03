<template>
    <div class="md:flex items-center h-full z-20">
        <div class="flex shrink grow items-center">
            <img
                @click="returnHome"
                src="@/assets/icon.png"
                alt="Image description"
                class="w-16 h-16 hover:cursor-pointer"
            />
            <span
                @click="returnHome"
                class="flex items-center text-sky-500 font-semibold text-2xl hover:cursor-pointer"
                >Bee Home</span
            >
            <input
                type="text"
                class="ml-4 w-96 border focus:text-gray-900 border-gray-300 text-gray-400 text-sm rounded-l-lg focus:ring-blue-500 focus:border-blue-500 block dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="What's on to-do list?"
            />
            <input
                type="text"
                class="w-24 border focus:text-gray-900 border-gray-300 text-gray-400 text-sm focus:ring-blue-500 focus:border-blue-500 block dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Zipcode"
            />
            <v-btn class="m-0" rounded="0" color="primary">
                Search
                <v-icon icon="mdi-magnify"></v-icon>
            </v-btn>
        </div>
        <div class="flex items-center px-4 h-full z-20">
            <RouterLink
                :to="{ name: 'error' }"
                class="p-2 bg-sky-500 text-white font-bold rounded-3xl hover:cursor-pointer shrink-0"
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
        <DropdownAvatar class="mr-4" avatar-url="" :initials="initialsAvatar">
            <RouterLink
                :to="{ path: '/profile' }"
                class="block px-4 py-2 hover:bg-gray-100"
                >Profile</RouterLink
            >
            <p @click="logout" class="block px-4 py-2 hover:bg-gray-100">
                Logout
            </p>
        </DropdownAvatar>
    </div>
</template>
<script setup lang="ts">
import { useRouter } from "vue-router";
import DropdownAvatar from "@/components/base/DropdownAvatar.vue";
import { computed, onMounted, ref } from "vue";
import { useUserStore } from "@/stores/userStore";

const userStore = useUserStore();
const router = useRouter();
const returnHome = () => {
    router.push({ path: "/" });
};

const logout = () => {
    // Do something before return home
    sessionStorage.clear();
    router.go(0)
};
const user = userStore.userComputed;
const initialsAvatar = computed(() => {
    if (
        user.value?.firstName.charAt(0).toUpperCase() &&
        user.value?.lastName.charAt(0).toUpperCase()
    ) {
        return (
            user.value?.firstName.charAt(0).toUpperCase() +
            user.value?.lastName.charAt(0).toUpperCase()
        );
    }
    return "";
});
</script>
