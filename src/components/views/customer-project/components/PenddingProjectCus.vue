<template>
    <div>
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
            :actions="[ActionProjectItem.CANCEL]"
            :id="h.id"
            @update="onUpdate"
        ></ProjectItem>
        <div class="flex justify-center py-8">
            <v-btn
                class="border"
                variant="text"
                color="grey-darken-1"
                rounded
                @click="loadData(counterPage)"
                >Xem thêm</v-btn
            >
        </div>
        <NoDataFound v-if="!hires?.length"></NoDataFound>
        <ProjectItemDetail
            v-if="isShowProjectDetail"
            v-model:model-value="isShowProjectDetail"
            :actions="[ActionProjectItem.CANCEL]"
            :hire="selectedHire"
            @update="onUpdate"
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
import hireService from "@/api/hire";
import { useUserStore } from "@/stores/userStore";

const isShowProjectDetail = ref(false);
const selectedHire = ref<HireInfor>();
const hires = ref<HireInfor[]>([]);
const userStore = useUserStore();
let counterPage = 0;

async function loadData(page?: number, limit = 5, pageSize = 5) {
    try {
        const res = await hireService.findHires({
            userId: userStore.userComputed.value?.id,
            status: HireStatus.START,
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
