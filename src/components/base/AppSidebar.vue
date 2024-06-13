<script setup lang="ts">
import { RouterLink } from "vue-router";

import { AppSidebarNav } from "@/components/base/AppSidebarNav";
import { useSidebarStore } from "@/stores/sidebar";

const sidebar = useSidebarStore();
</script>

<template>
    <CSidebar
        class="border-end"
        colorScheme="dark"
        position="fixed"
        :unfoldable="sidebar.unfoldable"
        :visible="sidebar.visible"
        @visible-change="(value:any) => sidebar.toggleVisible(value)"
    >
        <CSidebarHeader class="border-bottom">
            <RouterLink custom to="/" v-slot="{ href, navigate }">
                <CSidebarBrand
                    v-bind="$attrs"
                    as="a"
                    :href="href"
                    @click="navigate"
                >
                    <!-- <CIcon
                        custom-class-name="sidebar-brand-full"
                        icon=""
                        :height="32"
                    />
                    <CIcon
                        custom-class-name="sidebar-brand-narrow"
                        icon=""
                        :height="32"
                    /> -->
                </CSidebarBrand>
            </RouterLink>
            <CCloseButton
                class="d-lg-none"
                dark
                @click="sidebar.toggleVisible(undefined)"
            />
        </CSidebarHeader>
        <AppSidebarNav />
        <CSidebarFooter class="border-top d-none d-lg-flex">
            <CSidebarToggler @click="sidebar.toggleUnfoldable()" />
        </CSidebarFooter>
    </CSidebar>
</template>
