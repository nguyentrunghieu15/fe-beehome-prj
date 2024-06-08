<template>
    <div>
        <div
            class="flex lg:mx-24 xl:mx-64 2xl:mx-[30rem] min-[0px]:px-8 md:px-0"
        >
            <div class="max-w-2xl divide-y">
                <AboutCard v-model:providerName="providerName"></AboutCard>
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
                    :prop-name="providerName"
                    :total-rating="1"
                ></FeedbackCard>
            </div>
            <div>
                <ContactCard class="sticky top-10"></ContactCard>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import AboutCard from "./components/AboutCard.vue";
import ReviewsCard from "./components/ReviewsCard.vue";
import ContactCard from "./components/ContactCard.vue";
import FeedbackCard from "./components/FeedbackCard.vue";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import providerService from "@/api/provider";
import type { Review } from "@/api/provider/interfaces";
const route = useRoute();

const totalRating = ref(0);
const avgRating = ref(0);
const counterRate = ref<number[]>([0, 0, 0, 0, 0]);
const reviews = ref<Review[]>([]);
const providerName = ref("");

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
</script>
