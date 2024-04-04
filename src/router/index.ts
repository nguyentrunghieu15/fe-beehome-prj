import type { SidebarItem } from "@/components/layouts/components/interfaces";
import { useSideBarStore } from "@/stores/sideBarStore";
import {
    createRouter,
    createWebHistory,
    type RouteRecordRaw,
} from "vue-router";

const routes: RouteRecordRaw[] = [];

const router = createRouter({
    history: createWebHistory("/"),
    routes,
});

router.beforeEach((to, from) => {
    // instead of having to check every route record with
    // to.matched.some(record => record.meta.requiresAuth)
    if (to.meta?.requiresAuth) {
        // this route requires auth, check if logged in
        // if not, redirect to login page.
        return {
            path: "/login",
            // save the location we were at to come back later
            query: { redirect: to.fullPath },
        };
    }

    if (to.meta?.sideBar) {
        const store = useSideBarStore();
        store.updateSideBar(to.meta.sideBar as SidebarItem[]);
    }
});

export default router;
