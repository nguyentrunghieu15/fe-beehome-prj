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
import RequestProject from "@/components/views/provider/components/RequestProject.vue";
import StartedProject from "@/components/views/provider/components/StartedProject.vue";
import FinishedProject from "@/components/views/provider/components/FinishedProject.vue";
import ReviewsProject from "@/components/views/provider/components/ReviewsProject.vue";
import CustomerProject from "@/components/views/customer-project/CustomerProject.vue";
import PenddingProjectCus from "@/components/views/customer-project/components/PenddingProjectCus.vue";
import StartedProjectCus from "@/components/views/customer-project/components/StartedProjectCus.vue";
import FinishedProjectCus from "@/components/views/customer-project/components/FinishedProjectCus.vue";
import ReviewsProjectCus from "@/components/views/customer-project/components/ReviewsProjectCus.vue";

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
            {
                path: "project",
                component: CustomerProject,
                children: [
                    {
                        path: "",
                        redirect: { name: "cus-pendding" },
                        name: "cus-project",
                    },
                    {
                        path: "pendding",
                        component: PenddingProjectCus,
                        name: "cus-pendding",
                        meta: {
                            requiredAuth: true,
                            nav: NavigationComponent.SEARCH_NAV,
                        },
                    },
                    {
                        path: "started",
                        component: StartedProjectCus,
                        name: "cus-started",
                        meta: {
                            requiredAuth: true,
                            nav: NavigationComponent.SEARCH_NAV,
                        },
                    },
                    {
                        path: "finished",
                        component: FinishedProjectCus,
                        name: "cus-finished",
                        meta: {
                            requiredAuth: true,
                            nav: NavigationComponent.SEARCH_NAV,
                        },
                    },
                    {
                        path: "reviews",
                        component: ReviewsProjectCus,
                        name: "cus-reviews",
                        meta: {
                            requiredAuth: true,
                            nav: NavigationComponent.SEARCH_NAV,
                        },
                    },
                ],
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
                children: [
                    {
                        path: "",
                        redirect: { name: "pro-request" },
                    },
                    {
                        path: "request",
                        component: RequestProject,
                        name: "pro-request",
                        meta: {
                            requiredAuth: true,
                            nav: NavigationComponent.PROVIDER_NAV,
                        },
                    },
                    {
                        path: "started",
                        component: StartedProject,
                        name: "pro-started",
                        meta: {
                            requiredAuth: true,
                            nav: NavigationComponent.PROVIDER_NAV,
                        },
                    },
                    {
                        path: "finished",
                        component: FinishedProject,
                        name: "pro-finished",
                        meta: {
                            requiredAuth: true,
                            nav: NavigationComponent.PROVIDER_NAV,
                        },
                    },
                    {
                        path: "reviews",
                        component: ReviewsProject,
                        name: "pro-reviews",
                        meta: {
                            requiredAuth: true,
                            nav: NavigationComponent.PROVIDER_NAV,
                        },
                    },
                ],
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
