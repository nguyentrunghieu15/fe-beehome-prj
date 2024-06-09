<template>
    <div class="">
        <Dialog
            :label="hire?.service.name ?? ''"
            v-model:modelValue="modelValue"
        >
            <div class="mb-2 w-[40rem]">
                <h4 class="px-4">
                    <span class="font-bold">Customer:</span>
                    {{ userHire?.firstName }} {{ userHire?.lastName }}
                </h4>
                <div class="px-4">
                    <h4 class="font-bold">Contact:</h4>
                    <div class="px-4 font-bold text-sky-500">
                        <a href="#">Facebook</a>
                    </div>
                </div>
                <p class="px-4">
                    <span class="font-bold">From:</span>
                    {{ props.hire?.workTimeFrom }}
                </p>
                <p class="px-4">
                    <span class="font-bold">To:</span> {{ hire?.workTimeTo }}
                </p>
                <p class="px-4">
                    <span class="font-bold">Issue:</span> {{ hire?.issue }}
                </p>
            </div>
            <template #actions>
                <div class="flex gap-2 justify-center">
                    <v-btn
                        color="blue-lighten-1"
                        prepend-icon="mdi-check-all"
                        v-if="props.actions.includes(0)"
                        >Mark its done</v-btn
                    >
                    <v-btn
                        color="green-lighten-1"
                        prepend-icon="mdi-check-decagram"
                        v-if="props.actions.includes(1)"
                        >Approve</v-btn
                    >
                    <v-btn
                        color="red-lighten-1"
                        prepend-icon="mdi-elevation-decline"
                        v-if="props.actions.includes(2)"
                        >Decline</v-btn
                    >
                    <v-btn
                        color="red-lighten-1"
                        prepend-icon="mdi-elevation-decline"
                        v-if="props.actions.includes(3)"
                        >Cancel</v-btn
                    >
                </div>
            </template>
        </Dialog>
    </div>
</template>
<script setup lang="ts">
import type { HireInfor } from "@/api/hire/interfaces";
import Dialog from "@/components/base/Dialog.vue";
import type { ActionProjectItem } from "../constants";
import type { UserInfor } from "@/api/user/interfaces";
import { onMounted, ref } from "vue";
import userService from "@/api/user";

const props = defineProps<{
    hire?: HireInfor;
    actions: ActionProjectItem[];
}>();

const userHire = ref<UserInfor>();
const modelValue = defineModel<boolean>();

onMounted(() => {
    if (props.hire?.userId) {
        userService.getUser(props.hire?.userId).then((v) => {
            userHire.value = v;
        });
    }
});
</script>
