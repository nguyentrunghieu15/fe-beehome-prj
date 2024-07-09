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
                    >Thuê nhà cung cấp</v-btn
                >
                <v-btn
                    variant="text"
                    size="x-large"
                    color="blue-darken-1"
                    style="font-weight: bold"
                    class="px-0 md:px-6"
                    @click="$emit('onclick-component', 'customer')"
                    >Tìm kiếm khách hàng</v-btn
                >
            </div>
            <div class="mb-8 text-4xl font-extrabold">
                Tìm kiếm khách hàng tiềm năng cho bạn.
            </div>
            <p class="mb-4">Haỹ đăng kí để bắt đầu xây dựng thương hiệu.</p>
            <div>
                <v-btn variant="elevated" color="blue-darken-1"
                    >Bắt đầu</v-btn
                >
            </div>
        </div>
    </div>
</template>
