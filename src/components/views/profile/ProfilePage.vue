<template>
    <div>
        <div class="md:grid md:grid-cols-2 md:gap-2">
            <ProfileCard></ProfileCard>
        </div>
        <Footer></Footer>
        <InforSection></InforSection>
    </div>
</template>
<script setup lang="ts">
import ProfileCard from "./components/ProfileCard.vue";
import Footer from "@/components/base/Footer.vue";
import InforSection from "../mainsite/components/InforSection.vue";
</script>
