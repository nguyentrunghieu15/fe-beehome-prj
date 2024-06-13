<template>
    <div class="h-full w-full">
        <RouterView />
        <ul class="fixed top-16 right-0">
            <li v-for="nofi in nofitications">
                <NofiticationItem
                    :content="nofi?.content"
                    :title="nofi?.title"
                    :type-notification="nofi?.typeNotification"
                    class="my-2 mx-2"
                ></NofiticationItem>
            </li>
        </ul>
    </div>
</template>

<script setup lang="ts">
import { useMainStore } from "./stores/mainStore";
import NofiticationItem from "@/components/base/NofiticationItem.vue";
const mainStore = useMainStore();

const nofitications = mainStore.nofiticationsComputed;
</script>

<style lang="scss">
// Import Main styles for this application
@import "styles/style";
// We use those styles to show code examples, you should remove them in your application.
@import "styles/examples";
</style>
