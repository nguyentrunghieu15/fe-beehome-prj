<template>
    <div class="block md:grid md:grid-cols-12 md:gap-2 pt-10 bg-slate-50">
        <div
            class="md:col-start-3 md:col-span-2 px-5 py-6 mb-5 bg-white rounded w-72 justify-self-center md:justify-self-end drop-shadow-lg border-2"
        >
            <ProviderProfileCard></ProviderProfileCard>
        </div>
        <div class="md:col-start-5 md:col-span-7">
            <v-btn
                class="justify-start text-none"
                rounded="0"
                size="x-large"
                block
                append-icon="mdi-account-circle"
                @click="$router.push({ name: 'provider-settings' })"
                >Provider settings</v-btn
            >
            <v-btn
                class="justify-start mb-8 text-none"
                rounded="0"
                size="x-large"
                block
                append-icon="mdi-bell-ring"
                >Nofitication settings</v-btn
            >
            <v-btn
                class="justify-start text-none"
                rounded="0"
                size="x-large"
                block
                @click="$router.push({ name: 'delete-account' })"
                >Deactive Provider</v-btn
            >
        </div>
    </div>
</template>
<script setup lang="ts">
import ProviderProfileCard from "./ProviderProfileCard.vue";
</script>
