<template>
    <div>
        <h1 class="text-bold font-bold text-2xl mb-4">Related service</h1>
        <SingleSelected
            v-for="g in groups"
            :label="g.name"
            :is-required="false"
            :list="g.data"
            :max-length="7"
            @update:model-value="onSelect"
        ></SingleSelected>
    </div>
</template>
<script setup lang="ts">
import groupServiceManagerService from "@/api/group-services";
import serviceManagerService from "@/api/service";
import SingleSelected from "@/components/base/SingleSelected.vue";
import type { SingleSelectedItem } from "@/components/base/constants";
import { onMounted, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";

interface GroupService {
    name: string;
    data: SingleSelectedItem[];
}
const route = useRoute();
const router = useRouter();

const groups = ref<GroupService[]>([]);

async function loadData() {
    groups.value = [];
    const nameParam = route.query.name?.toString();
    if (!nameParam) return;
    try {
        const groupFecthed: string[] = [];
        const listSameService =
            await serviceManagerService.fulltextSearchServices(nameParam);
        listSameService.services.forEach((e) => {
            groupServiceManagerService.getGroupService(e.groupId).then((g) => {
                if (groupFecthed.includes(g.id)) return;
                groupFecthed.push(g.id);
                groups.value.push({
                    name: g.name,
                    data: g.services.map((s) => {
                        return {
                            id: s.id,
                            label: s.name,
                            value: s.name as any,
                        };
                    }),
                });
            });
        });
    } catch (error) {}
}

onMounted(() => {
    loadData();
});
watch(
    () => route.query.name,
    (newName, oldName) => {
        loadData();
    }
);

function onSelect(value: string) {
    router.replace({
        name: "view-results",
        query: {
            name: value,
            zipcode: route.query.zipcode,
        },
    });
}
</script>
