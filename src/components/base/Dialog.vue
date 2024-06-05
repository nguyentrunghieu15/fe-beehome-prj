<template>
    <div v-if="show">
        <div
            class="dialog-overlay"
            @click="
                () => {
                    emit('close');
                }
            "
        ></div>
        <div class="dialog">
            <div
                class="flex justify-between items-center border-b-2 border-slate-100"
            >
                <p class="text-3xl font-bold">{{ label }}</p>
                <v-btn
                    class="absolute top-[-20px] right-[-20px]"
                    variant="text"
                    color="blue-grey-lighten-3"
                    icon="mdi-close-circle-outline"
                    @click="
                        () => {
                            emit('close');
                        }
                    "
                ></v-btn>
            </div>
            <slot />
            <div class="dialog-actions">
                <slot name="actions"> </slot>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
const props = defineProps<{
    label: string;
    show: boolean;
}>();

const emit = defineEmits<{
    close: [];
}>();
</script>
<style scoped>
.dialog-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 100;
}

.dialog {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 5px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    z-index: 120;
}

.dialog-actions {
    display: flex;
    justify-content: flex-end;
    margin-top: 10px;
}
</style>
