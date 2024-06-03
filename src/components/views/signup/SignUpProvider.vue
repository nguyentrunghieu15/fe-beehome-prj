<template>
    <div class="flex flex-column items-center bg-slate-50 h-full">
        <h1
            class="flex justify-center py-6 text-4xl font-bold text-slate-700 w-full"
        >
            Welcome Provider BeeHome
        </h1>
        <SignUpProCard></SignUpProCard>
    </div>
    <InforSection></InforSection>
    <Footer></Footer>
</template>
<script setup lang="ts">
import Footer from "@/components/base/Footer.vue";
import InforSection from "../mainsite/components/InforSection.vue";
import SignUpProCard from "./components/SignUpProCard.vue";
</script>
