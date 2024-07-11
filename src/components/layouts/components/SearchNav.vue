<template>
    <div class="md:flex items-center h-full z-20">
        <div class="flex shrink grow items-center">
            <img
                @click="returnHome"
                src="@/assets/icon.png"
                alt="Image description"
                class="w-16 h-16 hover:cursor-pointer"
            />
            <span
                @click="returnHome"
                class="flex items-center text-sky-500 font-semibold text-2xl hover:cursor-pointer"
                >Bee Home</span
            >
            <SearchInput
                :suggestions="listSuggestion"
                placeholder="Tìm kiếm dịch vụ bạn muốn"
                custom-style="ml-4 w-48 border text-gray-900 border-gray-300  text-sm rounded-l-lg focus:ring-blue-500 focus:border-blue-500 block "
                @change-term="change"
                @submit-term="onSubmitTerm"
                @select-suggestion="onSelectItem"
                v-model:model-value="todo"
            ></SearchInput>
            <SearchInput
                :suggestions="listSuggestionAddress"
                placeholder="Địa chỉ"
                custom-style="w-80 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block"
                @change-term="changeAddress"
                @submit-term="onSubmitAddressTerm"
                @select-suggestion="onSelectAddressItem"
                v-model:model-value="addressUnit"
            ></SearchInput>
            <v-btn
                class="m-0"
                rounded="0"
                color="primary"
                @click="onClickSearch"
            >
                Tìm kiếm
                <v-icon icon="mdi-magnify"></v-icon>
            </v-btn>
        </div>
        <div class="flex items-center px-4 h-full z-20">
            <button
                @click="onClickAsPro"
                class="p-2 bg-sky-500 text-white font-bold rounded-3xl hover:cursor-pointer shrink-0"
            >
                {{
                    isProvider &&
                    !$router.currentRoute.value.path.startsWith("/pro/")
                        ? "Tham gia với tư cách nhà cung cấp"
                        : "Tham gia với tư cách khách hàng"
                }}
            </button>
        </div>
        <RouterLink
            :to="{ name: 'cus-project' }"
            class="flex items-center h-full px-4 text-slate-600 hover:border-b-slate-300 hover:border-b-2 z-20"
            >Dự án của bạn</RouterLink
        >
        <RouterLink
            :to="{ name: '' }"
            class="flex items-center h-full px-4 text-slate-600 hover:border-b-slate-300 hover:border-b-2 z-20"
            >Nhóm</RouterLink
        >
        <RouterLink
            :to="{ name: '' }"
            class="flex items-center h-full px-4 text-slate-600 hover:border-b-slate-300 hover:border-b-2 z-20"
            >Nhắn Tin</RouterLink
        >
        <DropdownAvatar class="mr-4" avatar-url="" :initials="initialsAvatar">
            <RouterLink
                :to="{ path: '/profile' }"
                class="block px-4 py-2 hover:bg-gray-100"
                >Hồ sơ</RouterLink
            >
            <p @click="logout" class="block px-4 py-2 hover:bg-gray-100">
                Thoát
            </p>
        </DropdownAvatar>
    </div>
</template>
<script setup lang="ts">
import { useRouter } from "vue-router";
import DropdownAvatar from "@/components/base/DropdownAvatar.vue";
import { computed, onMounted, ref } from "vue";
import { useUserStore } from "@/stores/userStore";
import SearchInput from "@/components/base/SearchInput.vue";
import type { ISuggestion } from "@/components/base/constants";
import serviceManagerService from "@/api/service";
import addressService from "@/api/address-api";

const userStore = useUserStore();
const router = useRouter();
const returnHome = () => {
    router.push({ path: "/" });
};

const logout = () => {
    // Do something before return home
    sessionStorage.clear();
    router.go(0);
};
const user = userStore.userComputed;
const initialsAvatar = computed(() => {
    if (
        user.value?.firstName?.charAt(0)?.toUpperCase() &&
        user.value?.lastName?.charAt(0)?.toUpperCase()
    ) {
        return (
            user.value?.firstName?.charAt(0)?.toUpperCase() +
            user.value?.lastName?.charAt(0)?.toUpperCase()
        );
    }
    return "";
});

const isProvider = ref(false);

function onClickAsPro() {
    if (sessionStorage.getItem("PROVIDER_TOKEN")) {
        router.push({ name: "project-pro" });
    } else {
        router.push({ name: "signup-pro" });
    }
}

onMounted(() => {
    isProvider.value = sessionStorage.getItem("PROVIDER_TOKEN") !== null;
});

const listSuggestion = ref<Array<ISuggestion>>([]);
const todo = ref("");
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

function change() {
    listSuggestion.value = [];
}

function onSelectItem(v: ISuggestion) {
    todo.value = v.text;
    listSuggestion.value = [];
}

const listSuggestionAddress = ref<Array<ISuggestion>>([]);
const addressUnit = ref("");
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
    addressUnit.value = v.text;
    listSuggestionAddress.value = [];
}

function onClickSearch() {
    if (!todo.value || !addressUnit.value) return;
    router.replace({
        name: "view-results",
        query: {
            name: todo.value,
            address: addressUnit.value,
        },
    });
}
</script>
