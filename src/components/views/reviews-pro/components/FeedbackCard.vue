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
                    <p class="font-bold">Anonymous</p>
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
            <p>Details: Packing • 2 rooms • Packing supplies</p>
        </div>
        <div class="mt-4 p-4 bg-gray-50">
            <p class="font-bold">{{ propName }} reply</p>
            <p>
                Thanks for the kind words Adrian. We are always so grateful to
                have clients express their appreciation for the way we show up
                to every job. Hope all is well, Beth @ It's Just Stuff
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
}>();
</script>
