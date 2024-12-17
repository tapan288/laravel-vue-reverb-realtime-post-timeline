<script setup>
import CreatePost from "@/components/CreatePost.vue";
import Header from "@/components/Header.vue";
import PostIndex from "@/components/PostIndex.vue";
import { usePostStore } from "@/stores/usePostStore";

const postsStore = usePostStore();

const channel = Echo.channel("posts");

channel.listen("PostCreated", (post) => {
  postsStore.pushPost(post);
});
</script>

<template>
  <Header title="Home" />

  <div class="py-12">
    <div class="max-w-4xl mx-auto sm:px-6 lg:px-8">
      <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg">
        <div class="p-6 text-gray-900 space-y-8">
          <CreatePost />
          <PostIndex />
        </div>
      </div>
    </div>
  </div>
</template>
