<template>
    <div>
        <div class="mb-4">
            <div class="font-bold mb-2">Tổng quan</div>
            <div class="space-y-0.5 text-gray-600">
                <div>
                    <v-icon class="mr-2" icon="mdi-trophy-outline"></v-icon>
                    <span>Được thuê {{ props.hiredTime }} lần</span>
                </div>
                <div>
                    <v-icon class="mr-2" icon="mdi-map-marker-outline"></v-icon>
                    <span>{{ props.location }}</span>
                </div>
                <div>
                    <v-icon class="mr-2" icon="mdi-account-check"></v-icon>
                    <span>Tài khoản đã được kiêm chứng</span>
                </div>
                <div>
                    <v-icon
                        class="mr-2"
                        icon="mdi-clock-time-eight-outline"
                    ></v-icon>
                    <span>Có {{ props.yearExp }} năm kinh nghiệm</span>
                </div>
                <div>
                    <v-icon
                        class="mr-2"
                        icon=" mdi-account-group-outline"
                    ></v-icon>
                    <span>{{ employee }} nhân viên</span>
                </div>
            </div>
        </div>
        <div>
            <div class="font-bold mb-2">Phương thức thanh toán:</div>
            <div class="space-y-0.5 text-gray-600">
                <p>
                    Nhà cung cấp ưu tiên thanh toán thông qua
                    {{ props.paymentMethods.join(", ") }}.
                </p>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { ref } from "vue";

const props = defineProps<{
    hiredTime?: number;
    location: string;
    yearExp: number;
    paymentMethods: string[];
}>();

const employee = ref(6);
</script>
