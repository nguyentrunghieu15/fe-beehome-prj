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
                        v-model:model-value="form.name.value"
                        :errors="form.errors.value.name"
                    ></InputField>
                    <InputField
                        :is-required="true"
                        label="Year:"
                        type="number"
                        v-model:model-value="form.years.value"
                        class="mb-6"
                        :errors="form.errors.value.years"
                    ></InputField>
                </div>
                <div>
                    <InputField
                        :is-required="true"
                        label="Postal Code:"
                        type="text"
                        v-model:model-value="form.postalCode.value"
                        class="mb-6 w-24"
                        :errors="form.errors.value.postalCode"
                    ></InputField>
                </div>
                <div>
                    <AreaTextField
                        :rows="10"
                        :cols="3"
                        :is-required="true"
                        label="Introduction"
                        v-model:model-value="form.introduction.value"
                        class="mb-6"
                        :errors="form.errors.value.introduction"
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
                        >Add</v-btn
                    >
                </div>
            </div>
            <div>
                <div class="w-[64rem] mt-6 mb-2">
                    <p class="font-semibold text-3xl">Social Media</p>
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
                        >Add</v-btn
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

const providerStore = useProviderStore();
const provider = providerStore.providerComputed;
const services = providerStore.servicesOfProviceComputed;

const form = useUpdateProviderForm();

const isShowAddServicePopup = ref(false);
const isShowAddSocialMedia = ref(false);

watch(provider, (newVal, oldVal) => {
    form.setFieldValue("name", newVal?.name);
    form.setFieldValue("years", newVal?.years);
    form.setFieldValue("postalCode", newVal?.postalCode?.zipcode);
    form.setFieldValue("introduction", newVal?.introduction);
});

onMounted(() => {
    form.setFieldValue("name", provider.value?.name);
    form.setFieldValue("years", provider.value?.years);
    form.setFieldValue("postalCode", provider.value?.postalCode?.zipcode);
    form.setFieldValue("introduction", provider.value?.introduction);
});

const isShowSaveBtn = computed(() => {
    return (
        form.name.value !== provider.value?.name ||
        form.years.value !== provider.value?.years ||
        form.postalCode.value !== provider.value?.postalCode.zipcode ||
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
