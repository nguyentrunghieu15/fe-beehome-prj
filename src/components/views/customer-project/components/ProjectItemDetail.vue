<template>
    <div class="">
        <Dialog
            :label="hire?.service.name ?? ''"
            v-model:modelValue="modelValue"
        >
            <div class="mb-2 w-[40rem]">
                <h4 class="px-4">
                    <span class="font-bold">Provider:</span>
                    {{ hire?.provider?.name }}
                </h4>
                <div class="px-4">
                    <OverviewCard
                        :location="provider?.postalCode.place ?? ''"
                        :yearExp="hire?.provider.years ?? 0"
                        :paymentMethods="
                            provider?.paymentMethod?.map((e) => e.name) || []
                        "
                    ></OverviewCard>
                    <div>
                        <div>
                            <div class="font-bold mb-2">Social media</div>
                            <div class="space-y-0.5">
                                <a
                                    class="text-sky-500 mr-2 font-bold"
                                    v-for="(e, index) in provider?.socialMedias"
                                    :key="index"
                                    :href="e.link"
                                    >{{ e.name
                                    }}{{
                                        index !=
                                            provider?.socialMedias?.length ??
                                        0 - 1
                                            ? ","
                                            : ""
                                    }}</a
                                >
                            </div>
                        </div>
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
import type { ActionProjectItem } from "../../provider/constants";
import OverviewCard from "../../reviews-pro/components/OverviewCard.vue";
import type { ProviderInfo } from "@/api/provider/interfaces";
import { onMounted, ref } from "vue";
import providerService from "@/api/provider";
const props = defineProps<{
    hire?: HireInfor;
    actions: ActionProjectItem[];
}>();

const modelValue = defineModel<boolean>();

const provider = ref<ProviderInfo>();

onMounted(() => {
    if (props.hire?.providerId) {
        providerService.findProById(props.hire?.providerId).then((v) => {
            provider.value = v.provider;
        });
    }
});
</script>
