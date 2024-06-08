import profileService from "@/api/profile";
import providerService from "@/api/provider";
import type { ProviderInfo } from "@/api/provider/interfaces";
import type { Service } from "@/api/service/interfaces";
import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const useProviderStore = defineStore("provider", () => {
    const provider = ref<ProviderInfo>();
    const needFetchProvider = ref<Boolean>(true);
    const needFetchService = ref<Boolean>(true);

    const servicesOfProvice = ref<Array<Service>>([]);

    const providerComputed = computed(() => {
        if (needFetchProvider.value) {
            fetchProvider();
            needFetchProvider.value = false;
        }
        return provider;
    });

    const servicesOfProviceComputed = computed(() => {
        if (needFetchService.value) {
            fetchServiceOfProvider();
            needFetchService.value = false;
        }
        return servicesOfProvice;
    });

    const socialMediaProvider = computed(() => provider.value?.socialMedias);

    function fetchProvider() {
        // do sum thing to fetch
        if (sessionStorage.getItem("PROVIDER_TOKEN")) {
            providerService.getProviderProfile().then((data) => {
                setProvider(data.provider);
                fetchServiceOfProvider();
            });
        }
    }

    function fetchServiceOfProvider() {
        if (provider.value) {
            providerService
                .getAllServicesOfProvider({ id: provider.value.id })
                .then((data) => {
                    setServiceOfProvider(data.services);
                });
        }
    }

    function setServiceOfProvider(value: Service[]) {
        servicesOfProvice.value = value;
    }

    function setProvider(value: ProviderInfo) {
        provider.value = value;
    }

    return {
        setProvider,
        providerComputed,
        fetchProvider,
        servicesOfProviceComputed,
        setServiceOfProvider,
        fetchServiceOfProvider,
        socialMediaProvider,
    };
});
