<template>
    <div class="divide-y">
        <div class="md:grid md:grid-cols-2 md:gap-1 mb-8">
            <KeepAlive>
                <component
                    :is="selectedComponent"
                    @onclick-component="setComponent"
                ></component>
            </KeepAlive>
            <ImageCard></ImageCard>
        </div>
        <InforSection></InforSection>
        <Footer></Footer>
    </div>
</template>
<script setup lang="ts">
import SearchProCard from "./components/SearchProCard.vue";
import ImageCard from "./components/ImageCard.vue";
import FindCustomerCard from "./components/FindCustomerCard.vue";
import InforSection from "./components/InforSection.vue";
import Footer from "@/components/base/Footer.vue";
import { shallowRef } from "vue";

const selectedComponent = shallowRef(SearchProCard);

const setComponent = (name: string) => {
    switch (name) {
        case "customer":
            selectedComponent.value = FindCustomerCard;
            break;

        default:
            selectedComponent.value = SearchProCard;
            break;
    }
};
</script>
