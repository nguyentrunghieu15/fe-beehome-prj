<template>
    <div>
        <RouterView />
        <InforSection></InforSection>
        <Footer></Footer>
    </div>
</template>
<script setup lang="ts">
import Footer from "@/components/base/Footer.vue";
import InforSection from "../mainsite/components/InforSection.vue";
</script>
