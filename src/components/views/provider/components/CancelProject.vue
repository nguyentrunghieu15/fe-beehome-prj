<template>
    <div>
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
            :actions="[]"
            :id="h.id"
             @update="onUpdate"
        ></ProjectItems>
        <NoDataFound v-if="!hires.length"></NoDataFound>
        <ProjectItemsDetail
            v-if="isShowProjectDetail"
            v-model:model-value="isShowProjectDetail"
            :actions="[]"
            :hire="selectedHire"
            @update="onUpdate"
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

const isShowProjectDetail = ref(false);
const providerStore = useProviderStore();
const selectedHire = ref<HireInfor>();
const hires = ref<HireInfor[]>([]);

let counterPage = 0;

async function loadData(page?: number, limit = 5, pageSize = 5) {
    try {
        const res = await hireService.findHires({
            providerId: providerStore.providerComputed.value?.id,
            status: HireStatus.CANCEL,
            pagination: {
                limit: limit,
                page: page,
                pageSize: pageSize,
            },
        });
        hires.value?.push(...res.hires);
        counterPage++;
    } catch (error) {}
}

onMounted(() => {
    loadData(counterPage);
});

function onUpdate() {
    hires.value = [];
    loadData(0, counterPage * 5 + 5, counterPage * 5 + 5);
    counterPage--;
}
</script>
