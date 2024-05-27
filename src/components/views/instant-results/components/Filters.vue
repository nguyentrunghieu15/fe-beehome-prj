<template>
    <div>
        <h1 class="text-bold font-bold text-2xl mb-4">Filters</h1>
        <SingleSelected
            label="Test SingleSelected"
            :is-required="false"
            :list="data"
            :max-length="3"
            v-model:model-value="value"
        ></SingleSelected>
    </div>
</template>
<script setup lang="ts">
import SingleSelected from "@/components/base/SingleSelected.vue";
import type { SingleSelectedItem } from "@/components/base/constants";
import { ref, watch } from "vue";
const data = ref<SingleSelectedItem[]>([
    {
        id: 1,
        label: "Plumbing Pipe Repair",
        value: 1,
    },

    {
        id: 2,
        label: "Plumbing Drain Repair",
        value: 2,
    },
    {
        id: 3,
        label: "Plumbing Pipe Installation or Replacement",
        value: 3,
    },
    {
        id: 4,
        label: "Plumbing Inspection",
        value: 4,
    },
]);
const value = ref();
</script>
