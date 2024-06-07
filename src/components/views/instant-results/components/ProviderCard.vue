<template>
    <div class="flex pb-4">
        <Avatar
            :is-rounded="false"
            avatarUrl=""
            initials="TH"
            class="w-36 h-36 mr-4"
        ></Avatar>
        <div class="flex flex-wrap justify-between lg:w-[45rem]">
            <div class="w-[32rem] flex flex-col space-y-2">
                <p class="text-lg font-bold">{{ name }}</p>
                <RatingCard
                    :maxRating="5"
                    :numVotes="numRating"
                    :rating="rating"
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
                        <span>{{ numHires }} hires on BeeHome</span>
                    </div>
                    <div>
                        <v-icon icon="mdi-map-marker-radius-outline"></v-icon>
                        <span>Near {{ address }}</span>
                    </div>
                </div>
                <div class="flex items-center space-x-1 text-gray-500">
                    <div class="w-2 h-2 bg-green-500 rounded-xl"></div>
                    <p>Online now - response about 4 min</p>
                </div>
                <p class="text-gray-500">
                    <span>Introduce: "</span
                    ><span>{{ introduce.slice(0, 255) }}"</span
                    ><span class="justify-self-end"
                        >...<button class="text-sky-500" @click="emit('more')">
                            See more
                        </button></span
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
                    @click="emit('view')"
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

const props = defineProps<{
    name: string;
    numRating: number;
    rating: number;
    numHires: number;
    address: string;
    introduce: string;
}>();
const emit = defineEmits<{
    more: [];
    view: [];
}>();
</script>
