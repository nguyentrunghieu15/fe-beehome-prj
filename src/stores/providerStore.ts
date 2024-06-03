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
        console.log("fetch provider");
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
