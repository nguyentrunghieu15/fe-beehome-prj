<template>
    <div>
        <div class="w-full flex flex-column items-center mb-15">
            <div class="w-[64rem] mt-6 mb-2">
                <v-btn
                    class="text-none justify-self-start"
                    color="blue-lighten-1"
                    variant="text"
                    prepend-icon="mdi-less-than"
                    @click="$router.replace({ path: '/pro/profile' })"
                    >Quay lại</v-btn
                >
                <p class="font-semibold text-3xl">
                    Thông tin thương hiệu của bạn
                </p>
            </div>
            <div class="w-[64rem] p-6">
                <div class="grid grid-cols-5 gap-4">
                    <InputField
                        :is-required="true"
                        label="Tên thương hiệu:"
                        type="text"
                        class="mb-6"
                        v-model:model-value="form.name.value"
                        :errors="form.errors.value.name"
                    ></InputField>
                    <InputField
                        :is-required="true"
                        label="Năm khinh nghiệm:"
                        type="number"
                        v-model:model-value="form.years.value"
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
                <v-btn
                    v-if="isShowSaveBtn"
                    class="text-none"
                    rounded
                    color="blue-lighten-1"
                    size="large"
                    @click="onClickSave"
                    >Lưu lại</v-btn
                >
            </div>
            <div>
                <div class="w-[64rem] mt-6 mb-2">
                    <p class="font-semibold text-3xl">Dịch vụ của bạn</p>
                </div>
                <div class="w-[64rem] p-2 flex flex-wrap">
                    <ServiceItems
                        v-for="s in services"
                        :name="s.name"
                        :id-service="s.id"
                        class="m-1"
                        @remove="onClickRemoveService(s.id)"
                    ></ServiceItems>
                </div>
                <div class="px-6">
                    <v-btn
                        class="text-none ju"
                        rounded
                        color="blue-lighten-1"
                        size="large"
                        @click="isShowAddServicePopup = true"
                        >Thêm mới</v-btn
                    >
                </div>
            </div>
            <div>
                <div class="w-[64rem] mt-6 mb-2">
                    <p class="font-semibold text-3xl">Đường dẫn liên kết</p>
                </div>
                <div class="w-[64rem] px-6 pb-6 flex flex-wrap">
                    <ul class="px-6 list-disc">
                        <li
                            v-for="media in provider?.socialMedias"
                            :key="media.id"
                        >
                            <SocialMediaItems
                                class="w-96"
                                :name="media.name"
                                :link="media.link"
                                :id="media.id"
                                @remove="deleteSocialMedia"
                                @edit="updateSocialMedia"
                            >
                            </SocialMediaItems>
                        </li>
                    </ul>
                </div>
                <div class="px-6">
                    <div
                        v-if="isShowAddSocialMedia"
                        class="w-96 grid grid-cols-4 gap-2"
                    >
                        <InputField
                            :is-required="true"
                            label=""
                            place-holder="Name"
                            v-model:model-value="addSocialMediaForm.name.value"
                            :errors="addSocialMediaForm.errors.value.name"
                            @enter="onAddMedia"
                        ></InputField>
                        <InputField
                            class="col-span-3"
                            :is-required="true"
                            label=""
                            place-holder="Link"
                            v-model:model-value="addSocialMediaForm.link.value"
                            :errors="addSocialMediaForm.errors.value.link"
                            @enter="onAddMedia"
                        ></InputField>
                    </div>
                    <v-btn
                        class="text-none ju"
                        rounded
                        color="blue-lighten-1"
                        size="large"
                        @click="
                            () => {
                                if (isShowAddSocialMedia) {
                                    onAddMedia();
                                } else {
                                    isShowAddSocialMedia = true;
                                }
                            }
                        "
                        >Thêm mới</v-btn
                    >
                </div>
            </div>
        </div>
        <AddServicePopup
            v-model:model-value="isShowAddServicePopup"
        ></AddServicePopup>
    </div>
</template>
<script setup lang="ts">
import InputField from "@/components/base/InputField.vue";
import AreaTextField from "@/components/base/AreaTextField.vue";
import ServiceItems from "./ServiceItems.vue";
import { useProviderStore } from "@/stores/providerStore";
import { computed, onMounted, onUpdated, ref, watch } from "vue";
import providerService from "@/api/provider";
import AddServicePopup from "./AddServicePopup.vue";
import useUpdateProviderForm from "../form/updateProviderForm";
import SocialMediaItems from "./SocialMediaItems.vue";
import useAddSocialMediaForm from "../form/addSocialMediaForm";
import type { AddressUnit } from "@/api/address-api/interfaces";
import addressService from "@/api/address-api";
import AutoCompleteCombobox from "@/components/base/AutoCompleteCombobox.vue";
import { join } from "lodash";

const providerStore = useProviderStore();
const provider = providerStore.providerComputed;
const services = providerStore.servicesOfProviceComputed;

const form = useUpdateProviderForm();

const isShowAddServicePopup = ref(false);
const isShowAddSocialMedia = ref(false);

