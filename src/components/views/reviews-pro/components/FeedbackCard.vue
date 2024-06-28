<template>
    <div class="py-6 w-full">
        <div class="flex w-full">
            <Avatar
                avatar-url=""
                initials="QN"
                :is-rounded="true"
                class="w-10 h-10 mr-2"
            ></Avatar>
            <div class="w-full">
                <div class="w-full flex justify-between">
                    <p class="font-bold">{{ userName }}</p>
                    <p class="text-gray-600 text-sm">{{ day }}</p>
                </div>
                <RatingCard
                    :max-rating="5"
                    :num-votes="totalRating"
                    :rating="avgRating"
                ></RatingCard>
            </div>
        </div>
        <div class="text-gray-900">
            <p>
                {{ comment }}
            </p>
            <p v-if="serviceName">Details: {{ serviceName }}</p>
        </div>
        <div class="mt-4 p-4 bg-gray-50" v-if="reply">
            <p class="font-bold">{{ propName }} reply</p>
            <p>
                {{ reply }}
            </p>
        </div>
    </div>
</template>
<script setup lang="ts">
import Avatar from "@/components/base/Avatar.vue";
import RatingCard from "@/components/base/RatingCard.vue";
const props = defineProps<{
    totalRating: number;
    avgRating: number;
    comment: string;
    day: string;
    propName: string;
    userName: string;
    reply?: string;
    serviceName?: string;
}>();
</script>
