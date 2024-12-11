<script setup>
import Header from "@/components/Header.vue";
import PostIndex from "@/components/PostIndex.vue";

//
</script>

<template>
  <Header title="Home" />

  <div class="py-12">
    <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
      <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg">
        <div class="p-6 text-gray-900">
          <PostIndex />
        </div>
      </div>
    </div>
  </div>
</template>
