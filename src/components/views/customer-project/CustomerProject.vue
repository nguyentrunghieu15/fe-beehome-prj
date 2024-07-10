<template>
    <div class="mx-28 flex flex-col items-center justify-center py-16">
        <div class="border-b-[1px] px-16">
            <nav class="relative">
                <ul
                    class="flex justify-center gap-x-8 text-2xl text-neutral-600"
                >
                    <li
                        v-for="(item, idx) in navItems"
                        :key="idx"
                        class="p-4 hover:border-b-2 hover:border-sky-500"
                        @click="onClickNavItem(idx)"
                        :class="{
                            'border-b-4 border-sky-500': curentNavItem === idx,
                        }"
                    >
                        {{ item }}
                    </li>
                </ul>
            </nav>
        </div>
        <div class="mt-16 my-4 flex">
            <router-view v-slot="{ Component }">
                <transition name="slide-fade">
                    <component :is="Component" />
                </transition>
            </router-view>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useUserStore } from "@/stores/userStore";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
const curentNavItem = ref(0);
const navItems = ref([
    "Chờ xác nhận",
    "Đang bắt đầu",
    "Đã hoàn thành",
    // "Đánh giá",
    "Đã Hủy",
]);
const user = useUserStore().userComputed
const router = useRouter();

function onClickNavItem(idx: number) {
    if (curentNavItem.value === idx) return;
    curentNavItem.value = idx;
    switch (idx) {
        case 0:
            router.push({ name: "cus-pendding" });
            break;
        case 1:
            router.push({ name: "cus-started" });
            break;
        case 2:
            router.push({ name: "cus-finished" });
            break;
        // case 3:
        //     router.push({ name: "cus-reviews" });
        //     break;
        case 3:
            router.push({ name: "cus-cancels" });
            break;
        default:
            break;
    }
}
</script>

<style scoped>
/*
  Enter and leave animations can use different
  durations and timing functions.
*/
.slide-fade-enter-active {
    transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
    transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
    transform: translateX(20px);
    opacity: 0;
}
</style>
