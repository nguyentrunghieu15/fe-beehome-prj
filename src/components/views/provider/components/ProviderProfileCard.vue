<template>
    <div class="flex flex-column items-center">
        <Avatar
            class="w-32 h-32 mb-2"
            :is-rounded="false"
            avatar-url=""
            :initials="initialsAvatar"
        ></Avatar>
        <button class="bg-sky-500 text-white font-bold px-6 py-2 rounded mb-4">
            Upload Photo
        </button>
        <p class="text-slate-600">{{ provider?.name }}</p>
        <div class="grid grid-cols-2 divide-x">
            <div class="p-3 flex flex-column items-center">
                <p class="text-xl font-bold">0</p>
                <p class="text-slate-600">Hires</p>
            </div>
            <div class="p-3 flex flex-column items-center">
                <p class="text-xl font-bold">0</p>
                <p class="text-slate-600">Ratings</p>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import Avatar from "@/components/base/Avatar.vue";
import { useProviderStore } from "@/stores/providerStore";
import { useUserStore } from "@/stores/userStore";
import { computed } from "vue";

const userStore = useUserStore();

const user = userStore.userComputed;
const initialsAvatar = computed(() => {
    if (
        user.value?.firstName?.charAt(0)?.toUpperCase() &&
        user.value?.lastName.charAt(0).toUpperCase()
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
</script>
