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
                label="Comment"
                :is-disable="false"
                :is-required="true"
                :rows="4"
                place-holder="Highly recommend to everyone."
                :cols="4"
                v-model:model-value="comment"
            ></AreaTextField>
        </div>
        <div class="mt-4">
            <AreaTextField
                label="Note"
                :is-disable="false"
                :is-required="true"
                :rows="4"
                :cols="4"
                place-holder="Best purchase of the year."
                v-model:model-value="note"
            ></AreaTextField>
        </div>
        <div class="flex justify-end gap-2">
            <v-btn prepend-icon="mdi-elevation-decline" @click="onClickCancel"
                >Cancel</v-btn
            >
            <v-btn
                prepend-icon="mdi-comment-processing-outline"
                color="blue-lighten-1"
                @click="onSubmit"
                >Submit</v-btn
            >
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import AreaTextField from "@/components/base/AreaTextField.vue";
import type { HireInfor } from "@/api/hire/interfaces";
import providerService from "@/api/provider";
import { useUserStore } from "@/stores/userStore";
import { join } from "lodash";

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

const onSubmit = () => {
    emit("onSubmit");
    providerService.reviewPro({
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
