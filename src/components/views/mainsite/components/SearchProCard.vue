<template>
    <div class="flex items-center h-[40rem]">
        <div class="block ml-32 px-8 w-[36rem]">
            <img src="@/assets/icon.png" alt="logo" class="w-20 h-20 mb-4" />
            <div class="mb-8 text-4xl font-extrabold">
                Dịch vụ tiên ích
                <h1 class="inline">nhà cửa,</h1>
                <br />siêu tiện lợi.
            </div>
            <div class="text-lg font-bold mb-4">
                <v-btn
                    variant="text"
                    size="x-large"
                    class="mr-5 px-0 font-bold"
                    style="font-weight: bold"
                    color="blue-darken-1"
                    @click="$emit('onclick-component', 'pro')"
                    >Thuê nhà cung cấp</v-btn
                >
                <v-btn
                    variant="text"
                    size="x-large"
                    color="blue-darken-1"
                    style="font-weight: bold"
                    class="px-0"
                    @click="$emit('onclick-component', 'customer')"
                    >Tìm kiếm khách hang</v-btn
                >
            </div>
            <div class="flex">
                <v-autocomplete
                    base-color="white"
                    item-title="name"
                    item-value="name"
                    variant="solo"
                    v-model="todo"
                    :items="states"
                    placeholder="What's on to-do list?"
                    @keypress.enter="onClickSearch"
                ></v-autocomplete>
                <div class="w-48">
                    <SearchInput
                        :suggestions="listSuggestionAddress"
                        placeholder="Địa chỉ"
                        custom-style="h-14 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block"
                        @change-term="changeAddress"
                        @submit-term="onSubmitAddressTerm"
                        @select-suggestion="onSelectAddressItem"
                        v-model:model-value="address"
                    ></SearchInput>
                </div>
                <v-btn
                    size="large"
                    :rounded="false"
                    icon="mdi-magnify"
                    color="blue-lighten-1"
                    @click="onClickSearch"
                />
            </div>
            <p class="text-slate-400">
                <span class="">Thử tìm kiếm với từ khóa </span>
                <a href="#" class="text-sky-500 hover:underline"> Ống nước</a
                ><span class="">, </span
                ><a href="#" class="text-sky-500 hover:underline">Điều hòa</a
                ><span class="">, </span
                ><a href="#" class="text-sky-500 hover:underline">Làm sạch</a>
                <span class=""> or </span>
                <a href="#" class="text-sky-500 hover:underline">Điện</a
                ><span class="">.</span>
            </p>
        </div>
    </div>
</template>
<script setup lang="ts">
import addressService from "@/api/address-api";
import groupServiceManagerService from "@/api/group-services";
import serviceManagerService from "@/api/service";
import type { ISuggestion } from "@/components/base/constants";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import SearchInput from "@/components/base/SearchInput.vue";

interface Items {
    name: string;
    id: string;
}
const states = ref<Array<Items>>([]);

const todo = ref("");
const listSuggestionAddress = ref<Array<ISuggestion>>([]);
const address = ref("");
function onSubmitAddressTerm(value: string) {
    addressService.findAllAddress(value).then((addresss) => {
        listSuggestionAddress.value = addresss.address.map((e) => {
            return {
                id: e,
                text: e,
            };
        });
    });
}

function changeAddress() {
    listSuggestionAddress.value = [];
}

function onSelectAddressItem(v: ISuggestion) {
    address.value = v.text;
    listSuggestionAddress.value = [];
}


onMounted(() => {
    serviceManagerService.listServices({}).then((res) => {
        states.value = res.services.map((e) => {
            return { name: e.name, id: e.id };
        });
    });
    groupServiceManagerService.listGroupServices({}).then((res) => {
        states.value = states.value.concat(
            res.groupServices.map((e) => {
                return { name: e.name, id: e.id };
            })
        );
    });
});

const router = useRouter();

function onClickSearch() {
    if (!todo.value || !address.value) return;
    router.push({
        name: "view-results",
        query: {
            name: todo.value,
            address: address.value,
        },
    });
}
</script>
