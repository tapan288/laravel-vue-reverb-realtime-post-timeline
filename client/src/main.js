import "./assets/main.css";
import { echo } from "./plugins/echo";

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

const app = createApp(App);

app.use(router);
app.use(echo);

app.mount("#app");
