<script setup>
import axios from "axios";
import { reactive } from "vue";
import useAuth from "@/composables/useAuth";

const form = reactive({
  email: "test@example.com",
  password: "password",
});

const { setName } = useAuth();

const login = async () => {
  setName("Some name");
  //   await axios.get("/sanctum/csrf-cookie");
  //   await axios.post("/login", form).then((response) => {
  //     console.log(response);
  //   });
};
</script>

<template>
  <form action="" @submit.prevent="login">
    <input type="email" v-model="form.email" />
    <input type="password" v-model="form.password" />
    <button type="submit">Login</button>
  </form>
</template>
