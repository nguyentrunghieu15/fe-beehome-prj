<template>
    <div>
        <div class="flex flex-column items-center">
            <h1
                class="flex justify-center py-6 text-4xl font-bold text-slate-700 w-full"
            >
                Chào mừng tham gia BeeHome
            </h1>
            <LoginCard></LoginCard>
        </div>
        <Footer class="absolute bottom-0 w-full"></Footer>
    </div>
</template>

<script setup lang="ts">
import LoginCard from "./components/LoginCard.vue";
import Footer from "@/components/base/Footer.vue";
</script>
