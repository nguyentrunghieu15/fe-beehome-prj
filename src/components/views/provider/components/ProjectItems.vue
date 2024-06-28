<template>
    <div>
        <div class="w-[40rem] p-6 border-[1px] drop-shadow-md relative">
            <div class="mb-2" @click="emit('view')">
                <h3 class="text-2xl font-bold">{{ props.serviceName }}</h3>
                <p class="px-4">
                    <span class="font-bold">From:</span> {{ props.from }}
                </p>
                <p class="px-4">
                    <span class="font-bold">To:</span>{{ props.to }}
                </p>
                <p class="px-4">
                    <span class="font-bold">Issue:</span>
                    {{ props.describle.slice(0, 255) }}
                </p>
            </div>
            <div class="flex gap-2 justify-center">
                <v-btn
                    color="blue-lighten-1"
                    prepend-icon="mdi-check-all"
                    v-if="props.actions.includes(0)"
                    @click="onClickMarkDone(id)"
                    >Mark its done</v-btn
                >
                <v-btn
                    color="green-lighten-1"
                    prepend-icon="mdi-check-decagram"
                    v-if="props.actions.includes(1)"
                    @click="onClickApprove(id)"
                    >Approve</v-btn
                >
                <v-btn
                    color="red-lighten-1"
                    prepend-icon="mdi-elevation-decline"
                    v-if="props.actions.includes(2)"
                    @click="onClickDecline(id)"
                    >Decline</v-btn
                >
                <v-btn
                    color="red-lighten-1"
                    prepend-icon="mdi-elevation-decline"
                    v-if="props.actions.includes(3)"
                    >Cancel</v-btn
                >
                <v-btn
                    color="blue-lighten-1"
                    prepend-icon="mdi-elevation-decline"
                    v-if="props.actions.includes(5)"
                    @click="emit('reply')"
                    >Reply</v-btn
                >
            </div>
            <div class="absolute top-0 right-0">
                <v-btn
                    variant="text"
                    color="blue-grey-lighten-3"
                    icon="mdi-close-circle-outline"
                    @click=""
                ></v-btn>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import hireService from "@/api/hire";
import type { ActionProjectItem } from "../constants";
import { useProviderStore } from "@/stores/providerStore";

const props = defineProps<{
    id: string;
    serviceName: string;
    from: string;
    to: string;
    describle: string;
    actions: ActionProjectItem[];
}>();

const emit = defineEmits<{
    view: [];
    reply: [];
}>();

const providerStore = useProviderStore();

async function onClickMarkDone(id: string) {
    try {
        await hireService.updateStatusHire(id, "done");
        providerStore.fetchHireOfProvider();
    } catch (error) {}
}

function onClickApprove(id: string) {
    try {
        hireService.updateStatusHire(id, "approve");
        providerStore.fetchHireOfProvider();
    } catch (error) {}
}

function onClickDecline(id: string) {
    try {
        hireService.updateStatusHire(id, "decline");
        providerStore.fetchHireOfProvider();
    } catch (error) {}
}
</script>
