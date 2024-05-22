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
            <div>
                <v-text-field
                    placeholder="What's on to-do list?"
                    append-icon="mdi-magnify"
                    variant="solo"
                >
                </v-text-field>
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
<script setup lang="ts"></script>
