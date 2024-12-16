<script setup>
import usePost from "@/composables/usePost";
import PostItem from "./PostItem.vue";
import { onMounted, ref } from "vue";
import { useIntersectionObserver } from "@vueuse/core";
import { usePostStore } from "@/stores/usePostStore";

const postsStore = usePostStore();
const { posts, fetchPosts, fetchNextPosts, page, isLoaded } = usePost();
const target = ref(null);

onMounted(async () => {
  await postsStore.fetchPosts();
});

const { stop } = useIntersectionObserver(target, ([{ isIntersecting }]) => {
  if (isIntersecting && postsStore.isLoaded) {
    postsStore.fetchNextPosts();
  }
});
</script>

<template>
  <div class="space-y-8">
    <PostItem v-for="post in postsStore.posts" :key="post.id" :post="post" />
    <div ref="target" class="-translate-y-20"></div>
  </div>
</template>
