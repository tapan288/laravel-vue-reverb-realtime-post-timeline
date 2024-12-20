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

const channel = Echo.channel("posts." + props.post.id);

channel.listen("PostLiked", (post) => {
  postsStore.updateLikes(post);
});

const deletePost = () => {
  if (confirm("Are you sure you want to delete this post?")) {
    postsStore.deletePost(props.post.id);
  }
};

const likePost = async () => {
  await postsStore.likePost(props.post.id);
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
      <div class="shrink-0 flex items-start self-stretch">
        <button
          class="py-1 px-3 flex items-center bg-slate-100 rounded-lg"
          @click="likePost"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="size-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
            />
          </svg>
          <span class="ml-1"> {{ post.likes }} </span>
        </button>
      </div>
    </div>
  </div>
</template>
