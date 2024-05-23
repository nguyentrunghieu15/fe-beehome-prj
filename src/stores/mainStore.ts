import { defineStore } from "pinia";
import { computed, ref } from "vue";

export enum NavigationComponent {
    VISIT_NAV,
    MAIN_NAV,
    SEARCH_NAV,
}

export interface Nofitication {
    title: string;
    content: string;
    typeNotification: "error" | "infor" | "warnning";
}

export const useMainStore = defineStore("main", () => {
    const listNofitications = ref<Nofitication[]>([]);
    const currentNav = ref<NavigationComponent>();

    const currentNavComputed = computed(() => {
        return currentNav;
    });

    function setNavigation(value: NavigationComponent) {
        currentNav.value = value;
    }

    const nofiticationsComputed = computed(() => {
        return listNofitications;
    });

    function showNofitication(nofitication: Nofitication) {
        listNofitications.value.push(nofitication);
        setTimeout(() => {
            listNofitications.value.shift();
        }, 3000);
    }

    return {
        nofiticationsComputed,
        showNofitication,
        currentNavComputed,
        setNavigation,
    };
});
