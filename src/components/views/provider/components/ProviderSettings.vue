<template>
    <div class="w-full flex flex-column items-center mb-15">
        <div class="w-[64rem] mt-6 mb-2">
            <v-btn
                class="text-none justify-self-start"
                color="blue-lighten-1"
                variant="text"
                prepend-icon="mdi-less-than"
                @click="$router.replace({ path: '/pro/profile' })"
                >Back</v-btn
            >
            <p class="font-semibold text-3xl">Profile Information</p>
        </div>
        <div class="w-[64rem] p-6">
            <div class="grid grid-cols-5 gap-4">
                <InputField
                    :is-required="true"
                    label="Name:"
                    type="text"
                    class="mb-6"
                    v-model:model-value="nameProvider"
                ></InputField>
                <InputField
                    :is-required="true"
                    label="Year:"
                    type="number"
                    v-model:model-value="yearExpProvider"
                    class="mb-6"
                ></InputField>
            </div>
            <div>
                <InputField
                    :is-required="true"
                    label="Postal Code:"
                    type="text"
                    v-model:model-value="postalCodeProvider"
                    class="mb-6 w-24"
                ></InputField>
            </div>
            <div>
                <AreaTextField
                    :rows="10"
                    :cols="3"
                    :is-required="true"
                    label="Introduction"
                    v-model:model-value="introductionProvider"
                    class="mb-6"
                ></AreaTextField>
            </div>
            <v-btn
                v-if="isShowSaveBtn"
                class="text-none ju"
                rounded
                color="blue-lighten-1"
                size="large"
                @click="onClickSave"
                >Save</v-btn
            >
        </div>
        <div>
            <div class="w-[64rem] mt-6 mb-2">
                <p class="font-semibold text-3xl">Services</p>
            </div>
            <div class="w-[64rem] p-6 flex flex-wrap">
                <ServiceItems
                    v-for="i in 5"
                    name="Home remove glass"
                    :id-service="i.toString()"
                    class="m-1"
                    @remove="console.log(i)"
                ></ServiceItems>
            </div>
            <div class="px-6">
                <v-btn
                    class="text-none ju"
                    rounded
                    color="blue-lighten-1"
                    size="large"
                    >Add</v-btn
                >
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import InputField from "@/components/base/InputField.vue";
import AreaTextField from "@/components/base/AreaTextField.vue";
import ServiceItems from "./ServiceItems.vue";
import { useProviderStore } from "@/stores/providerStore";
import { computed, onMounted, ref } from "vue";
import providerService from "@/api/provider";

const providerStore = useProviderStore();
const provider = providerStore.providerComputed;

const nameProvider = ref("");
const yearExpProvider = ref(0);
const postalCodeProvider = ref("");
const introductionProvider = ref("");

onMounted(() => {
    nameProvider.value = provider.value?.name ?? "";
    yearExpProvider.value = provider.value?.years ?? 0;
    postalCodeProvider.value = provider.value?.postalCode.zipcode || "";
    introductionProvider.value = provider.value?.introduction ?? "";
});

const isShowSaveBtn = computed(() => {
    return (
        nameProvider.value !== provider.value?.name ||
        yearExpProvider.value !== provider.value?.years ||
        postalCodeProvider.value !== provider.value?.postalCode.zipcode ||
        introductionProvider.value !== provider.value?.introduction
    );
});

const onClickSave = () => {
    providerService
        .updatePro(provider.value?.id ?? "", {
            introduction: introductionProvider.value,
            name: nameProvider.value,
            postalCode: postalCodeProvider.value,
            years: yearExpProvider.value,
        })
        .then((data) => {
            providerStore.setProvider(data);
        });
};
</script>
