<template>
    <div>
        <h1>Filters</h1>
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
        label: "Test1",
        value: 1,
    },

    {
        id: 2,
        label: "Test2",
        value: 2,
    },
    {
        id: 3,
        label: "Test3",
        value: 3,
    },
    {
        id: 4,
        label: "Test4",
        value: 4,
    },
]);
const value = ref();
</script>
