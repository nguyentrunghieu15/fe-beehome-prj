import profileService from "@/api/profile";
import providerService from "@/api/provider";
import type { ProviderInfo } from "@/api/provider/interfaces";
import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const useProviderStore = defineStore("provider", () => {
    const provider = ref<ProviderInfo>();
    const needFetchProvider = ref<Boolean>(true);

    const providerComputed = computed(() => {
        if (needFetchProvider.value) {
            fetchProvider();
            needFetchProvider.value = false;
        }
        return provider;
    });

    function fetchProvider() {
        // do sum thing to fetch
        if (sessionStorage.getItem("PROVIDER_TOKEN")) {
            providerService.getProviderProfile().then((data) => {
                setProvider(data.provider);
            });
        }
    }

    function setProvider(value: ProviderInfo) {
        provider.value = value;
    }

    return {
        setProvider,
        providerComputed,
        fetchProvider,
    };
});
