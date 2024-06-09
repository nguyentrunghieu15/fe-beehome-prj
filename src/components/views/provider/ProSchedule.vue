<template>
    <div class="w-full h-screen bg-gradient-to-r from-blue-50 to-red-50">
        <calendar :events="events" @click-event="onClickEvent"></calendar>
        <project-items-detail
            v-if="isShowDetailHire"
            :actions="actions"
            v-model:model-value="isShowDetailHire"
            :hire="selectedHire"
        ></project-items-detail>
    </div>
</template>
<script setup lang="ts">
import { useProviderStore } from "@/stores/providerStore";
import Calendar from "@/components/base/Calendar.vue";
import { computed, onMounted, ref } from "vue";
import type { ICalendarEvent } from "@/components/base/constants";
import ProjectItemsDetail from "./components/ProjectItemsDetail.vue";
import type { HireInfor } from "@/api/hire/interfaces";
import { ActionProjectItem } from "./constants";

const providerStore = useProviderStore();
const hires = providerStore.hiresOfProviderComputed;
const actions = ref<ActionProjectItem[]>([]);
const selectedHire = ref<HireInfor>();
const isShowDetailHire = ref(false);
const provider = providerStore.providerComputed;

const events = computed<ICalendarEvent[]>(() => {
    return hires.value.map((hire) => {
        return {
            color: "bg-" + getRandomColor(),
            from: new Date(hire.workTimeFrom),
            to: new Date(hire.workTimeTo),
            name: hire.service.name,
            id: hire.id,
        };
    });
});

function getRandomColor(): string {
    const colors = [
        "blue-500",
        "indigo-500",
        "purple-500",
        "cyan-500",
        "green-500",
        "orange-500",
        "slate-500",
    ];
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
}

const onClickEvent = (e: ICalendarEvent) => {
    selectedHire.value = hires.value.find((v) => v.id === e.id);
    actions.value = [];
    switch (selectedHire.value?.status) {
        case "pendding":
            actions.value.push(
                ActionProjectItem.MARK_DONE,
                ActionProjectItem.APPROVE,
                ActionProjectItem.CANCEL,
                ActionProjectItem.DECLINE
            );
            break;
        case "approve":
            actions.value.push(
                ActionProjectItem.MARK_DONE,
                ActionProjectItem.CANCEL
            );
            break;
        case "decline":
            break;
        case "done":
            break;
        default:
            break;
    }
    isShowDetailHire.value = true;
};

onMounted(() => {
    providerStore.fetchProvider();
});
</script>
