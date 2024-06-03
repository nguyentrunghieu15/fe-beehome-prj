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
        </div>
        <div class="flex items-center px-4 h-full z-20">
            <button
                @click="onClickAsCustomer"
                class="p-2 bg-sky-500 text-white font-bold rounded-3xl hover:cursor-pointer shrink-0"
            >
                Join as customers
            </button>
        </div>
        <a
            class="flex items-center h-full px-4 text-slate-600 hover:border-b-slate-300 hover:border-b-2 z-20"
            >Schedule</a
        >
        <RouterLink
            :to="{ name: 'error' }"
            class="flex items-center h-full px-4 text-slate-600 hover:border-b-slate-300 hover:border-b-2 z-20"
            >Inbox</RouterLink
        >
        <RouterLink
            :to="{ name: 'project-pro' }"
            class="flex items-center h-full px-4 text-slate-600 hover:border-b-slate-300 hover:border-b-2 z-20"
            >Project</RouterLink
        >
        <DropdownAvatar class="mr-4" avatar-url="" :initials="initialsAvatar">
            <RouterLink
                :to="{ name: 'profile-pro' }"
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
import { useProviderStore } from "@/stores/providerStore";

const userStore = useUserStore();
const router = useRouter();
const returnHome = () => {
    router.push({ path: "/" });
};

const logout = () => {
    // Do something before return home
    sessionStorage.clear();
    router.go(0);
};
const user = userStore.userComputed;
const initialsAvatar = computed(() => {
    if (
        user.value?.firstName?.charAt(0)?.toUpperCase() &&
        user.value?.lastName?.charAt(0)?.toUpperCase()
    ) {
        return (
            user.value?.firstName?.charAt(0)?.toUpperCase() +
            user.value?.lastName?.charAt(0)?.toUpperCase()
        );
    }
    return "";
});

const providerStore = useProviderStore();
const provider = providerStore.providerComputed;

function onClickAsCustomer() {
    if (provider.value) {
    } else {
        router.push({ name: "signup-pro" });
    }
}
</script>
