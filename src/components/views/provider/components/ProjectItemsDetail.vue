<template>
    <div class="">
        <Dialog
            :label="hire?.service.name ?? ''"
            v-model:modelValue="modelValue"
        >
            <div class="flex">
                <div class="mb-2 w-[40rem]">
                    <h4 class="px-4">
                        <span class="font-bold">Khách hàng:</span>
                        {{ userHire?.firstName }} {{ userHire?.lastName }}
                    </h4>
                    <div class="px-4">
                        <h4 class="font-bold">
                            Số điện thoại:
                            <span class="px-4 font-bold text-sky-500">
                                {{ userHire?.phone }}
                            </span>
                        </h4>

                        <h4 class="font-bold">
                            Email:
                            <span class="px-4 font-bold text-sky-500">
                                {{ userHire?.email }}
                            </span>
                        </h4>
                    </div>
                    <p class="px-4">
                        <span class="font-bold">Từ ngày:</span>
                        {{ props.hire?.workTimeFrom }}
                    </p>
                    <p class="px-4">
                        <span class="font-bold">Đến ngày:</span>
                        {{ hire?.workTimeTo }}
                    </p>
                    <p class="px-4">
                        <span class="font-bold">Tại nơi:</span>
                        {{ hire?.fullAddress }}
                    </p>
                    <p class="px-4">
                        <span class="font-bold">Mô tả vấn đề:</span>
                        {{ hire?.issue }}
                    </p>
                </div>
                <ReplyCard
                    v-if="hire?.review"
                    description="This product is really awesome and exceeded my expectations."
                    :rating="hire.review.rating"
                    :comment="hire.review.comment"
                    :note="hire.review?.note || ''"
                    title="Cảm ơn phản hồi của quý khách"
                    :author="hire.provider.name"
                    :reply="hire?.review.reply"
                    v-model:message="message"
                ></ReplyCard>
            </div>
            <template #actions>
                <div class="flex gap-2 justify-center">
                    <v-btn
                        color="blue-lighten-1"
                        prepend-icon="mdi-check-all"
                        v-if="props.actions.includes(0)"
                        @click="onClickMarkDone(hire?.id || '')"
                        >Xác nhận hoàn thành</v-btn
                    >
                    <v-btn
                        color="green-lighten-1"
                        prepend-icon="mdi-check-decagram"
                        v-if="props.actions.includes(1)"
                        @click="onClickApprove(hire?.id || '')"
                        >Đồng ý yêu cầu</v-btn
                    >
                    <v-btn
                        color="red-lighten-1"
                        prepend-icon="mdi-elevation-decline"
                        v-if="props.actions.includes(2)"
                        @click="onClickDecline(hire?.id || '')"
                        >Từ chối yêu cầu</v-btn
                    >
                    <v-btn
                        color="red-lighten-1"
                        prepend-icon="mdi-elevation-decline"
                        v-if="props.actions.includes(3)"
                        @click="onClickCancel(hire?.id || '')"
                        >Hủy</v-btn
                    >
                    <v-btn
                        color="blue-lighten-1"
                        prepend-icon="mdi-elevation-decline"
                        v-if="props.actions.includes(5) && !hire?.review?.reply"
                        @click="onReply"
                        >Phản hồi đánh giá</v-btn
                    >
                </div>
            </template>
        </Dialog>
    </div>
</template>
<script setup lang="ts">
import { HireStatus, type HireInfor } from "@/api/hire/interfaces";
import Dialog from "@/components/base/Dialog.vue";
import type { ActionProjectItem } from "../constants";
import type { UserInfor } from "@/api/user/interfaces";
import { onMounted, ref } from "vue";
import userService from "@/api/user";
import ReplyCard from "./ReplyCard.vue";
import providerService from "@/api/provider";
import hireService from "@/api/hire";

const props = defineProps<{
    hire?: HireInfor;
    actions: ActionProjectItem[];
}>();

const message = ref("");

const userHire = ref<UserInfor>();
const modelValue = defineModel<boolean>();

onMounted(() => {
    if (props.hire?.userId) {
        userService.getUser(props.hire?.userId).then((v) => {
            userHire.value = v;
        });
    }
    message.value = props.hire?.review?.reply || "";
});

const onReply = async () => {
    try {
        if (message.value && props.hire?.review?.id) {
            await providerService.replyReviewAsPro({
                reply: message.value,
                reviewId: props.hire?.review?.id,
            });
            emit("update");
        }
    } catch (error) {}
};

const emit = defineEmits<{
    update: [];
}>();

async function onClickMarkDone(id: string) {
    try {
        await hireService.updateStatusHire(id, HireStatus.FINISH);
        emit("update");
    } catch (error) {}
}

function onClickApprove(id: string) {
    try {
        hireService.updateStatusHire(id, HireStatus.START);
        emit("update");
    } catch (error) {}
}

function onClickDecline(id: string) {
    try {
        hireService.updateStatusHire(id, HireStatus.CANCEL);
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
