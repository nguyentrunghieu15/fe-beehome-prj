import profileService from "@/api/profile";
import type { UserInfor } from "@/api/user/interfaces";
import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const useUserStore = defineStore("user", () => {
    const user = ref<UserInfor>();

    const userComputed = computed(() => {
        if (!user.value) {
            profileService.getProfile().then((data) => {
                setUser(data);
            });
        }
        return user;
    });

    function updateUser() {
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
        updateUser,
    };
});
