<template>
    <div class="flex flex-column items-center bg-slate-50 h-full">
        <h1
            class="flex justify-center py-6 text-4xl font-bold text-slate-700 w-full"
        >
            Welcome BeeHome
        </h1>
        <LoginCard></LoginCard>
    </div>
    <Footer></Footer>
</template>

<script setup lang="ts">
import LoginCard from "./components/LoginCard.vue";
import Footer from "@/components/base/Footer.vue";
</script>
