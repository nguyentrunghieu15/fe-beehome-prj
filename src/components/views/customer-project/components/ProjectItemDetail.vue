<template>
    <div class="">
        <Dialog
            :label="hire?.service.name ?? ''"
            v-model:modelValue="modelValue"
        >
            <div class="mb-2 w-[40rem]">
                <h4 class="px-4">
                    <span class="font-bold">Nhà cung cấp:</span>
                    {{ hire?.provider?.name }}
                </h4>
                <div class="px-4">
                    <OverviewCard
                        :location="provider?.address ?? ''"
                        :yearExp="hire?.provider.years ?? 0"
                        :paymentMethods="
                            provider?.paymentMethod?.map((e) => e.name) || []
                        "
                    ></OverviewCard>
                    <div>
                        <div>
                            <div class="font-bold mb-2">Kênh thông tin:</div>
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
                    <span class="font-bold">Thông tin yêu cầu thuê:</span>
                </p>
                <p class="px-6">
                    <span class="font-bold">Từ này:</span>
                    {{ props.hire?.workTimeFrom }}
                </p>
                <p class="px-6">
                    <span class="font-bold">Đến ngày:</span>
                    {{ hire?.workTimeTo }}
                </p>
                <p class="px-6">
                    <span class="font-bold">Tại nơi:</span>
                    {{ hire?.fullAddress }}
                </p>
                <p class="px-6">
                    <span class="font-bold">Mô tả vấn đề:</span>
                    {{ hire?.issue }}
                </p>
            </div>
            <template #actions>
                <div class="flex gap-2 justify-center">
                    <v-btn
                        color="blue-lighten-1"
                        prepend-icon="mdi-check-all"
                        v-if="props.actions.includes(0)"
                        >Xác nhận hoàn thành</v-btn
                    >
                    <v-btn
                        color="green-lighten-1"
                        prepend-icon="mdi-check-decagram"
                        v-if="props.actions.includes(1)"
                        >Chấp thuận</v-btn
                    >
                    <v-btn
                        color="red-lighten-1"
                        prepend-icon="mdi-elevation-decline"
                        v-if="props.actions.includes(2)"
                        >Từ chối</v-btn
                    >
                    <v-btn
                        prepend-icon="mdi-elevation-decline"
                        v-if="props.actions.includes(3)"
                        >Hủy</v-btn
                    >
                    <v-btn
                        prepend-icon="mdi-comment-processing-outline"
                        color="blue-lighten-1"
                        v-if="props.actions.includes(4)"
                        >Đánh giá</v-btn
                    >
                    <v-btn
                        prepend-icon="mdi-reply-outline"
                        v-if="props.actions.includes(5)"
                        >Phản hồi</v-btn
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
