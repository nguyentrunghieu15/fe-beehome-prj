<template>
    <div class="search-input">
        <label
            v-if="props.label"
            class="block mb-2 text-sm font-bold text-gray-900"
            >{{ props.label }}
            <span v-if="isRequired" class="text-red-800">*</span></label
        >
        <input
            type="text"
            v-model="term"
            :class="{
                'text-gray-400': props.isDisable,
                'text-gray-900': !props.isDisable,
            }"
            class="border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full"
            :placeholder="props.placeholder"
            @input="onChangeInput"
            @keydown.up="navigateSuggestions('up')"
            @keydown.down="navigateSuggestions('down')"
            @keyup.enter="onEnterActiveSuggestion"
        />
        <ul v-if="suggestions.length" class="suggestions divide-y">
            <li
                v-for="(suggestion, idx) in suggestions"
                :key="suggestion.id"
                class="hover:bg-slate-100"
                :class="{ 'bg-slate-100': selectedIndex === idx }"
            >
                <p @click="emit('selectSuggestion', suggestion)">
                    {{ suggestion.text }}
                </p>
            </li>
        </ul>
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import type { ISuggestion } from "./constants";

const props = defineProps<{
    suggestions: Array<ISuggestion>;
    placeholder?: string;
    label?: string;
    isRequired?: boolean;
    isDisable?: boolean;
}>();

const term = ref("");
const isShowSugesstion = ref(false);
const emit = defineEmits<{
    changeTerm: [];
    submitTerm: [value: string];
    selectSuggestion: [value: ISuggestion];
}>();

let data: any;

function onChangeInput() {
    if (isShowSugesstion.value) {
        emit("changeTerm");
        isShowSugesstion.value = false;
    }

    if (data) {
        clearTimeout(data);
    }

    if (term.value) {
        data = setTimeout(() => {
            emit("submitTerm", term.value);
            isShowSugesstion.value = true;
        }, 500);
    }
}

const selectedIndex = ref(-1);

function navigateSuggestions(direction: "up" | "down") {
    if (!isShowSugesstion.value || props.suggestions.length === 0) return;

    const totalSuggestions = props.suggestions.length;
    if (direction === "up") {
        selectedIndex.value =
            (selectedIndex.value - 1 + totalSuggestions) % totalSuggestions;
    } else {
        selectedIndex.value = (selectedIndex.value + 1) % totalSuggestions;
    }
}

function onEnterActiveSuggestion() {
    if (selectedIndex.value >= 0) {
        emit("selectSuggestion", props.suggestions[selectedIndex.value]);
        selectedIndex.value = -1;
    }
}
</script>

<style scoped>
.search-input {
    position: relative;
}

.search-input input {
    padding: 10px;
    width: 100%;
}
.suggestions {
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    background-color: #fff;
    border: 1px solid #8f8d8d;
    border-radius: 5px;
    list-style: none;
    padding: 0;
    margin: 0;
    max-height: 200px;
    overflow-y: auto;
    z-index: 120;
}

.suggestions li {
    padding: 5px 10px;
    cursor: pointer;
}
</style>
