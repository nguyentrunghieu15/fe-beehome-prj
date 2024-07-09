<template>
    <Dialog label="Make a request" v-model:model-value="modelValue">
        <div class="py-2 w-[40rem]">
            <h1 class="text-sm font-bold">Lựa chọn dịch vụ bạn muốn thuê</h1>
            <v-autocomplete
                base-color="white"
                item-title="name"
                item-value="id"
                :items="props.listService"
                variant="solo"
                placeholder="Tên dichj vụ bạn cần là gì?"
                v-model="form.serviceId.value"
            ></v-autocomplete>
            <div class="flex gap-2">
                <DatePicker
                    type-input="datetime-local"
                    label="Form"
                    :is-required="true"
                    v-model:model-value="form.workTimeFrom.value"
                    :errors="form.errors.value.workTimeFrom"
                ></DatePicker>
                <DatePicker
                    type-input="datetime-local"
                    label="To"
                    :is-required="true"
                    v-model:model-value="form.workTimeTo.value"
                    :errors="form.errors.value.workTimeTo"
                ></DatePicker>
            </div>
            <AreaTextField
                label="Mô tả vấn đề của bạn"
                :isRequired="true"
                :rows="10"
                :cols="5"
                v-model:model-value="form.issue.value"
            ></AreaTextField>
        </div>
        <template #actions>
            <v-btn class="mr-2" @click="emit('close')">Hủy</v-btn>
            <v-btn color="blue-lighten-1" @click="onSubmit">Thuê</v-btn>
        </template>
    </Dialog>
</template>
<script setup lang="ts">
import Dialog from "@/components/base/Dialog.vue";
import DatePicker from "@/components/base/DatePicker.vue";
import AreaTextField from "@/components/base/AreaTextField.vue";
import useForm from "../form/createHireForm";
import { onMounted } from "vue";
import type { Items } from "../constants/interfaces";
import { useRoute } from "vue-router";
import { useMainStore } from "@/stores/mainStore";

const modelValue = defineModel<boolean>();

const props = defineProps<{
    listService: Items[];
}>();

const emit = defineEmits<{
    close: [];
}>();
const route = useRoute();

const form = useForm();
onMounted(() => {
    form.resetForm();
    const providerId = route.query.id;
    form.setFieldValue("providerId", providerId);
});

const mainStore = useMainStore();

async function onSubmit() {
    try {
        const res = await form.onSubmit();
        emit("close");
        mainStore.showNofitication({
            content: "Make request success. Pendding from provider",
            title: "Success",
            typeNotification: "infor",
        });
    } catch (error) {}
}
</script>
