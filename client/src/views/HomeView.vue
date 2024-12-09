<script setup>
import axios from "axios";
import { reactive } from "vue";

const form = reactive({
  email: "test@example.com",
  password: "password",
});

const login = async () => {
  await axios.get("/sanctum/csrf-cookie");
  await axios.post("/login", form).then((response) => {
    console.log(response);
  });
};
</script>

<template>
  <form action="" @submit.prevent="login">
    <input type="email" v-model="form.email" />
    <input type="password" v-model="form.password" />
    <button type="submit">Login</button>
  </form>
</template>
