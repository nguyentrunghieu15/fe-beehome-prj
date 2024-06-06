<template>
    <div class="flex items-center h-[40rem]">
        <div class="block ml-32 px-8 w-[36rem]">
            <img src="@/assets/icon.png" alt="logo" class="w-20 h-20 mb-4" />
            <div class="mb-8 text-4xl font-extrabold">
                Home
                <h1 class="inline">repair,</h1>
                <br />make easy.
            </div>
            <div class="text-lg font-bold mb-4">
                <v-btn
                    variant="text"
                    size="x-large"
                    class="mr-5 px-0 font-bold"
                    style="font-weight: bold"
                    color="blue-darken-1"
                    @click="$emit('onclick-component', 'pro')"
                    >hire a pro</v-btn
                >
                <v-btn
                    variant="text"
                    size="x-large"
                    color="blue-darken-1"
                    style="font-weight: bold"
                    class="px-0"
                    @click="$emit('onclick-component', 'customer')"
                    >find customers</v-btn
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
                ></v-autocomplete>
                <div class="w-24">
                    <v-text-field
                        placeholder="Zipcode"
                        variant="solo"
                        v-model:model-value="zipcode"
                    />
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
                <span class="">Try searching for a </span>
                <a href="#" class="text-sky-500 hover:underline"> Plumber</a
                ><span class="">, </span
                ><a href="#" class="text-sky-500 hover:underline">Handyman</a
                ><span class="">, </span
                ><a href="#" class="text-sky-500 hover:underline">Landscaper</a>
                <span class=""> or </span>
                <a href="#" class="text-sky-500 hover:underline">Electrician</a
                ><span class="">.</span>
            </p>
        </div>
    </div>
</template>
<script setup lang="ts">
import groupServiceManagerService from "@/api/group-services";
import serviceManagerService from "@/api/service";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";

interface Items {
    name: string;
    id: string;
}
const states = ref<Array<Items>>([]);

const todo = ref("");
const zipcode = ref("");

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
    if (!todo.value || !zipcode.value) return;
    router.push({
        name: "view-results",
        query: {
            name: todo.value,
            zipcode: zipcode.value,
        },
    });
}
</script>
