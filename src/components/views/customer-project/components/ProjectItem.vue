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
                    prepend-icon="mdi-elevation-decline"
                    v-if="props.actions.includes(3)"
                    >Cancel</v-btn
                >
                <v-btn
                    prepend-icon="mdi-comment-processing-outline"
                    color="blue-lighten-1"
                    v-if="props.actions.includes(4)"
                    @click="emit('review')"
                    >Review</v-btn
                >
                <v-btn
                    prepend-icon="mdi-reply-outline"
                    v-if="props.actions.includes(5)"
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
import { useProviderStore } from "@/stores/providerStore";
import type { ActionProjectItem } from "../../provider/constants";
import { useUserStore } from "@/stores/userStore";

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
    review: [];
}>();

const providerStore = useProviderStore();
const userStore = useUserStore();

async function onClickMarkDone(id: string) {
    try {
        await hireService.updateStatusHire(id, "done");
        providerStore.fetchHireOfProvider();
        userStore.fetchHiresOfCustomer();
    } catch (error) {}
}
</script>
