<script setup>
import usePost from "@/composables/usePost";
import PostItem from "./PostItem.vue";
import { onMounted, ref } from "vue";
import { useIntersectionObserver } from "@vueuse/core";

const { posts, fetchPosts, fetchNextPosts, page } = usePost();
const target = ref(null);

onMounted(async () => {
  await fetchPosts();

  console.log(posts.value);
});

const { stop } = useIntersectionObserver(target, ([{ isIntersecting }]) => {
  if (isIntersecting) {
    fetchNextPosts();
  }
  // targetIsVisible.value = entry?.isIntersecting || false
});
</script>

<template>
  <div class="space-y-8">
    <PostItem v-for="post in posts" :key="post.id" :post="post" />
    <div ref="target"></div>
  </div>
</template>
