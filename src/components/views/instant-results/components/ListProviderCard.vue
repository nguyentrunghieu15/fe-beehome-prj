<template>
    <div class="flex-col px-4 space-y-4">
        <div v-if="provider.length" class="my-4 py-4">
            <p class="font-bold text-3xl">Top 10 Pros near you</p>
            <p class="text-gray-500">based on you criteria</p>
        </div>
        <ProviderCard
            v-for="p in provider"
            :key="p.id"
            :address="p.postalCode.place"
            :introduce="p.introduction"
            :name="p.name"
            :num-hires="p.numHires"
            :num-rating="p.rating.numRating"
            :rating="p.rating.avgRating"
            @more="onClickView(p.id)"
            @view="onClickView(p.id)"
        ></ProviderCard>
        <NoDataFound v-if="!provider.length"></NoDataFound>
        <div v-else class="flex justify-center py-8">
            <v-btn class="border" variant="text" color="grey-darken-1" rounded
                >See more</v-btn
            >
        </div>
    </div>
</template>
<script setup lang="ts">
import ProviderCard from "./ProviderCard.vue";
import { onBeforeRouteUpdate, useRoute, useRouter } from "vue-router";
import { onMounted, ref, watch } from "vue";
import providerService from "@/api/provider";
import type { ProviderViewInfo } from "@/api/provider/interfaces";
import NoDataFound from "@/components/base/NoDataFound.vue";

const router = useRouter();

const provider = ref<Array<ProviderViewInfo>>([]);

const route = useRoute();

function loadData() {
    if (route.query.name?.length && route.query.zipcode?.length) {
        providerService
            .findProviders({
                filter: {
                    serviceName: route.query.name?.toString(),
                    postalCode: route.query.zipcode?.toString(),
                },
            })
            .then((v) => {
                provider.value = v.providers;
            });
    }
}

onMounted(() => {
    loadData();
});

watch(
    () => route.query.name,
    (newName, oldName) => {
        if (newName?.length && route.query.zipcode?.length) {
            loadData();
        }
    }
);

watch(
    () => route.query.zipcode,
    (newName, oldName) => {
        if (newName?.length && route.query.name?.length) {
            loadData();
        }
    }
);

function onClickView(id: string) {
    router.push({
        name: "view-pro",
        query: {
            id: id,
        },
    });
}
</script>
