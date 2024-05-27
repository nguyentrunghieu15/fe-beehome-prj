<template>
    <div class="flex pb-4">
        <Avatar avatarUrl="" initials="TH" class="w-36 h-36 mr-4"></Avatar>
        <div class="flex flex-wrap justify-between lg:w-[45rem]">
            <div class="w-[32rem] flex flex-col space-y-2">
                <p class="text-lg font-bold">Knockout Plumbing & Repipe Inc</p>
                <RatingCard
                    :maxRating="5"
                    :numVotes="67"
                    :rating="4.6"
                ></RatingCard>
                <div class="flex flex-wrap">
                    <Achievement
                        icon=" mdi-medal-outline"
                        label="In high demand"
                    ></Achievement>
                </div>
                <div class="text-gray-500 text-base">
                    <div>
                        <v-icon icon="mdi-trophy-variant-outline"></v-icon>
                        <span>456 hires on BeeHome</span>
                    </div>
                    <div>
                        <v-icon icon="mdi-map-marker-radius-outline"></v-icon>
                        <span>Ha noi, Vietnam</span>
                    </div>
                </div>
                <div class="flex items-center space-x-1 text-gray-500">
                    <div class="w-2 h-2 bg-green-500 rounded-xl"></div>
                    <p>Online now - response about 4 min</p>
                </div>
                <p class="text-gray-500">
                    <span>Raphael N. says, "</span
                    ><span
                        >We purchased a new home and we wanted a plumber to come
                        out for a few things and to do a general
                        inspection."</span
                    ><span class="justify-self-end"
                        >...<button type="button">See more</button></span
                    >
                </p>
            </div>
            <div class="flex items-end pl-4">
                <v-btn
                    class="text-none"
                    rounded="lg"
                    color="blue-lighten-1"
                    size="small"
                    variants="elevated"
                    block
                    >View Profile</v-btn
                >
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import Avatar from "@/components/base/Avatar.vue";
import Achievement from "@/components/base/Achievement.vue";
import RatingCard from "@/components/base/RatingCard.vue";
</script>
