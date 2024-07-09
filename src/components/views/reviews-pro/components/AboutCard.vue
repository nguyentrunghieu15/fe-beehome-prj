<template>
    <div>
        <div class="py-4 flex">
            <Avatar
                avatar-url=""
                initials="TH"
                :is-rounded="false"
                class="w-36 h-36"
            ></Avatar>
            <div class="flex-col pl-4">
                <p class="font-bold text-2xl">{{ provider?.name }}</p>
                <RatingCard
                    :max-rating="5"
                    :num-votes="totalRating"
                    :rating="avgRating"
                ></RatingCard>
            </div>
        </div>
        <div class="py-4 pr-4 mb-6">
            <p>
                <span class="font-bold">Introduction: </span>
                <span v-html="prepareIntro"></span>
            </p>
            <p
                v-if="provider?.introduction.length ?? 0 > maxContentIntro"
                class="text-none text-sky-500 hover:cursor-pointer hover:underline"
                variant="text"
                color="blue-lighten-1"
                @click="isShowAll = !isShowAll"
            >
                {{ !isShowAll ? "Show all" : "Show less" }}
            </p>
        </div>
        <div class="grid grid-cols-2 gap-2 pb-6">
            <OverviewCard
                :year-exp="provider?.years || 0"
                :hired-time="provider?.numHires ?? 0"
                :location="provider?.address || ''"
                :payment-methods="
                    provider?.paymentMethod.map((e) => e.name) || []
                "
            ></OverviewCard>
            <div>
                <div>
                    <div class="font-bold mb-2">Kênh liên kết của nhà cung cấp:</div>
                    <div class="space-y-0.5">
                        <a
                            class="text-sky-500 mr-2 font-bold"
                            v-for="(e, index) in provider?.socialMedias"
                            :key="index"
                            :href="e.link"
                            >{{ e.name
                            }}{{
                                index != provider?.socialMedias?.length ?? 0 - 1
                                    ? ","
                                    : ""
                            }}</a
                        >
                    </div>
                </div>
            </div>
        </div>
        <div
            class="flex justify-between pb-6"
            v-if="currentProvider?.id !== route.query.id"
        >
            <v-btn
                class="w-2/5"
                size="x-large"
                prepend-icon="mdi-chat-outline"
                color="blue-lighten-1"
                >Nhắn tin</v-btn
            >
            <v-btn
                class="w-2/5"
                size="x-large"
                color="blue-lighten-1"
                prepend-icon="mdi-book-arrow-left-outline"
                @click="emit('request')"
                >Tạo yêu cầu thuê</v-btn
            >
        </div>
    </div>
</template>
<script setup lang="ts">
import Avatar from "@/components/base/Avatar.vue";
import RatingCard from "@/components/base/RatingCard.vue";
import { computed, onMounted, ref, watch } from "vue";
import OverviewCard from "./OverviewCard.vue";
import { useRoute } from "vue-router";
import type { ProviderInfo } from "@/api/provider/interfaces";
import providerService from "@/api/provider";
import { useProviderStore } from "@/stores/providerStore";
const props = defineProps<{
    totalRating: number;
    avgRating: number;
    provider: ProviderInfo | undefined;
}>();

const route = useRoute();
const maxContentIntro = 455;
const isShowAll = ref(false);

const emit = defineEmits<{
    request: [];
}>();

const prepareIntro = computed(() => {
    let paragrah = props.provider?.introduction || "";
    if (!isShowAll.value) {
        paragrah = paragrah.slice(0, maxContentIntro);
    }
    return paragrah.replace(/\n/g, "<br>");
});

const providerStore = useProviderStore();
const currentProvider = providerStore.providerComputed;
</script>
