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
  <Navigation />
  <div class="py-6 lg:py-12">
    <div class="mx-auto max-w-7xl px-6 lg-px-8">
      <RouterView />
    </div>
  </div>
</template>
