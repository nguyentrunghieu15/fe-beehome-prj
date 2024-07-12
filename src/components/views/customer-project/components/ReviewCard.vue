<template>
    <div class="max-w-sm rounded overflow-hidden shadow-lg p-4 bg-white">
        <div class="font-bold text-xl mb-2">{{ title }}</div>
        <p class="text-gray-700 text-base">{{ description }}</p>
        <div class="mt-4">
            <span class="font-bold">Rating:</span>
            <div class="flex items-center">
                <span
                    v-for="n in rating"
                    :key="n"
                    class="text-yellow-500 text-3xl star animate-star"
                    @click="rating = n"
                    >&#9733;</span
                >
                <span
                    v-for="n in 5 - (rating || 0)"
                    :key="n"
                    @click="rating += n"
                    class="text-gray-400 text-3xl star animate-star"
                    >&#9733;</span
                >
            </div>
        </div>
        <div class="mt-4">
            <AreaTextField
                label="Nhận xét"
                :is-disable="false"
                :is-required="true"
                :rows="4"
                place-holder="Khuyến khích mọi người dùng dịch vụ này."
                :cols="4"
                v-model:model-value="comment"
            ></AreaTextField>
        </div>
        <div class="mt-4">
            <AreaTextField
                label="Lưu ý"
                :is-disable="false"
                :is-required="true"
                :rows="4"
                :cols="4"
                place-holder="Đây là dịch vụ đáng thuê nhất của năm."
                v-model:model-value="note"
            ></AreaTextField>
        </div>
        <div class="flex justify-end gap-2">
            <v-btn prepend-icon="mdi-elevation-decline" @click="onClickCancel"
                >Hủy</v-btn
            >
            <v-btn
                prepend-icon="mdi-comment-processing-outline"
                color="blue-lighten-1"
                @click="onSubmit"
                >Nộp</v-btn
            >
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import AreaTextField from "@/components/base/AreaTextField.vue";
import { HireStatus, type HireInfor } from "@/api/hire/interfaces";
import providerService from "@/api/provider";
import { useUserStore } from "@/stores/userStore";
import { join } from "lodash";
import hireService from "@/api/hire";

const props = defineProps<{
    title: String;
    description: String;
    hireInfor: HireInfor;
}>();

const rating = ref(5);
const comment = ref("");
const note = ref("");

const userStore = useUserStore();
const userComputed = userStore.userComputed;

const emit = defineEmits<{
    cancel: [];
    onSubmit: [];
}>();

const onClickCancel = () => {
    emit("cancel");
};

const onSubmit = async () => {
    try {
        await providerService.reviewPro({
            providerId: props.hireInfor.providerId,
            comment: comment.value,
            note: note.value,
            rating: rating.value,
            userName: join(
                [userComputed.value?.firstName, userComputed.value?.lastName],
                " "
            ),
            hireId: props.hireInfor.id,
        });
        await hireService.updateStatusHire(
            props.hireInfor.id,
            HireStatus.REVIEW
        );
        emit("onSubmit");
    } catch (error) {}
};
</script>

<style scoped>
.star {
    transition: transform 0.3s ease, text-shadow 0.3s ease;
}

.star:hover {
    transform: scale(1.5);
    text-shadow: 10px 10px 10px rgba(255, 223, 0, 1);
    cursor: pointer;
}
</style>
