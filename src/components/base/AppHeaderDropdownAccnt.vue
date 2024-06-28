<script setup lang="ts">
import avatar from "@/assets/admin.jpg";
import { ref } from "vue";

const itemsCount = ref<number>(42);
</script>

<template>
    <CDropdown placement="bottom-end" variant="nav-item">
        <CDropdownToggle class="py-0 pe-0" :caret="false">
            <CAvatar :src="avatar" size="md" />
        </CDropdownToggle>
        <CDropdownMenu class="pt-0">
            <CDropdownItem>
                <CIcon icon="cil-lock-locked" /> Logout
            </CDropdownItem>
        </CDropdownMenu>
    </CDropdown>
</template>
