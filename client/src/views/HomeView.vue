<script setup>
import { reactive } from "vue";
import useAuth from "@/composables/useAuth";

const form = reactive({
  email: "test@example.com",
  password: "password",
});

const { login: loginAction } = useAuth();

const login = async () => {
  loginAction(form);
};
</script>

<template>
  <form action="" @submit.prevent="login">
    <input type="email" v-model="form.email" />
    <input type="password" v-model="form.password" />
    <button type="submit">Login</button>
  </form>
</template>
