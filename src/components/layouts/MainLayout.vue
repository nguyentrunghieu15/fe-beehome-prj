<template>
    <nav class="h-16 border-b-[1px] border-b-slate-300">
        <component :is="matchComponent"></component>
    </nav>
    <RouterView :key="$route.path"></RouterView>
</template>

<script setup lang="ts">
import { NavigationComponent, useMainStore } from "@/stores/mainStore";
import MainNav from "./components/MainNav.vue";
import VisitNav from "./components/VisitNav.vue";
import { computed, onMounted } from "vue";

const mainStore = useMainStore();

const nav = mainStore.currentNavComputed;

const matchComponent = computed(() => {
    switch (nav.value) {
        case NavigationComponent.VISIT_SITE:
            return VisitNav;
        case NavigationComponent.MAIN_SITE:
            return MainNav;
        default:
            break;
    }
});
</script>
