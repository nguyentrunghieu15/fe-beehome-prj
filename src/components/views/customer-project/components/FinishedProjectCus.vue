<template>
    <div>
        <div v-for="h in penddingHires" class="flex gap-4">
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
                :actions="[ActionProjectItem.CANCEL, ActionProjectItem.REVIEW]"
                :id="h.id"
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

        <NoDataFound v-if="!penddingHires.length"></NoDataFound>
        <ProjectItemDetail
            v-if="isShowProjectDetail"
            v-model:model-value="isShowProjectDetail"
            :actions="[ActionProjectItem.CANCEL, ActionProjectItem.REVIEW]"
            :hire="selectedHire"
        ></ProjectItemDetail>
    </div>
</template>
<script setup lang="ts">
import NoDataFound from "@/components/base/NoDataFound.vue";
import ProjectItem from "./ProjectItem.vue";
import ProjectItemDetail from "./ProjectItemDetail.vue";
import { computed, onMounted, proxyRefs, ref } from "vue";
import { useProviderStore } from "@/stores/providerStore";
import type { HireInfor } from "@/api/hire/interfaces";
import { ActionProjectItem } from "../../provider/constants";
import { useUserStore } from "@/stores/userStore";
import ReviewCard from "./ReviewCard.vue";
const isShowProjectDetail = ref(false);
const selectedHire = ref<HireInfor>();

const userStore = useUserStore();
const user = userStore.userComputed;
const hires = userStore.hiresOfCustomerComputed;

var isShowReviewCardId = ref("");

onMounted(() => {
    userStore.fetchHiresOfCustomer();
});

function onSubmitReview() {
    userStore.fetchHiresOfCustomer();
}

const penddingHires = computed(() => {
    return hires.value.filter((e) => {
        if (e.status === "done" && !e.review) {
            return e;
        }
    });
});
</script>
