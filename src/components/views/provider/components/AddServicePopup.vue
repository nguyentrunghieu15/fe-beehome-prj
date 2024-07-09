<template>
    <div>
        <Dialog
            v-model:model-value="modelValue"
            @close="
                () => {
                    emit('update:modelValue', false);
                    emit('close');
                    listServiceSelected = [];
                }
            "
            label="Thêm mới dịch vụ"
        >
            <SearchInput
                class="my-2"
                :suggestions="listSuggestion"
                placeholder="Tìm kiếm dịch vụ bạn cần"
                @change-term="change"
                @submit-term="onSubmitTerm"
                @select-suggestion="onSelectItem"
            ></SearchInput>
            <div class="min-h-64">
                <div
                    class="flex flex-wrap lg:w-[48rem] md:w-[32-rem] sm:w-96 max-h-96 my-2 border-t-2 p-2"
                >
                    <ServiceItems
                        class="my-0.5 mx-1"
                        v-for="s in listServiceSelected"
                        :key="s.id"
                        :name="s.text"
                        :id-service="s.id"
                        @remove="removeSelectedItem"
                    ></ServiceItems>
                </div>
            </div>
            <template #actions>
                <v-btn rounded color="blue-lighten-1" @click="onClickSave"
                    >Lưu</v-btn
                >
            </template>
        </Dialog>
    </div>
</template>
<script setup lang="ts">
import Dialog from "@/components/base/Dialog.vue";
import SearchInput from "@/components/base/SearchInput.vue";
import type { ISuggestion } from "@/components/base/constants";
import { ref } from "vue";
import ServiceItems from "./ServiceItems.vue";
import serviceManagerService from "@/api/service";
import providerService from "@/api/provider";
import { useProviderStore } from "@/stores/providerStore";

const providerStore = useProviderStore();

const modelValue = defineModel<boolean>();

const emit = defineEmits<{
    close: [];
    "update:modelValue": [value: boolean];
}>();

const listSuggestion = ref<Array<ISuggestion>>([]);
const listServiceSelected = ref<Array<ISuggestion>>([]);

function change() {
    listSuggestion.value = [];
}

function onSubmitTerm(value: string) {
    serviceManagerService.fulltextSearchServices(value).then((services) => {
        listSuggestion.value = services.services.map((e) => {
            return {
                id: e.id,
                text: e.name,
            };
        });
    });
}

function onSelectItem(v: ISuggestion) {
    if (
        !listServiceSelected.value.some((e) => {
            return e.id === v.id;
        })
    ) {
        listServiceSelected.value.push(v);
    }
    listSuggestion.value = [];
}

function removeSelectedItem(id: string) {
    listServiceSelected.value = listServiceSelected.value.filter((e) => {
        if (e.id !== id) return e;
    });
}

function onClickSave() {
    if (listServiceSelected.value.length) {
        providerService
            .addServiceForPro({
                servicesId: listServiceSelected.value.map((e) => e.id),
            })
            .then(() => {
                providerStore.fetchProvider();
            });
    }
    listServiceSelected.value = [];
    emit("update:modelValue", false);
    emit("close");
}
</script>
