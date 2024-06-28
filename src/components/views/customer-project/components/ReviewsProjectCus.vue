<template>
    <div>
        <ProjectItem
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
            :actions="[]"
            :id="h.id"
        ></ProjectItem>
        <NoDataFound v-if="!penddingHires.length"></NoDataFound>
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
import { computed, onMounted, ref } from "vue";
import type { HireInfor } from "@/api/hire/interfaces";
import { ActionProjectItem } from "../../provider/constants";
import { useUserStore } from "@/stores/userStore";

const isShowProjectDetail = ref(false);
const selectedHire = ref<HireInfor>();

const userStore = useUserStore();
const user = userStore.userComputed;
const hires = userStore.hiresOfCustomerComputed;

onMounted(() => {
    userStore.fetchHiresOfCustomer();
});

const penddingHires = computed(() => {
    return hires.value.filter((e) => {
        if (e.status === "done" && e.review) {
            return e;
        }
    });
});
</script>
