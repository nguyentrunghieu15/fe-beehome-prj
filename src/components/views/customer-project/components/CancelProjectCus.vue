<template>
    <div>
        <FilterProject
            :list-service="listService"
            @apply="applyFilter"
        ></FilterProject>
        <div v-for="h in hires" class="flex gap-4">
            <ProjectItem
                class="my-4"
                :key="h.id"
                @view="
                    () => {
                        isShowProjectDetail = !isShowProjectDetail;
                        selectedHire = h;
                    }
                "
                @review="
                    () => {
                        isShowReviewCardId = h.id;
                    }
                "
                :service-name="h.service.name"
                :from="h.workTimeFrom"
                :to="h.workTimeTo"
                :describle="h.issue"
                :actions="[]"
                :id="h.id"
                @update="loadData(counterPage)"
            ></ProjectItem>
            <div class="p-4" v-show="h.id === isShowReviewCardId">
                <ReviewCard
                    :hire-infor="h"
                    :title="h.service.name + ' | ' + h.provider.name"
                    :description="h.issue"
                    @cancel="isShowReviewCardId = ''"
                    @on-submit="onSubmitReview"
                />
            </div>
        </div>
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
            :actions="[]"
            :hire="selectedHire"
        ></ProjectItemDetail>
    </div>
</template>
<script setup lang="ts">
import NoDataFound from "@/components/base/NoDataFound.vue";
import ProjectItem from "./ProjectItem.vue";
import ProjectItemDetail from "./ProjectItemDetail.vue";
import { onMounted, ref } from "vue";
import { HireStatus, type HireInfor } from "@/api/hire/interfaces";
import { useUserStore } from "@/stores/userStore";
import ReviewCard from "./ReviewCard.vue";
import hireService from "@/api/hire";
import FilterProject from "./FilterProject.vue";
import serviceManagerService from "@/api/service";
import type { Service } from "@/api/service/interfaces";
const isShowProjectDetail = ref(false);
const selectedHire = ref<HireInfor>();

const userStore = useUserStore();
const hires = ref<HireInfor[]>([]);

var isShowReviewCardId = ref("");
const counterPage = ref(0);
const search = ref();
const serviceId = ref();
const listService = ref<Service[]>([]);

async function loadData(page?: number, limit = 5, pageSize = 5) {
    try {
        const res = await hireService.findHires({
            userId: userStore.userComputed.value?.id,
            status: HireStatus.CANCEL,
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
    loadData(counterPage.value);
    serviceManagerService.listServices({}).then((e) => {
        listService.value = e.services;
    });
});

function onSubmitReview() {
    loadData();
}
</script>
