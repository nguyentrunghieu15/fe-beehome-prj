<template>
    <div>
        <div class="w-[40rem] p-6 border-[1px] drop-shadow-md relative">
            <div class="mb-2" @click="emit('view')">
                <h3 class="text-2xl font-bold">{{ props.serviceName }}</h3>
                <p class="px-4">
                    <span class="font-bold">Từ ngày:</span>
                    {{ FormatTimestamp(props.from) }}
                </p>
                <p class="px-4">
                    <span class="font-bold">Đến ngày:</span
                    >{{ FormatTimestamp(props.to) }}
                </p>
                <p class="px-4">
                    <span class="font-bold">Mô tả vấn đề:</span>
                    {{
                        props.describle.length < 255
                            ? props.describle
                            : props.describle.slice(0, 255) + "..."
                    }}
                </p>
            </div>
            <div class="flex gap-2 justify-end">
                <v-btn
                    color="blue-lighten-1"
                    prepend-icon="mdi-check-all"
                    v-if="props.actions.includes(0)"
                    @click="onClickMarkDone(id)"
                    >Xác nhận hoàn thành</v-btn
                >
                <v-btn
                    prepend-icon="mdi-elevation-decline"
                    v-if="props.actions.includes(3)"
                    @click="onClickCancel(id)"
                    >Hủy</v-btn
                >
                <v-btn
                    prepend-icon="mdi-comment-processing-outline"
                    color="blue-lighten-1"
                    v-if="props.actions.includes(4)"
                    @click="emit('review')"
                    >Đánh giá</v-btn
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
import type { ActionProjectItem } from "../../provider/constants";
import { HireStatus } from "@/api/hire/interfaces";
import { FormatTimestamp } from "@/utils";

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
    update: [];
}>();

async function onClickMarkDone(id: string) {
    try {
        await hireService.updateStatusHire(id, HireStatus.FINISH);
        emit("update");
    } catch (error) {}
}


function onClickCancel(id: string) {
    try {
        hireService.updateStatusHire(id, HireStatus.CANCEL);
        emit("update");
    } catch (error) {}
}
</script>
