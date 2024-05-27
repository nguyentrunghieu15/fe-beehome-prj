<template>
    <div>
        <div>
            <label for="" class="font-bold mb-2">{{ props.label }}</label
            ><span v-if="props.isRequired" class="text-red-700">*</span>
        </div>
        <ul>
            <li class="flex mb-1" v-for="i in showList" :key="i.id">
                <div>
                    <input
                        class="border border-gray-900"
                        type="radio"
                        :id="i.label"
                        :name="props.label"
                        :value="i.value"
                        v-model="modelValue"
                    />
                </div>
                <label class="pl-2 text-sm" :for="i.label">{{ i.label }}</label>
            </li>
        </ul>
        <p
            class="text-sm text-sky-500 hover:underline hover:cursor-pointer"
            @click="isShowAll = !isShowAll"
            v-if="props.list.length > props.maxLength"
        >
            {{ isShowAll ? "show less" : "show more" }}
        </p>
        <slot />
    </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import type { SingleSelectedItem } from "./constants";

const props = defineProps<{
    label: string;
    isRequired: boolean;
    maxLength: number;
    list: SingleSelectedItem[];
}>();

const isShowAll = ref(false);
const showList = computed(() => {
    if (isShowAll.value) return props.list;
    if (props.list.length > props.maxLength) {
        return props.list.slice(0, props.maxLength);
    }
    return props.list;
});

const modelValue = defineModel();
</script>
