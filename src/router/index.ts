import MainLayout from "@/components/layouts/MainLayout.vue";
import MainSite from "@/components/views/mainsite/MainSite.vue";
import Login from "@/components/views/login/Login.vue";
import SignUp from "@/components/views/signup/SignUp.vue";
import Page404 from "@/components/views/error/Page404.vue";
import {
    createRouter,
    createWebHistory,
    type RouteRecordRaw,
} from "vue-router";
import ProfilePage from "@/components/views/profile/ProfilePage.vue";

const routes: RouteRecordRaw[] = [
    {
        path: "/",
        component: MainLayout,
        children: [
            {
                path: "",
                component: MainSite,
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
            {
                path: "/profile",
                component: ProfilePage,
                name: "profile",
            },
        ],
    },
    {
        path: "/error",
        component: Page404,
        name: "error",
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
