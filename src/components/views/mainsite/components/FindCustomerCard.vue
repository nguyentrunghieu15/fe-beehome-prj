<template>
    <div class="flex items-center h-[40rem]">
        <div class="block ml-32 px-8 w-[36rem]">
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
                    class="px-0 md:px-6"
                    @click="$emit('onclick-component', 'customer')"
                    >find customers</v-btn
                >
            </div>
            <div class="mb-8 text-4xl font-extrabold">
                Meet new customers in your area.
            </div>
            <p class="mb-4">Sign up to start growing your business.</p>
            <div>
                <v-btn variant="elevated" color="blue-darken-1"
                    >Get started</v-btn
                >
            </div>
        </div>
    </div>
</template>
