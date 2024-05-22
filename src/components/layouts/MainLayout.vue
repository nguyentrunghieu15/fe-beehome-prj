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
import SearchNav from "./components/SearchNav.vue";
import { computed } from "vue";

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
        default:
            break;
    }
});
</script>
