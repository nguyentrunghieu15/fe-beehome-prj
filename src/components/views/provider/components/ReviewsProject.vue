<template>
    <div>
        <ProjectItems
            class="my-4"
            v-for="h in penddingHires"
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
            :actions="[ActionProjectItem.REPLY]"
            :id="h.id"
            @reply="
                () => {
                    isShowProjectDetail = !isShowProjectDetail;
                    selectedHire = h;
                }
            "
        ></ProjectItems>
        <NoDataFound v-if="!penddingHires.length"></NoDataFound>
        <ProjectItemsDetail
            v-if="isShowProjectDetail"
            v-model:model-value="isShowProjectDetail"
            :actions="[ActionProjectItem.REPLY]"
            :hire="selectedHire"
        ></ProjectItemsDetail>
    </div>
</template>
<script setup lang="ts">
import NoDataFound from "@/components/base/NoDataFound.vue";
import ProjectItems from "./ProjectItems.vue";
import ProjectItemsDetail from "./ProjectItemsDetail.vue";
import { computed, onMounted, proxyRefs, ref } from "vue";
import { useProviderStore } from "@/stores/providerStore";
import { ActionProjectItem } from "../constants";
import type { HireInfor } from "@/api/hire/interfaces";

const isShowProjectDetail = ref(false);
const providerStore = useProviderStore();
const provider = providerStore.providerComputed;
const selectedHire = ref<HireInfor>();
const hires = providerStore.hiresOfProviderComputed;
const penddingHires = computed(() => {
    return hires.value.filter((e) => {
        if (e.status === "done" && e.review) {
            return e;
        }
    });
});
</script>
