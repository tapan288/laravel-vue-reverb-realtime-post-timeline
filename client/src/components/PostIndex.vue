<script setup>
import usePost from "@/composables/usePost";
import PostItem from "./PostItem.vue";
import { onMounted } from "vue";

const { posts, fetchPosts } = usePost();

onMounted(async () => {
  await fetchPosts();

  console.log(posts.value);
});
</script>

<template>
  <div class="space-y-8">
    <PostItem v-for="post in posts.data" :key="post.id" :post="post" />
  </div>
</template>
