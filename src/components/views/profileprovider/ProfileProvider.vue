<template>
    <div>
        <div
            class="flex lg:mx-24 xl:mx-64 2xl:mx-[30rem] min-[0px]:px-8 md:px-0"
        >
            <div class="max-w-2xl divide-y">
                <AboutCard></AboutCard>
                <ReviewsCard></ReviewsCard>
                <FeedbackCard v-for="i in 10" :key="i"></FeedbackCard>
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
</script>
