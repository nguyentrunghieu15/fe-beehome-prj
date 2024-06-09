import hireService from "@/api/hire";
import type { HireInfor } from "@/api/hire/interfaces";
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

    const hiresOfCustomer = ref<HireInfor[]>([]);
    const hiresOfCustomerComputed = computed(() => {
        return hiresOfCustomer;
    });

    async function fetchUser() {
        return profileService.getProfile().then((data) => {
            setUser(data);
        });
    }

    function setUser(value: UserInfor) {
        user.value = value;
    }

    async function fetchHiresOfCustomer() {
        if (!user.value?.id) return;
        return hireService
            .findAllHires({ userId: user.value?.id })
            .then((data) => {
                setHiresOfCustomer(data.hires);
            });
    }

    function setHiresOfCustomer(value: HireInfor[]) {
        hiresOfCustomer.value = value;
    }

    return {
        setUser,
        userComputed,
        fetchUser,
        fetchHiresOfCustomer,
        hiresOfCustomerComputed,
    };
});
