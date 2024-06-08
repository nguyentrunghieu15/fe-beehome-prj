<template>
    <div>
        <div
            class="flex items-center space-x-0.5 text-gray-500 text-sm font-bold"
        >
            <div class="pt-1">{{ level }} {{ props.rating }}</div>
            <span
                v-for="n in props.maxRating"
                :key="'' + n"
                class="cursor-pointer"
            >
                <v-icon
                    icon="mdi-star"
                    size="18"
                    :class="{
                        'text-amber-500': props.rating >= n,
                        'text-gray-400': props.rating < n,
                    }"
                >
                </v-icon>
            </span>

            <div class="pt-1">({{ props.numVotes }})</div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{
    maxRating: number;
    rating: number;
    numVotes: number;
}>();

const level = computed(() => {
    switch (props.rating.toFixed(0)) {
        case "5":
            return "Excellent";
        case "4":
            return " Very Goods";
        case "3":
            return "Average";
        case "2":
            return "Below Average";
        case "1":
            return "Poor";
        default:
            return "Unchecked";
    }
});
</script>