watch(provider, (newVal, oldVal) => {
    form.setFieldValue("name", newVal?.name);
    form.setFieldValue("years", newVal?.years);
    form.setFieldValue("address", newVal?.address);
    form.setFieldValue("introduction", newVal?.introduction);
});

const provinceUnits = ref<AddressUnit[]>([]);
const districtUnits = ref<AddressUnit[]>([]);
const wardUnits = ref<AddressUnit[]>([]);

const provinceItems = ref<string[]>([]);
const districtItems = ref<string[]>([]);
const wardItems = ref<string[]>([]);

const province = ref("");
const district = ref("");
const ward = ref("");
let flagCounter = true;

onMounted(async () => {
    form.resetForm();
    form.setFieldValue("name", provider.value?.name);
    form.setFieldValue("years", provider.value?.years);
    form.setFieldValue("address", provider.value?.address);
    form.setFieldValue("introduction", provider.value?.introduction);
    try {
        provinceUnits.value = (
            await addressService.findAllNameOfAddressUnit("province")
        ).unit;
        provinceItems.value = []
        provinceUnits.value.forEach((element) => {
            provinceItems.value.push(element.name ?? "");
        });
    } catch (error) {}
    const splitedAddress = provider.value?.address.split(",");
    if (splitedAddress) {
        province.value = splitedAddress[2].trim();
        district.value = splitedAddress[1].trim();
        ward.value = splitedAddress[0].trim();
        const provinceUnit = provinceUnits.value.find(
            (e) => e.name === province.value
        );
        try {
            districtUnits.value = (
                await addressService.findAllNameOfAddressUnit(
                    "district",
                    provinceUnit?.name,
                    provinceUnit?.code
                )
            ).unit;
            districtItems.value = []
            districtUnits.value.forEach((element) => {
                districtItems.value.push(element.name ?? "");
            });
        } catch (error) {}
        const districtUnit = districtUnits.value.find(
            (e) => e.name === district.value
        );
        try {
            wardUnits.value = (
                await addressService.findAllNameOfAddressUnit(
                    "ward",
                    districtUnit?.name,
                    districtUnit?.code
                )
            ).unit;
            wardItems.value= []
            wardUnits.value.forEach((element) => {
                wardItems.value.push(element.name ?? "");
            });
        } catch (error) {}
    }
});

watch(province, async (newVal, oldVal) => {
    if (!flagCounter) {
        ward.value = "";
        district.value = "";
    } else {
        return;
    }
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
        districtItems.value = []
        districtUnits.value.forEach((element) => {
            districtItems.value.push(element.name ?? "");
        });
    } catch (error) {}
});

watch(district, async (newVal, oldVal) => {
    if (newVal === "") {
        form.setFieldValue("address", "");
    }
    if (!flagCounter) {
        ward.value = "";
    } else {
        return;
    }
    const districtUnit = districtUnits.value.find((e) => e.name === newVal);
    try {
        wardUnits.value = (
            await addressService.findAllNameOfAddressUnit(
                "ward",
                districtUnit?.name,
                districtUnit?.code
            )
        ).unit;
        wardItems.value = []
        wardUnits.value.forEach((element) => {
            wardItems.value.push(element.name ?? "");
        });
    } catch (error) {}
});

watch(ward, async (newVal, oldVal) => {
    if (flagCounter) {
        flagCounter = false;
    }
    if (newVal === "") {
        form.setFieldValue("address", "");
    } else {
        form.setFieldValue(
            "address",
            join([newVal, district.value, province.value], ", ")
        );
    }
});

const isShowSaveBtn = computed(() => {
    if (!form.address.value) {
        return false;
    }
    return (
        form.name.value !== provider.value?.name ||
        form.years.value !== provider.value?.years ||
        form.address.value !== provider.value?.address ||
        form.introduction.value !== provider.value?.introduction
    );
});

const onClickSave = async () => {
    try {
        const res = await form.onSubmit(provider.value?.id || "");
        if (res) {
            providerStore.setProvider(res);
        }
    } catch (error) {}
};

function onClickRemoveService(id: string) {
    providerService.deleteServiceForPro({ servicesId: [id] }).then(() => {
        providerStore.fetchProvider();
    });
}

const addSocialMediaForm = useAddSocialMediaForm();
async function onAddMedia() {
    if (addSocialMediaForm.isValidating.value) return;
    try {
        if (
            !(
                Object.keys(addSocialMediaForm.errors.value).length === 0 &&
                addSocialMediaForm.errors.value.constructor === Object
            ) ||
            !addSocialMediaForm.link.value.length
        )
            return;
        await addSocialMediaForm.onSubmit(provider.value?.id ?? "");
        await providerStore.fetchProvider();
        isShowAddSocialMedia.value = false;
    } catch (error) {}
}

async function updateSocialMedia(id: string, value: string) {
    try {
        await providerService.updateSocialMediaForPro({ id: id, link: value });
        await providerStore.fetchProvider();
    } catch (error) {}
}

async function deleteSocialMedia(id: string) {
    try {
        await providerService.deleteSocialMediaForPro(id);
        await providerStore.fetchProvider();
    } catch (error) {}
}
</script>
