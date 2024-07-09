<template>
    <div class="w-[32rem] rounded-lg p-6 bg-white">
        <div class="grid grid-cols-2 gap-4">
            <InputField
                :is-required="true"
                label="Tên nhà cung cấp:"
                v-model:model-value="form.name.value"
                type="text"
                class="mb-6"
                :errors="form.errors.value.name"
            ></InputField>
            <InputField
                :is-required="true"
                label="Năm kinh nghiệm:"
                v-model:model-value="form.years.value"
                type="number"
                class="mb-6"
                :errors="form.errors.value.years"
            ></InputField>
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
        <div>
            <AreaTextField
                :rows="10"
                :cols="3"
                :is-required="true"
                label="Giới thiệu:"
                v-model:model-value="form.introduction.value"
                class="mb-6"
                :errors="form.errors.value.introduction"
            ></AreaTextField>
        </div>
        <div class="mb-6 text-slate-500">
            <p>
                By clicking Create Provider Profile, you agree to the
                <span class="text-cyan-500 underline hover:cursor-pointer"
                    >Terms of Use</span
                >
                and
                <span class="text-cyan-500 underline hover:cursor-pointer"
                    >Privacy Policy</span
                >.
            </p>
        </div>
        <button
            class="bg-sky-500 text-white w-full py-2 text-xl font-bold rounded mb-6"
            @click="submit"
        >
            Create Provider Profile
        </button>
    </div>
</template>
<script setup lang="ts">
import AreaTextField from "@/components/base/AreaTextField.vue";
import AutoCompleteCombobox from "@/components/base/AutoCompleteCombobox.vue";
import InputField from "@/components/base/InputField.vue";
import useForm from "../form/signupProForm";
import { onMounted, ref, watch } from "vue";
import { useRouter } from "vue-router";
import providerService from "@/api/provider";
import addressService from "@/api/address-api";
import type { AddressUnit } from "@/api/address-api/interfaces";
import { join } from "lodash";

const form = useForm();
const router = useRouter();

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
    try {
        provinceUnits.value = (
            await addressService.findAllNameOfAddressUnit("province")
        ).unit;
        provinceUnits.value.forEach((element) => {
            provinceItems.value.push(element.name ?? "");
        });
    } catch (error) {}
});

const submit = async () => {
    if ((await form.validate()).valid) {
        form.onSubmit().then(async () => {
            try {
                await providerService.joinAsProvider();
                router.push({ name: "main" });
            } catch (error) {}
        });
    }
};

watch(province, async (newVal, oldVal) => {
    ward.value = "";
    district.value = "";
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
            join([ newVal, district.value,  province.value], ", ")
        );
    }
});
</script>
