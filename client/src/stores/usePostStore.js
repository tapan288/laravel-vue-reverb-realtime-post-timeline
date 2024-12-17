import axios from "axios";
import { defineStore } from "pinia";

export const usePostStore = defineStore("counter", {
  state: () => ({
    page: 1,
    posts: [],
    isLoaded: false,
    errors: {},
  }),
  actions: {
    async fetchPosts(pageNumber = 1) {
      try {
        let response = await axios.get(`api/posts?page=${pageNumber}`);

        this.posts = [...this.posts, ...response.data.data];
        this.page = response.data.meta.current_page;
        this.isLoaded = true;
      } catch (error) {
        console.error(error);
      }
    },
    async fetchNextPosts() {
      try {
        this.fetchPosts(this.page + 1);
      } catch (error) {
        console.log(error);
      }
    },
    async storePost(formData) {
      try {
        const response = await axios.post("api/posts", formData);

        this.pushPost(response.data.data);

        return response;
      } catch (error) {
        if (error.response.status === 422) {
          this.errors = error.response.data.errors;
        }
      }
    },
    pushPost(post) {
      if (this.posts.find((item) => item.id == post.id)) {
        return;
      }

      this.posts = [post, ...this.posts];
    },
  },
});
