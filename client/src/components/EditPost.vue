<script setup>
import { reactive, ref } from "vue";
import PrimaryButton from "./PrimaryButton.vue";
import TextArea from "./TextArea.vue";
import { usePostStore } from "@/stores/usePostStore";

const props = defineProps({
  post: {
    type: Object,
    required: true,
  },
});

const postsStore = usePostStore();
const emit = defineEmits();

const form = reactive({
  body: props.post.body,
});

const updatePost = async () => {
  const response = await postsStore.updatePost(props.post.id, form);

  if (response.status == 200) {
    emit("edit-cancel");
  }
};
</script>

<template>
  <form class="space-y-2" @submit.prevent="updatePost">
    <div>
      <label for="body" class="sr-only">Post body</label>
      <TextArea
        rows="2"
        class="w-full h-28 p-4 mt-1 block mb-2"
        v-model="form.body"
        placeholder="What do you want to say?"
      />
      <p
        v-if="postsStore.updateErrors.body"
        class="mt-2 text-sm text-red-600"
        id="email-error"
      >
        {{ postsStore.updateErrors.body[0] }}
      </p>
    </div>
    <div class="flex items-center space-x-2">
      <PrimaryButton>Update</PrimaryButton>
      <button type="button" @click="$emit('edit-cancel')">Cancel</button>
    </div>
  </form>
</template>
