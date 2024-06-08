<template>
    <div class="flex gap-2 items-center">
        <a :href="link">{{ name }}</a>
        <input
            :value="copyLink"
            :disabled="isDisableEdit"
            :class="[isDisableEdit ? 'text-slate-400' : 'text-slate-700']"
            :id="id"
            @focusout="isDisableEdit = true"
            @keypress.enter="onEdit"
        />
        <v-btn
            icon="mdi-pencil-outline"
            variant="text"
            size="sm"
            color="blue-lighten-1"
            @click="onClickEdit"
        ></v-btn>
        <v-btn
            icon="mdi-trash-can"
            variant="text"
            size="sm"
            color="red-lighten-1"
            @click="isOpenDeletePopup = !isOpenDeletePopup"
        ></v-btn>
        <comfirm-popup
            title="Remove social media"
            :content="'Are you sure delete ' + props.name + ' link'"
            v-model:is-open="isOpenDeletePopup"
            @confirm="onRemove"
        ></comfirm-popup>
    </div>
</template>
<script setup lang="ts">
import { onMounted, ref } from "vue";
import ComfirmPopup from "@/components/base/ComfirmPopup.vue";

const props = defineProps<{
    name: string;
    link: string;
    id: string;
}>();

const isDisableEdit = ref(true);
const isOpenDeletePopup = ref(false);

const copyLink = ref("fa");

onMounted(() => {
    copyLink.value = props.link;
});

function onClickEdit() {
    isDisableEdit.value = false;
    document.getElementById(props.id)?.focus();
}

function onEdit() {
    isDisableEdit.value = true;
    emit("edit", props.id, copyLink.value);
}

const onRemove = (value: boolean) => {
    if (!value) return;
    isDisableEdit.value = true;
    emit("remove", props.id);
};

const emit = defineEmits<{
    remove: [valie: string];
    edit: [id: string, value: string];
}>();
</script>
