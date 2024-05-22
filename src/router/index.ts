import MainLayout from "@/components/layouts/MainLayout.vue";
import VisitSite from "@/components/views/visitsite/VisitSite.vue";
import Login from "@/components/views/login/Login.vue";
import SignUp from "@/components/views/signup/SignUp.vue";
import {
    createRouter,
    createWebHistory,
    type RouteRecordRaw,
} from "vue-router";

const routes: RouteRecordRaw[] = [
    {
        path: "/",
        component: MainLayout,
        children: [
            {
                path: "",
                component: VisitSite,
                name: "visit",
            },
            {
                path: "/login",
                component: Login,
                name: "login",
            },
            {
                path: "/signup",
                component: SignUp,
                name: "signup",
            },
        ],
    },
];

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
});

export default router;
