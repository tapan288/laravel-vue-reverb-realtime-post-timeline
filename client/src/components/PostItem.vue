<script setup>
import useAuth from "@/composables/useAuth";
import { usePostStore } from "@/stores/usePostStore";
import { ref } from "vue";
import EditPost from "./EditPost.vue";

const props = defineProps({
  post: {
    type: Object,
    required: true,
  },
});

const postsStore = usePostStore();
const { user } = useAuth();
const editing = ref(false);

const deletePost = () => {
  if (confirm("Are you sure you want to delete this post?")) {
    postsStore.deletePost(props.post.id);
  }
};
</script>

<template>
  <div class="flex items-start space-x-5 border-b-slate-200 border-b pb-8">
    <div class="shrink-0 w-12">
      <img :src="post.user.avatar" class="w-12 h-12 rounded-full" />
    </div>
    <div class="grow space-y-2">
      <div class="font-bold text-lg">
        #{{ post.user.id }}
        <span class="text-slate-600">{{ post.user.name }}</span>
      </div>
      <p>{{ post.id }}</p>
      <div v-show="!editing" class="space-y-4">
        <div>
          <p>{{ post.body }}</p>
        </div>
        <div class="flex items-center space-x-2">
          <div v-if="user.id == post.user.id">
            <button class="text-indigo-500" @click="editing = true">
              Edit
            </button>
          </div>
          <div v-if="user.id == post.user.id">
            <button class="text-indigo-500" @click="deletePost">Delete</button>
          </div>
        </div>
      </div>
      <EditPost
        v-show="editing"
        :post="post"
        v-on:edit-cancel="editing = false"
      />
    </div>
  </div>
</template>
