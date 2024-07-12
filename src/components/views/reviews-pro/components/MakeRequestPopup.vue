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
                    label="Từ ngày"
                    :is-required="true"
                    v-model:model-value="form.workTimeFrom.value"
                    :errors="form.errors.value.workTimeFrom"
                    min-date="2024/07/09"
                ></DatePicker>
                <DatePicker
                    type-input="datetime-local"
                    label="Đến ngày"
                    :is-required="true"
                    v-model:model-value="form.workTimeTo.value"
                    :errors="form.errors.value.workTimeTo"
                ></DatePicker>
            </div>
            <div class="w-full">
                <AutoCompleteCombobox
                    label="Tỉnh / Thành phố trực thuộc trung ương"
                    :items="provinceItems"
                    :is-required="true"
                    :errors="form.errors.value.address"
                    v-model:model-value="province"
                ></AutoCompleteCombobox>
                <div class="grid grid-cols-2 gap-2">
                    <AutoCompleteCombobox
                        label="Thành phố / Huyện"
                        :is-required="true"
                        :items="districtItems"
                        :errors="form.errors.value.address"
                        v-model:model-value="district"
                        :is-disable="!province"
                    ></AutoCompleteCombobox>
                    <AutoCompleteCombobox
                        label="Phường / Thị trấn"
                        :is-required="true"
                        :items="wardItems"
                        :errors="form.errors.value.address"
                        v-model:model-value="ward"
                        :is-disable="!district"
                    ></AutoCompleteCombobox>
                </div>
            </div>
            <InputField
                :is-required="true"
                label="Địa chỉ đầy đủ:"
                v-model:model-value="form.fullAddress.value"
                type="text"
                class="mb-6"
                :errors="form.errors.value.fullAddress"
            ></InputField>
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
import { onMounted, ref, watch } from "vue";
import type { Items } from "../constants/interfaces";
import { useRoute } from "vue-router";
import { useMainStore } from "@/stores/mainStore";
import type { AddressUnit } from "@/api/address-api/interfaces";
import addressService from "@/api/address-api";
import { join, now } from "lodash";
import InputField from "@/components/base/InputField.vue";
import AutoCompleteCombobox from "@/components/base/AutoCompleteCombobox.vue";
const modelValue = defineModel<boolean>();

const props = defineProps<{
    listService: Items[];
}>();

const emit = defineEmits<{
    close: [];
}>();
const route = useRoute();

const form = useForm();

const provinceUnits = ref<AddressUnit[]>([]);
const districtUnits = ref<AddressUnit[]>([]);
const wardUnits = ref<AddressUnit[]>([]);

const provinceItems = ref<string[]>([]);
const districtItems = ref<string[]>([]);
const wardItems = ref<string[]>([]);

const province = ref("");
const district = ref("");
const ward = ref("");

onMounted(async () => {
    form.resetForm();
    const providerId = route.query.id;
    form.setFieldValue("providerId", providerId);
    try {
        provinceUnits.value = (
            await addressService.findAllNameOfAddressUnit("province")
        ).unit;
        provinceUnits.value.forEach((element) => {
            provinceItems.value.push(element.name ?? "");
        });
    } catch (error) {}
});

watch(province, async (newVal, oldVal) => {
    ward.value = "";
    district.value = "";
    districtItems.value = [];
    wardItems.value = [];
    if (newVal === "") {
        form.setFieldValue("address", "");
    }
    const provinceUnit = provinceUnits.value.find((e) => e.name === newVal);
    try {
        districtUnits.value = (
            await addressService.findAllNameOfAddressUnit(
                "district",
                provinceUnit?.name,
                provinceUnit?.code
            )
        ).unit;
        districtUnits.value.forEach((element) => {
            districtItems.value.push(element.name ?? "");
        });
    } catch (error) {}
});

watch(district, async (newVal, oldVal) => {
    if (newVal === "") {
        form.setFieldValue("address", "");
    }
    ward.value = "";
    wardItems.value = [];
    const districtUnit = districtUnits.value.find((e) => e.name === newVal);
    try {
        wardUnits.value = (
            await addressService.findAllNameOfAddressUnit(
                "ward",
                districtUnit?.name,
                districtUnit?.code
            )
        ).unit;
        wardUnits.value.forEach((element) => {
            wardItems.value.push(element.name ?? "");
        });
    } catch (error) {}
});

watch(ward, async (newVal, oldVal) => {
    if (newVal === "") {
        form.setFieldValue("address", "");
    } else {
        form.setFieldValue(
            "address",
            join([newVal, district.value, province.value], ", ")
        );
    }
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
