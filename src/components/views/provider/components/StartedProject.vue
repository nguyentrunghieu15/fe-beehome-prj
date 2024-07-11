<template>
    <div>
        <FilterProject
            :list-service="listService"
            @apply="applyFilter"
        ></FilterProject>
        <ProjectItems
            class="my-4"
            v-for="h in hires"
            :key="h.id"
            @view="
                () => {
                    isShowProjectDetail = !isShowProjectDetail;
                    selectedHire = h;
                }
            "
            :service-name="h.service.name"
            :from="h.workTimeFrom"
            :to="h.workTimeTo"
            :describle="h.issue"
            :actions="[ActionProjectItem.MARK_DONE, ActionProjectItem.CANCEL]"
            :id="h.id"
            @update="
                () => {
                    hires = [];
                    loadData(0, counterPage * 5 + 5, 5);
                }
            "
        ></ProjectItems>
        <div v-if="hires.length" class="flex justify-center py-8">
            <v-btn
                class="border"
                variant="text"
                color="grey-darken-1"
                rounded
                @click="
                    () => {
                        counterPage++;
                        loadData(counterPage);
                    }
                "
                >Xem thêm</v-btn
            >
        </div>
        <NoDataFound v-if="!hires.length"></NoDataFound>
        <ProjectItemsDetail
            v-if="isShowProjectDetail"
            v-model:model-value="isShowProjectDetail"
            :actions="[ActionProjectItem.MARK_DONE, ActionProjectItem.CANCEL]"
            :hire="selectedHire"
            @update="
                () => {
                    hires = [];
                    loadData(0, counterPage * 5 + 5, 5);
                }
            "
        ></ProjectItemsDetail>
    </div>
</template>
<script setup lang="ts">
import NoDataFound from "@/components/base/NoDataFound.vue";
import ProjectItems from "./ProjectItems.vue";
import ProjectItemsDetail from "./ProjectItemsDetail.vue";
import { onMounted, ref } from "vue";
import { useProviderStore } from "@/stores/providerStore";
import { ActionProjectItem } from "../constants";
import { HireStatus, type HireInfor } from "@/api/hire/interfaces";
import hireService from "@/api/hire";
import FilterProject from "../../customer-project/components/FilterProject.vue";
import serviceManagerService from "@/api/service";
import type { Service } from "@/api/service/interfaces";

const isShowProjectDetail = ref(false);
const providerStore = useProviderStore();
const selectedHire = ref<HireInfor>();
const hires = ref<HireInfor[]>([]);

const counterPage = ref(0);
const search = ref();
const serviceId = ref();
const listService = ref<Service[]>([]);

async function loadData(page?: number, limit = 5, pageSize = 5) {
    try {
        const res = await hireService.findHires({
            providerId: providerStore.providerComputed.value?.id,
            status: HireStatus.START,
            searchName: search.value || "",
            serviceId: serviceId.value || "",
            pagination: {
                limit: limit,
                page: page,
                pageSize: pageSize,
            },
        });
        hires.value?.push(...res.hires);
    } catch (error) {}
}

async function applyFilter(searchString: string, serviceString: string) {
    search.value = searchString;
    serviceId.value = serviceString;
    counterPage.value = 0;
    hires.value = [];
    loadData(counterPage.value);
}

onMounted(() => {
    if (!providerStore.providerComputed.value?.id) {
        providerStore.fetchProvider();
    }
    setTimeout(() => {
        loadData(counterPage.value);
    }, 200);
    serviceManagerService.listServices({}).then((e) => {
        listService.value = e.services;
    });
});
</script>
