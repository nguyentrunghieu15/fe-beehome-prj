// Vuetify
import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import "@mdi/font/css/materialdesignicons.css";
import { aliases, mdi } from "vuetify/iconsets/mdi";
import { VCalendar, VCalendarMonthDay } from "vuetify/labs/VCalendar";

export const vuetify = createVuetify({
    components: {
        ...components,
        VCalendar,
        VCalendarMonthDay,
    },
    directives,
    icons: {
        defaultSet: "mdi",
        aliases,
        sets: {
            mdi,
        },
    },
});
