<template>
    <div class="py-4">
        <p class="text-xl font-bold">Đánh giá</p>
        <p>
            Khách hàng đánh giá cao chuyên gia này về chất lượng công việc, tính
            chuyên nghiệp, và khả năng phản hồi.
        </p>
        <div class="block">
            <RatingCard
                :max-rating="5"
                :num-votes="totalRating"
                :rating="avgRating"
            ></RatingCard>
            <div class="flex flex-col flex-col-reverse">
                <div
                    v-for="i in 5"
                    :key="i"
                    class="flex items-center space-x-2 hover:bg-gray-300"
                    @click="emit('clickRate', i)"
                >
                    <span>{{ i }}</span>
                    <v-icon icon="mdi-star" size="10" class="text-amber-500">
                    </v-icon>
                    <ProgressBar
                        color="bg-blue-500"
                        :progress="
                            totalRating ? counterRate[i - 1] / totalRating : 0
                        "
                    ></ProgressBar>
                    <span
                        >{{
                            (totalRating
                                ? (100 * counterRate[i - 1]) / totalRating
                                : 0
                            ).toFixed(2)
                        }}%</span
                    >
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import ProgressBar from "@/components/base/ProgressBar.vue";
import RatingCard from "@/components/base/RatingCard.vue";

const prop = defineProps<{
    totalRating: number;
    avgRating: number;
    counterRate: number[];
}>();

const emit = defineEmits<{
    clickRate: [rate: number];
}>();
</script>
