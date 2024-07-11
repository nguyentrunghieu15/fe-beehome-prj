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
                    >Quay lại</v-btn
                >
                <p
                    class="flex justify-center font-semibold text-black text-3xl"
                >
                    Vô hiệu hóa thương hiệu
                </p>
            </div>
            <p class="font-semibold text-black">
                Bạn có chắc chắn muốn hủy kích hoạt tài khoản nhà cung cấp của
                mình không?
            </p>
            <p class="mb-2">
                Bạn không thể hủy kích hoạt khi có dự án đang thực hiện ở hiện
                tại. Khi bạn hủy kích hoạt tài khoản của mình, bạn sẽ mất quyền
                truy cập vào tất cả các dự án, thông tin hồ sơ và bất kỳ đánh
                giá nào bạn đã viết hoặc nhận trên BeeHome.
            </p>
            <p class="mb-2">
                Nếu bạn đang đi nghỉ hoặc cần nghỉ ngơi, hãy thử
                <a class="text-sky-500 hover:underline hover:cursor-pointer"
                    >Ẩn doanh nghiệp của tôi</a
                >
                thay vì.
            </p>
            <p class="mb-2">
                Nếu bạn nhận được quá nhiều email từ chúng tôi, bạn có thể
                <a class="text-sky-500 hover:underline hover:cursor-pointer"
                    >thay đổi cài đặt thông báo của bạn</a
                >.
            </p>
            <p class="mb-6">
                Chúng tôi không muốn thấy bạn rời đi. Nếu có bất cứ điều gì
                chúng tôi có thể làm để giúp đỡ, vui lòng truy cập
                <a class="text-sky-500 hover:underline hover:cursor-pointer"
                    >Trung tâm trợ giúp</a
                >.
            </p>
            <InputField label="" :is-required="false"></InputField>
            <p class="mb-2">Lý do hủy kích hoạt tài khoản của bạn (tùy chọn)</p>
            <div class="mb-4">
                <input
                    type="checkbox"
                    class="border border-gray-300 rounded mr-2"
                    v-model="isComfirm"
                />
                <span class="text-black">
                    Tôi xác nhận tôi muốn hủy kích hoạt tài khoản nhà cung cấp
                    của
                    {{ providerStore.providerComputed.value?.name }}
                </span>
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
                    @click="$router.replace({ path: '/pro/profile' })"
                >
                    Cancel
                </button>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import providerService from "@/api/provider";
import InputField from "@/components/base/InputField.vue";
import { useProviderStore } from "@/stores/providerStore";
import { useUserStore } from "@/stores/userStore";
import { ref } from "vue";
import { useRouter } from "vue-router";

const providerStore = useProviderStore();
const router = useRouter();

const isComfirm = ref<boolean>(true);
const onClick = () => {
    providerService
        .deleteProById(providerStore?.providerComputed.value?.id || "")
        .then(() => {
            sessionStorage.clear();
            router.go(0);
        });
};
</script>
