<template>
    <div>
        <router-view v-slot="{ Component }">
            <transition name="slide-fade">
                <component :is="Component" />
            </transition>
        </router-view>

        <InforSection></InforSection>
        <Footer></Footer>
    </div>
</template>
<script setup lang="ts">
import Footer from "@/components/base/Footer.vue";
import InforSection from "../mainsite/components/InforSection.vue";
</script>
<style scoped>
/*
  Enter and leave animations can use different
  durations and timing functions.
*/
.slide-fade-enter-active {
    transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
    transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
    transform: translateX(20px);
    opacity: 0;
}
</style>
