<template>
    <div class="flex flex-column items-center bg-slate-50 h-full">
        <h1
            class="flex justify-center py-6 text-4xl font-bold text-slate-700 w-full"
        >
            Welcome BeeHome
        </h1>
        <SignupCard></SignupCard>
    </div>
    <InforSection></InforSection>
    <Footer></Footer>
</template>

<script setup lang="ts">
import Footer from "@/components/base/Footer.vue";
import SignupCard from "./components/SignupCard.vue";
import InforSection from "../mainsite/components/InforSection.vue";
</script>
