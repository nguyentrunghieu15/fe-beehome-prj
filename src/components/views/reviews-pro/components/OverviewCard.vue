<template>
    <div>
        <div class="mb-4">
            <div class="font-bold mb-2">Overviews</div>
            <div class="space-y-0.5 text-gray-600">
                <div>
                    <v-icon class="mr-2" icon="mdi-trophy-outline"></v-icon>
                    <span>Hired {{ props.hiredTime }} times</span>
                </div>
                <div>
                    <v-icon class="mr-2" icon="mdi-map-marker-outline"></v-icon>
                    <span>{{ props.location }}</span>
                </div>
                <div>
                    <v-icon class="mr-2" icon="mdi-account-check"></v-icon>
                    <span>Background checked</span>
                </div>
                <div>
                    <v-icon
                        class="mr-2"
                        icon="mdi-clock-time-eight-outline"
                    ></v-icon>
                    <span>{{ props.yearExp }} years in business</span>
                </div>
                <div>
                    <v-icon
                        class="mr-2"
                        icon=" mdi-account-group-outline"
                    ></v-icon>
                    <span>{{ employee }} employees</span>
                </div>
            </div>
        </div>
        <div>
            <div class="font-bold mb-2">Payment methods</div>
            <div class="space-y-0.5 text-gray-600">
                <p>
                    This pro accepts payments via
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
