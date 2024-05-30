<template>
    <div class="py-4">
        <p class="text-xl font-bold">Reviews</p>
        <p>
            Customers rated this pro highly for work quality, professionalism,
            and responsiveness.
        </p>
        <div class="block">
            <RatingCard
                :max-rating="5"
                :num-votes="62"
                :rating="4.9"
            ></RatingCard>
            <div class="flex flex-col flex-col-reverse">
                <div
                    v-for="i in 5"
                    :key="i"
                    class="flex items-center space-x-2"
                >
                    <span>{{ i }}</span>
                    <v-icon icon="mdi-star" size="10" class="text-amber-500">
                    </v-icon>
                    <ProgressBar
                        color="bg-blue-500"
                        :progress="75"
                    ></ProgressBar>
                    <span>75%</span>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import ProgressBar from "@/components/base/ProgressBar.vue";
import RatingCard from "@/components/base/RatingCard.vue";
</script>
