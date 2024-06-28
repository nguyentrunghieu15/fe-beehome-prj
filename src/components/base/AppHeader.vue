<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useColorModes } from "@coreui/vue";

import AppBreadcrumb from "@/components/base/AppBreadcrumb.vue";
import AppHeaderDropdownAccnt from "@/components/base/AppHeaderDropdownAccnt.vue";
import { useSidebarStore } from "@/stores/sidebar.js";

const headerClassNames = ref("mb-4 p-0");
const sidebar = useSidebarStore();

onMounted(() => {
    document.addEventListener("scroll", () => {
        if (document.documentElement.scrollTop > 0) {
            headerClassNames.value = "mb-4 p-0 shadow-sm";
        } else {
            headerClassNames.value = "mb-4 p-0";
        }
    });
});
</script>

<template>
    <CHeader position="sticky" :class="headerClassNames">
        <CContainer class="border-bottom px-4" fluid>
            <CHeaderToggler
                @click="sidebar.toggleVisible(undefined)"
                style="margin-inline-start: -14px"
            >
                <v-btn icon="mdi-menu" variant="text"></v-btn>
            </CHeaderToggler>
            <CHeaderNav class="d-none d-md-flex">
                <CNavItem>
                    <CNavLink href="/admin/dashboard"> Dashboard </CNavLink>
                </CNavItem>
                <CNavItem>
                    <CNavLink href="#">Users</CNavLink>
                </CNavItem>
                <CNavItem>
                    <CNavLink href="#">Services</CNavLink>
                </CNavItem>
            </CHeaderNav>
            <CHeaderNav class="ms-auto"> </CHeaderNav>
            <CHeaderNav>
                <AppHeaderDropdownAccnt />
            </CHeaderNav>
        </CContainer>
        <CContainer class="px-4" fluid>
            <AppBreadcrumb />
        </CContainer>
    </CHeader>
</template>
