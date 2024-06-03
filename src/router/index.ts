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
import SignUpProvider from "@/components/views/signup/SignUpProvider.vue";
import ProviderProject from "@/components/views/provider/ProviderProject.vue";
import ViewProvider from "@/components/views/reviews-pro/ViewProvider.vue";

import ProProfilePage from "@/components/views/provider/ProProfilePage.vue";
import ProProfile from "@/components/views/provider/components/ProProfile.vue";
import ProviderSettings from "@/components/views/provider/components/ProviderSettings.vue";

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
                path: "login",
                component: Login,
                name: "login",
                meta: {
                    nav: NavigationComponent.VISIT_NAV,
                },
            },
            {
                path: "signup",
                component: SignUp,
                name: "signup",
                meta: {
                    nav: NavigationComponent.VISIT_NAV,
                },
            },
            {
                path: "profile",
                component: ProfilePage,
                children: [
                    {
                        path: "",
                        component: ProfileInfor,
                        meta: {
                            nav: NavigationComponent.SEARCH_NAV,
                            requiredAuth: true,
                        },
                    },
                    {
                        path: "account-settings",
                        component: AccountSettings,
                        name: "account-settings",
                        meta: {
                            nav: NavigationComponent.MAIN_NAV,
                            requiredAuth: true,
                        },
                    },
                    {
                        path: "delete-account",
                        component: DeleteAccount,
                        name: "delete-account",
                        meta: {
                            nav: NavigationComponent.MAIN_NAV,
                            requiredAuth: true,
                        },
                    },
                ],
            },
            {
                path: "view-results",
                component: InstantResults,
                name: "view-results",
                meta: {
                    nav: NavigationComponent.SEARCH_NAV,
                },
            },
            {
                path: "view-pro",
                component: ViewProvider,
                name: "view-pro",
            },
            {
                path: "signup-pro",
                component: SignUpProvider,
                name: "signup-pro",
                meta: {
                    nav: NavigationComponent.SEARCH_NAV,
                    requiredAuth: true,
                },
            },
        ],
    },
    {
        path: "/error",
        component: Page404,
        name: "error",
    },
    {
        path: "/pro",
        component: MainLayout,
        children: [
            {
                path: "",
                component: ProviderProject,
                name: "project-pro",
                meta: {
                    requiredAuth: true,
                    nav: NavigationComponent.PROVIDER_NAV,
                },
            },
            {
                path: "profile",
                component: ProProfilePage,
                children: [
                    {
                        path: "",
                        component: ProProfile,
                        name: "profile-pro",
                        meta: {
                            requiredAuth: true,
                            nav: NavigationComponent.PROVIDER_NAV,
                        },
                    },
                    {
                        path: "/provider-settings",
                        component: ProviderSettings,
                        name: "provider-settings",
                        meta: {
                            requiredAuth: true,
                            nav: NavigationComponent.PROVIDER_NAV,
                        },
                    },
                ],
            },
        ],
    },
];

const router = createRouter({
    history: createWebHistory("/"),
    routes,
});

function isLogin(): boolean {
    if (sessionStorage.getItem("ACCESS_TOKEN")) return true;
    return false;
}

router.beforeEach((to, from) => {
    // instead of having to check every route record with
    if (to.meta?.requiredAuth && !isLogin()) {
        return { name: "main" };
    }
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
