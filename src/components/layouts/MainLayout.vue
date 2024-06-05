<template>
    <div>
        <nav class="h-16 border-b-[1px] border-b-slate-300">
            <component :is="matchComponent"></component>
        </nav>
        <router-view v-slot="{ Component }">
            <transition name="slide-fade">
                <component :is="Component" />
            </transition>
        </router-view>
    </div>
</template>

<script setup lang="ts">
import { NavigationComponent, useMainStore } from "@/stores/mainStore";
import MainNav from "./components/MainNav.vue";
import VisitNav from "./components/VisitNav.vue";
import SearchNav from "./components/SearchNav.vue";
import { computed } from "vue";
import ProviderNav from "./components/ProviderNav.vue";

const mainStore = useMainStore();
const nav = mainStore.currentNavComputed;

const matchComponent = computed(() => {
    switch (nav.value) {
        case NavigationComponent.VISIT_NAV:
            return VisitNav;
        case NavigationComponent.MAIN_NAV:
            return MainNav;
        case NavigationComponent.SEARCH_NAV:
            return SearchNav;
        case NavigationComponent.PROVIDER_NAV:
            return ProviderNav;
        default:
            break;
    }
});
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
