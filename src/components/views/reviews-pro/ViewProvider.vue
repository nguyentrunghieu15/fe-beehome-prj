<template>
    <div>
        <div
            class="flex lg:mx-24 xl:mx-64 2xl:mx-[30rem] min-[0px]:px-8 md:px-0"
        >
            <div class="max-w-2xl divide-y">
                <AboutCard
                    :provider="provider"
                    :avg-rating="avgRating"
                    :total-rating="totalRating"
                    @request="isShowRequestPopup = !isShowRequestPopup"
                ></AboutCard>
                <ReviewsCard
                    :avg-rating="avgRating"
                    :total-rating="totalRating"
                    :counter-rate="counterRate"
                ></ReviewsCard>
                <FeedbackCard
                    v-for="r in reviews"
                    :key="r.id"
                    :avg-rating="r.rating"
                    :comment="r.comment"
                    :day="r.createdAt"
                    :prop-name="provider?.name || ''"
                    :total-rating="1"
                ></FeedbackCard>
            </div>
            <div v-if="currentProvider?.id !== route.query.id">
                <ContactCard class="sticky top-10"></ContactCard>
            </div>
        </div>
        <MakeRequestPopup
            :listService="listService"
            v-model:model-value="isShowRequestPopup"
            @close="isShowRequestPopup = false"
        ></MakeRequestPopup>
    </div>
</template>
<script setup lang="ts">
import AboutCard from "./components/AboutCard.vue";
import ReviewsCard from "./components/ReviewsCard.vue";
import ContactCard from "./components/ContactCard.vue";
import FeedbackCard from "./components/FeedbackCard.vue";
import { onMounted, ref, watch } from "vue";
import { useRoute } from "vue-router";
import providerService from "@/api/provider";
import type { ProviderInfo, Review } from "@/api/provider/interfaces";
import MakeRequestPopup from "./components/MakeRequestPopup.vue";
import { useProviderStore } from "@/stores/providerStore";
import type { Items } from "./constants/interfaces";
const route = useRoute();

const totalRating = ref(0);
const avgRating = ref(0);
const counterRate = ref<number[]>([0, 0, 0, 0, 0]);
const reviews = ref<Review[]>([]);

const providerStore = useProviderStore();
const currentProvider = providerStore.providerComputed;

const provider = ref<ProviderInfo>();

const listService = ref<Items[]>([]);

function loadData() {
    const providerId = route.query.id?.toString();
    if (providerId) {
        providerService.findProById(providerId).then((v) => {
            provider.value = v.provider;
        });
        providerService
            .getAllServicesOfProvider({
                id: providerId,
            })
            .then((v) => {
                v.services.forEach((s) => {
                    listService.value.push({ id: s.id, name: s.name });
                });
            });
    }
}

onMounted(() => {
    loadData();
});

watch(
    () => route.query.id,
    (newValue, oldValue) => {
        loadData();
    }
);

function loadReview() {
    const providerId = route.query.id?.toString() ?? "";
    providerService.getAllReviewsOfProvider(providerId).then((e) => {
        reviews.value = e.reviews;
        let sumRate = 0;
        e.reviews.forEach((element) => {
            totalRating.value++;
            sumRate = sumRate + element.rating;
            counterRate.value[element.rating - 1]++;
        });
        avgRating.value = totalRating.value ? sumRate / totalRating.value : 0;
    });
}

onMounted(() => {
    loadReview();
});

const isShowRequestPopup = ref(false);
</script>
