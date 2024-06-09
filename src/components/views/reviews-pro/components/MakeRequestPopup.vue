<template>
    <Dialog label="Make a request" v-model:model-value="modelValue">
        <div class="py-2 w-[40rem]">
            <h1 class="text-sm font-bold">Select your service</h1>
            <v-autocomplete
                base-color="white"
                item-title="name"
                item-value="id"
                :items="props.listService"
                variant="solo"
                placeholder="What's on to-do list?"
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
                label="Describle your issue"
                :isRequired="true"
                :rows="10"
                :cols="5"
                v-model:model-value="form.issue.value"
            ></AreaTextField>
        </div>
        <template #actions>
            <v-btn class="mr-2" @click="emit('close')">Cancel</v-btn>
            <v-btn color="blue-lighten-1" @click="onSubmit">Create</v-btn>
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

async function onSubmit() {
    form.onSubmit();
    emit("close");
}
</script>
