import "./assets/main.css";
import { echo } from "./plugins/echo";
import axios from "axios";
import useAuth from "./composables/useAuth";

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";

const { attempt } = useAuth();
const pinia = createPinia();

axios.defaults.baseURL = "http://backend.test";

const app = createApp(App);

app.use(router);
app.use(echo);
app.use(pinia);

attempt().then(() => {
  app.mount("#app");
});
