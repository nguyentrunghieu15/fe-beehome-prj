<template>
    <div class="flex-col px-4 space-y-4">
        <div class="my-4 py-4">
            <p class="font-bold text-3xl">Top 10 Plumber near you</p>
            <p class="text-gray-500">based on you criteria</p>
        </div>
        <ProviderCard></ProviderCard>
        <ProviderCard></ProviderCard>
        <div class="flex justify-center py-8">
            <v-btn class="border" variant="text" color="grey-darken-1" rounded
                >See more</v-btn
            >
        </div>
    </div>
</template>
<script setup lang="ts">
import ProviderCard from "./ProviderCard.vue";
</script>
