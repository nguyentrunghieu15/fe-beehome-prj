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
                <p class="font-bold text-2xl">it's just Stuff!</p>
                <RatingCard
                    :max-rating="5"
                    :num-votes="67"
                    :rating="5"
                ></RatingCard>
            </div>
        </div>
        <div class="py-4 pr-4 mb-6">
            <p>
                <span class="font-bold">Introduction: </span>
                <span v-html="prepareIntro"></span>
            </p>
            <p
                v-if="intro.length > maxContentIntro"
                class="text-none text-sky-500 hover:cursor-pointer hover:underline"
                variant="text"
                color="blue-lighten-1"
                @click="isShowAll = !isShowAll"
            >
                {{ isShowAll ? "Show all" : "Show less" }}
            </p>
        </div>
        <div class="grid grid-cols-2 gap-2 pb-6">
            <OverviewCard></OverviewCard>
            <div>
                <div>
                    <div class="font-bold mb-2">Social media</div>
                    <div class="space-y-0.5">
                        <a
                            class="text-sky-500 mr-2 font-bold"
                            v-for="(e, index) in socialMedia"
                            :key="index"
                            :href="e.link"
                            >{{ e.name
                            }}{{
                                index != socialMedia.length - 1 ? "," : ""
                            }}</a
                        >
                    </div>
                </div>
            </div>
        </div>
        <div class="flex justify-between pb-6">
            <v-btn
                class="w-2/5"
                size="x-large"
                prepend-icon="mdi-chat-outline"
                color="blue-lighten-1"
                >Message</v-btn
            >
            <v-btn
                class="w-2/5"
                size="x-large"
                color="blue-lighten-1"
                prepend-icon="mdi-book-arrow-left-outline"
                >Make a request</v-btn
            >
        </div>
    </div>
</template>
<script setup lang="ts">
import Avatar from "@/components/base/Avatar.vue";
import RatingCard from "@/components/base/RatingCard.vue";
import { computed, ref } from "vue";
import OverviewCard from "./OverviewCard.vue";
import type { ISocialMediaElement } from "../constants/interfaces";

const maxContentIntro = 455;
const isShowAll = ref(false);

const intro = ref("");

const prepareIntro = computed(() => {
    let paragrah = intro.value;
    if (isShowAll.value) {
        paragrah = paragrah.slice(0, maxContentIntro);
    }
    return paragrah.replace(/\n/g, "<br>");
});

const socialMedia = ref<ISocialMediaElement[]>([
    { link: "facebook.com", name: "Facebook" },
    { link: "google.com", name: "Gmail" },
]);
</script>
