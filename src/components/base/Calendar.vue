<template>
    <div class="calendar">
        <div class="flex w-full justify-center gap-4">
            <v-btn
                variant="text"
                icon="mdi-chevron-left"
                color="blue-lighten-1"
                @click="prevMonth"
            ></v-btn>
            <p class="text-xl font-bold flex items-center text-slate-800">
                {{ formatDate(currentDate || new Date()) }}
            </p>
            <v-btn
                icon="mdi-chevron-right"
                variant="text"
                color="blue-lighten-1"
                @click="nextMonth"
            ></v-btn>
        </div>
        <div class="calendar-grid">
            <div class="col-span-7 grid grid-cols-7 font-bold text-lg">
                <span class="flex justify-center">Sun</span>
                <span class="flex justify-center">Mon</span>
                <span class="flex justify-center">Tue</span>
                <span class="flex justify-center">Wed</span>
                <span class="flex justify-center">Thu</span>
                <span class="flex justify-center">Fri</span>
                <span class="flex justify-center">Sat</span>
            </div>
            <template v-for="n in days" :key="n.date">
                <div
                    class="calendar-cell min-h-28 border-[1px]"
                    @click="selectDate(n)"
                >
                    <v-btn rounded="xl" variant="text">{{ n.day }}</v-btn>
                    <div
                        v-for="e in n.events"
                        :key="e.id"
                        class="hover:cursor-pointer block px-6 flex items-center gap-2 hover:bg-slate-200 rounded-xl"
                    >
                        <div
                            class="w-2 h-2 rounded-xl bg-orange-500"
                            v-bind:class="getRandomColorClass()"
                        ></div>
                        <button
                            class="rounded-xl px-2 font-bold"
                            @click="emit('clickEvent', e)"
                        >
                            {{ e.name }}
                        </button>
                    </div>
                </div>
            </template>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import type { ICalendarEvent, IDay } from "./constants";
const currentDate = ref<Date>();
const selectedDate = ref<Date>();
const days = ref<IDay[]>([]);

const props = defineProps<{
    events?: ICalendarEvent[];
}>();

const emit = defineEmits<{
    clickEvent: [value: ICalendarEvent];
}>();

const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", { month: "long", year: "numeric" });
};

const getCalendarDays = (month: number, year: number) => {
    const firstDay = new Date(year, month, 1);
    const firstDayWeekday = firstDay.getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const calendarDays: IDay[] = [];

    // Add empty days for the beginning of the week
    for (let i = 0; i < firstDayWeekday; i++) {
        calendarDays.push({});
    }

    // Add days for the current month
    for (let i = 1; i <= daysInMonth; i++) {
        calendarDays.push({
            day: i,
            date: new Date(year, month, i),
            events: props.events?.filter((e) => {
                if (
                    e.from.toDateString() ===
                        new Date(year, month, i).toDateString() ||
                    e.to.toDateString() ===
                        new Date(year, month, i).toDateString()
                ) {
                    return e;
                }
            }),
        });
    }

    // Add empty days for the end of the week
    const remainingDays = 7 - (calendarDays.length % 7);
    for (let i = 0; i < remainingDays; i++) {
        calendarDays.push({});
    }

    return calendarDays;
};

const updateCalendar = () => {
    if (currentDate.value) {
        days.value = getCalendarDays(
            currentDate.value.getMonth(),
            currentDate.value.getFullYear()
        );
    }
};

onMounted(() => {
    currentDate.value = new Date();
    updateCalendar();
});

const prevMonth = () => {
    if (currentDate.value) {
        currentDate.value.setMonth(currentDate.value.getMonth() - 1);
        updateCalendar();
    }
};

const nextMonth = () => {
    if (currentDate.value) {
        currentDate.value.setMonth(currentDate.value.getMonth() + 1);
        updateCalendar();
    }
};

const selectDate = (date: IDay) => {
    if (date) {
        selectedDate.value = date.date;
    }
};

function getRandomColorClass() {
    const colors = ["blue", "indigo", "purple", "cyan", "green", "orange"]; // Allowed colors
    const randomIndex = Math.floor(Math.random() * colors.length);
    return `bg-${colors[randomIndex]}`;
}
</script>

<style scoped>
.calendar {
    display: flex;
    flex-direction: column;
    border: 1px solid #ddd;
    padding: 10px;
    width: 100%;
}

.calendar-grid {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 5px;
}

.calendar-row {
    display: flex;
    justify-content: space-between;
    font-weight: bold;
    width: 100%;
}
</style>
