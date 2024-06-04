import profileService from "@/api/profile";
import providerService from "@/api/provider";
import type { UserInfor } from "@/api/user/interfaces";
import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const useUserStore = defineStore("user", () => {
    const user = ref<UserInfor>();
    const needFetchUser = ref<Boolean>(true);

    const userComputed = computed(() => {
        if (needFetchUser.value) {
            fetchUser();
            needFetchUser.value = false;
        }
        return user;
    });

    async function fetchUser() {
        return profileService.getProfile().then((data) => {
            setUser(data);
        });
    }

    function setUser(value: UserInfor) {
        user.value = value;
    }

    return {
        setUser,
        userComputed,
        fetchUser,
    };
});
