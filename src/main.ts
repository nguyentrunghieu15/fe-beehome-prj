import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";

import "./index.css";
import router from "./router";
import { vuetify } from "./plugins/vuetify";

import CoreuiVue from "@coreui/vue";
import CIcon from "@coreui/icons-vue";

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(vuetify);

app.use(CoreuiVue);
// app.component("CIcon", CIcon);

app.mount("#app");
