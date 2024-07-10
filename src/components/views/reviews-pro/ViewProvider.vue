<template>
    <div>
        <div
            class="flex lg:mx-24 xl:mx-64 2xl:mx-[24rem] min-[0px]:px-8 md:px-0"
        >
            <div class="max-w-2xl divide-y">
                <AboutCard
                    :provider="provider"
                    :avg-rating="avgRating"
                    :total-rating="totalRating"
                    @request="onClickMakeRequest"
                ></AboutCard>
                <ReviewsCard
                    :avg-rating="avgRating"
                    :total-rating="totalRating"
                    :counter-rate="counterRate"
                    @clickRate="onClickRate"
                ></ReviewsCard>
                <FeedbackCard
                    v-for="r in reviews"
                    :key="r.id"
                    :avg-rating="r.rating"
                    :comment="r.comment"
                    :day="r.createdAt"
                    :prop-name="provider?.name || ''"
                    :total-rating="1"
                    :user-name="r.userName"
                    :reply="r.reply"
                    :service-name="r.service?.name"
                ></FeedbackCard>
                <div class="flex justify-center py-8">
                    <v-btn
                        class="border"
                        variant="text"
                        color="grey-darken-1"
                        rounded
                        @click="loadReview"
                        >Xem thêm</v-btn
                    >
                </div>
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
import { useRoute, useRouter } from "vue-router";
import providerService from "@/api/provider";
import type { ProviderInfo, Review } from "@/api/provider/interfaces";
import MakeRequestPopup from "./components/MakeRequestPopup.vue";
import { useProviderStore } from "@/stores/providerStore";
import type { Items } from "./constants/interfaces";
const route = useRoute();

const router = useRouter();

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

let counterPage = 0;
let filter = 0;
function loadReview() {
    const providerId = route.query.id?.toString() ?? "";
    providerService
        .getReviewsOfProvider(providerId, {
            "filter.rating": filter,
            "pagination.limit": 10,
            "pagination.page": counterPage,
            "pagination.pageSize": 10,
        })
        .then((e) => {
            reviews.value.push(...e.reviews);
            let sumRate = 0;
            e.reviews.forEach((element) => {
                totalRating.value++;
                sumRate = sumRate + element.rating;
                counterRate.value[element.rating - 1]++;
            });
            avgRating.value = totalRating.value
                ? sumRate / totalRating.value
                : 0;
            counterPage++;
        });
}

function onClickRate(v: number) {
    filter = v;
    counterPage = 0;
    reviews.value = [];
    loadReview();
}

onMounted(() => {
    loadData();
    loadReview();
});

watch(
    () => route.query.id,
    (newValue, oldValue) => {
        loadData();
    }
);

const isShowRequestPopup = ref(false);

const onClickMakeRequest = () => {
    if (!sessionStorage.getItem("ACCESS_TOKEN")) {
        router.replace({ name: "login" });
        return;
    }
    isShowRequestPopup.value = !isShowRequestPopup.value;
};
</script>
