<template>
    <div>
        <div class="flex divide-x border-b-2">
            <div class="hidden lg:block w-64">
                <Filters class="p-8 w-full"></Filters>
            </div>
            <div class="w-full h-screen flex justify-center">
                <ListProviderCard></ListProviderCard>
            </div>
        </div>
        <InforSection></InforSection>
        <Footer></Footer>
    </div>
</template>

<script setup lang="ts">
import InforSection from "../mainsite/components/InforSection.vue";
import Footer from "@/components/base/Footer.vue";
import Filters from "./components/Filters.vue";
import ListProviderCard from "./components/ListProviderCard.vue";
import { useRouter } from "vue-router";
import { onMounted } from "vue";

const router = useRouter();
interface SearchQuery {
    name: string;
    zipcode: string;
}

onMounted(() => {
    const query = router.currentRoute.value.query as any as SearchQuery;
});
</script>
