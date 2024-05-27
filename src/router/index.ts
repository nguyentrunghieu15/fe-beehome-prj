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
import ProfileInfor from "@/components/views/profile/components/ProfileInfor.vue";
import AccountSettings from "@/components/views/profile/components/AccountSettings.vue";
import { NavigationComponent, useMainStore } from "@/stores/mainStore";
import DeleteAccount from "@/components/views/profile/components/DeleteAccount.vue";
import InstantResults from "@/components/views/instant-results/InstantResults.vue";
import ProfileProvider from "@/components/views/profileprovider/ProfileProvider.vue";

const routes: RouteRecordRaw[] = [
    {
        path: "/",
        component: MainLayout,
        children: [
            {
                path: "",
                component: MainSite,
                name: "main",
            },
            {
                path: "/login",
                component: Login,
                name: "login",
                meta: {
                    nav: NavigationComponent.VISIT_NAV,
                },
            },
            {
                path: "/signup",
                component: SignUp,
                name: "signup",
                meta: {
                    nav: NavigationComponent.VISIT_NAV,
                },
            },
            {
                path: "/profile",
                component: ProfilePage,
                children: [
                    {
                        path: "",
                        component: ProfileInfor,
                        meta: {
                            nav: NavigationComponent.SEARCH_NAV,
                        },
                    },
                    {
                        path: "/account-settings",
                        component: AccountSettings,
                        name: "account-settings",
                        meta: {
                            nav: NavigationComponent.MAIN_NAV,
                        },
                    },
                    {
                        path: "/delete-account",
                        component: DeleteAccount,
                        name: "delete-account",
                        meta: {
                            nav: NavigationComponent.MAIN_NAV,
                        },
                    },
                ],
            },
            {
                path: "/view-results",
                component: InstantResults,
                name: "view-results",
            },
            {
                path: "/pro-profile",
                component: ProfileProvider,
                name: "pro-provider",
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

function isLogin(): boolean {
    return true;
}

router.beforeEach((to, from) => {
    // instead of having to check every route record with
    // to.matched.some(record => record.meta.requiresAuth)
    const mainStore = useMainStore();
    if (to.meta?.nav !== undefined) {
        mainStore.setNavigation(to.meta?.nav as NavigationComponent);
    } else {
        if (isLogin()) {
            mainStore.setNavigation(NavigationComponent.MAIN_NAV);
        } else {
            mainStore.setNavigation(NavigationComponent.VISIT_NAV);
        }
    }
});

export default router;
