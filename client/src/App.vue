<script setup>
import { onMounted } from "vue";
import { RouterView } from "vue-router";
import Navigation from "./components/Navigation.vue";

onMounted(() => {
  Echo.channel("posts").listen("PostCreated", (e) => {
    console.log(e);
  });
});
</script>

<template>
  <div class="min-h-screen bg-gray-100">
    <Navigation />
    <main>
      <RouterView />
    </main>
  </div>
</template>
