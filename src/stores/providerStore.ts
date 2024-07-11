import hireService from "@/api/hire";
import type { Hire, HireInfor } from "@/api/hire/interfaces";
import profileService from "@/api/profile";
import providerService from "@/api/provider";
import type { ProviderInfo } from "@/api/provider/interfaces";
import type { Service } from "@/api/service/interfaces";
import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const useProviderStore = defineStore("provider", () => {
    const provider = ref<ProviderInfo>();
    const needFetchService = ref<Boolean>(true);

    const servicesOfProvider = ref<Array<Service>>([]);

    const providerComputed = computed(() => {
        return provider;
    });

    const hiresOfProvider = ref<HireInfor[]>([]);

    const servicesOfProviceComputed = computed(() => {
        if (needFetchService.value) {
            fetchServiceOfProvider();
            needFetchService.value = false;
        }
        return servicesOfProvider;
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
        servicesOfProvider.value = value;
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
