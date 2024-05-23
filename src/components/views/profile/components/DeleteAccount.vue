<template>
    <div class="w-full flex flex-column items-center mb-15">
        <div class="max-w-4xl p-6 text-gray-600 min-w-96">
            <div class="w-full mt-6 mb-8">
                <v-btn
                    class="text-none justify-self-start"
                    color="blue-lighten-1"
                    variant="text"
                    prepend-icon="mdi-less-than"
                    @click="$router.replace({ path: '/profile' })"
                    >Back</v-btn
                >
                <p
                    class="flex justify-center font-semibold text-black text-3xl"
                >
                    Deactive account
                </p>
            </div>
            <p class="font-semibold text-black">
                Are you sure you want to deactivate your account?
            </p>
            <p class="mb-2">
                When you deactivate your account, you will lose access to all of
                your projects, profile information, and any reviews you've
                written or received on BeeHome.
            </p>
            <p class="mb-2">
                If you're going on a vacation or need a break from leads, try
                <a class="text-sky-500 hover:underline hover:cursor-pointer"
                    >Hide my Business</a
                >
                instead.
            </p>
            <p class="mb-2">
                If you are receiving too many emails from us, then you can
                <a class="text-sky-500 hover:underline hover:cursor-pointer"
                    >change your notification settings</a
                >.
            </p>
            <p class="mb-6">
                We'd hate to see you go. If there's anything we can do to help,
                please visit our
                <a class="text-sky-500 hover:underline hover:cursor-pointer"
                    >Help Center</a
                >.
            </p>
            <InputField label="" :is-required="false"></InputField>
            <p class="mb-2">Reason for deactivating your account (optional)</p>
            <div class="mb-4">
                <input
                    type="checkbox"
                    class="border border-gray-300 rounded mr-2"
                    v-model="isComfirm"
                />
                <span class="text-black"
                    >I confirm I want to deactivate Hiro Nguyen's account</span
                >
            </div>
            <div class="flex">
                <button
                    class="text-white py-2 px-6 text-xl font-bold rounded mr-2"
                    :class="isComfirm ? 'bg-sky-400' : 'bg-sky-800'"
                    :disabled="!isComfirm"
                    @click="onClick"
                >
                    Deactive
                </button>
                <button
                    class="bg-gray-100 border-2 border-gray-400 py-2 px-6 text-xl font-bold rounded"
                    @click="$router.replace({ path: '/profile' })"
                >
                    Cancel
                </button>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import InputField from "@/components/base/InputField.vue";
import { ref } from "vue";

const isComfirm = ref<boolean>(true);
const onClick = () => {
    console.log("YES");
};
</script>
