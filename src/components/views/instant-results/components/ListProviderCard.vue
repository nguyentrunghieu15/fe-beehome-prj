<template>
    <div class="flex-col px-4 space-y-4">
        <div v-if="provider.length" class="my-4 py-4">
            <p class="font-bold text-3xl">Các nhà cung cấp có thể gần bạn</p>
            <p class="text-gray-500">dựa trên thônh tin tìm kiếm</p>
        </div>
        <ProviderCard
            v-for="p in provider"
            :key="p.id"
            :address="p.address"
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
            <v-btn
                class="border"
                variant="text"
                color="grey-darken-1"
                rounded
                @click="
                    () => {
                        curentPage++;
                        loadData(curentPage);
                    }
                "
                >Xem thêm</v-btn
            >
        </div>
    </div>
</template>
<script setup lang="ts">
import ProviderCard from "./ProviderCard.vue";
import { useRoute, useRouter } from "vue-router";
import { onMounted, ref, watch } from "vue";
import providerService from "@/api/provider";
import type { ProviderViewInfo } from "@/api/provider/interfaces";
import NoDataFound from "@/components/base/NoDataFound.vue";

const router = useRouter();

const provider = ref<Array<ProviderViewInfo>>([]);

const route = useRoute();

const curentPage = ref(0);

function loadData(page?: number) {
    if (route.query.name?.length && route.query.address?.length) {
        const name = route.query.name?.toString();
        const address = route.query.address?.toString();
        providerService
            .findProviders({
                filter: {
                    serviceName: name,
                    address: address,
                },
                pagination: {
                    limit: 10,
                    page: page,
                    pageSize: 10,
                },
            })
            .then((v) => {
                provider.value.push(...v.providers);
            });
    }
}

onMounted(() => {
    loadData(curentPage.value);
});

watch(
    () => route.query.name,
    (newName, oldName) => {
        curentPage.value = 0;
        provider.value = [];
        if (newName?.length && route.query.address?.length) {
            loadData(curentPage.value);
        }
    }
);

watch(
    () => route.query.address,
    (newName, oldName) => {
        curentPage.value = 0;
        provider.value = [];
        if (newName?.length && route.query.name?.length) {
            loadData(curentPage.value);
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
