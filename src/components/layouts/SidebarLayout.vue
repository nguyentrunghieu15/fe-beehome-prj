<script setup lang="ts">
import { CContainer } from "@coreui/vue";
import AppFooter from "@/components/base/AppFooter.vue";
import AppHeader from "@/components/base/AppHeader.vue";
import AppSidebar from "@/components/base/AppSidebar.vue";
</script>

<template>
    <div>
        <AppSidebar />
        <div class="wrapper d-flex flex-column min-vh-100">
            <AppHeader />
            <div class="body flex-grow-1">
                <CContainer class="px-4" lg>
                    <router-view />
                </CContainer>
            </div>
            <AppFooter />
        </div>
    </div>
</template>
