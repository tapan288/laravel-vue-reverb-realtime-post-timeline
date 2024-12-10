import "./assets/main.css";
import { echo } from "./plugins/echo";
import axios from "axios";
import useAuth from "./composables/useAuth";

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

const { attempt } = useAuth();

axios.defaults.baseURL = "http://backend.test";

const app = createApp(App);

app.use(router);
app.use(echo);

attempt().then(() => {
  app.mount("#app");
});
