<template>
    <div>
        <FilterProject
            :list-service="listService"
            @apply="applyFilter"
        ></FilterProject>
        <ProjectItem
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
            :actions="[ActionProjectItem.CANCEL, ActionProjectItem.MARK_DONE]"
            :id="h.id"
            @click="loadData(counterPage)"
            @update="
                () => {
                    hires = [];
                    loadData(0, counterPage * 5 + 5, 5);
                }
            "
        ></ProjectItem>
        <div class="flex justify-center py-8">
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
        <NoDataFound v-if="!hires?.length"></NoDataFound>
        <ProjectItemDetail
            v-if="isShowProjectDetail"
            v-model:model-value="isShowProjectDetail"
            :actions="[ActionProjectItem.CANCEL, ActionProjectItem.MARK_DONE]"
            :hire="selectedHire"
            @update="
                () => {
                    hires = [];
                    loadData(0, counterPage * 5+5, 5);
                }
            "
        ></ProjectItemDetail>
    </div>
</template>
<script setup lang="ts">
import NoDataFound from "@/components/base/NoDataFound.vue";
import ProjectItem from "./ProjectItem.vue";
import ProjectItemDetail from "./ProjectItemDetail.vue";
import { onMounted, ref } from "vue";
import { HireStatus, type HireInfor } from "@/api/hire/interfaces";
import { ActionProjectItem } from "../../provider/constants";
import { useUserStore } from "@/stores/userStore";
import hireService from "@/api/hire";
import type { Service } from "@/api/service/interfaces";
import serviceManagerService from "@/api/service";
import FilterProject from "./FilterProject.vue";

const isShowProjectDetail = ref(false);
const selectedHire = ref<HireInfor>();
const hires = ref<HireInfor[]>([]);

const userStore = useUserStore();
const counterPage = ref(0);
const search = ref();
const serviceId = ref();
const listService = ref<Service[]>([]);

async function loadData(page?: number, limit = 5, pageSize = 5) {
    try {
        const res = await hireService.findHires({
            userId: userStore.userComputed.value?.id,
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
    if (!userStore.userComputed.value?.id) {
        userStore.fetchUser();
    }
    setTimeout(() => {
        loadData(counterPage.value);
    }, 200);
    serviceManagerService.listServices({}).then((e) => {
        listService.value = e.services;
    });
});
</script>
