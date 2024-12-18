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

const form = reactive({
  body: props.post.body,
});

const submit = async () => {
  await postsStore.storePost(form).then(() => {
    form.body = "";
  });
};
</script>

<template>
  <form class="space-y-2" @submit.prevent="submit">
    <div>
      <label for="body" class="sr-only">Post body</label>
      <TextArea
        rows="2"
        class="w-full h-28 p-4 mt-1 block mb-2"
        v-model="form.body"
        placeholder="What do you want to say?"
      />
      <p
        v-if="postsStore.errors.body"
        class="mt-2 text-sm text-red-600"
        id="email-error"
      >
        {{ postsStore.errors.body[0] }}
      </p>
    </div>
    <div class="flex items-center space-x-2">
      <PrimaryButton>Update</PrimaryButton>
      <button type="button" @click="$emit('edit-cancel')">Cancel</button>
    </div>
  </form>
</template>
