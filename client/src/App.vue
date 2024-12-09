<script setup>
import { onMounted } from "vue";
import { RouterView } from "vue-router";

onMounted(() => {
  Echo.channel("posts").listen("PostCreated", (e) => {
    console.log(e);
  });
});
</script>

<template>
  <RouterView />
</template>
