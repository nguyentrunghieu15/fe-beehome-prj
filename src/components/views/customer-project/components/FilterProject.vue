<template>
    <div class="w-full flex justify-between border-b-sky-500 border-b-2">
        <AutoCompleteCombobox
            class="w-1/3"
            :items="listItem || []"
            placeholder="Loại dịch vụ"
            v-model:model-value="filterService"
        ></AutoCompleteCombobox>
        <div class="w-3/5">
            <v-text-field
                variant="outlined"
                placeholder="Tìm kiếm theo tên, mô tả vấn đề"
                v-model="filterSearch"
            >
                <template v-slot:append-inner>
                    <v-icon icon="mdi-magnify" />
                </template>
            </v-text-field>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { Service } from "@/api/service/interfaces";
import AutoCompleteCombobox from "@/components/base/AutoCompleteCombobox.vue";
import { computed, ref, watch } from "vue";

const props = defineProps<{
    listService: Service[];
}>();

const listItem = computed(() => {
    return props.listService.map((e) => e.name).sort();
});

const filterService = ref();
const filterSearch = ref();

const emit = defineEmits<{
    apply: [search: string, service: string];
}>();

let wait: number;

watch(filterSearch, (newVal, oldVal) => {
    if (wait) {
        clearTimeout(wait);
    }
    wait = setTimeout(() => {
        emit(
            "apply",
            filterSearch.value,
            props.listService.find((e) => e.name === filterService.value)?.id || ""
        );
    }, 500);
});

watch(filterService, (newVal, oldVal) => {
    if (wait) {
        clearTimeout(wait);
    }
    wait = setTimeout(() => {
        emit(
            "apply",
            filterSearch.value,
            props.listService.find((e) => e.name === newVal)?.id || ""
        );
    }, 500);
});
</script>
