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
        const response = await axios.post("api/posts", formData, {
          headers: {
            "X-Socket-Id": Echo.socketId(),
          },
        });

        this.pushPost(response.data.data);

        return response;
      } catch (error) {
        if (error.response.status === 422) {
          this.errors = error.response.data.errors;
        }
      }
    },
    async updatePost(postId, formData) {
      try {
        const response = await axios.put(`api/posts/${postId}`, formData, {
          headers: {
            "X-Socket-Id": Echo.socketId(),
          },
        });

        this.syncPost(response.data.data);

        return response;
      } catch (error) {
        if (error.response.status === 422) {
          this.errors = error.response.data.errors;
        }
      }
    },
    pushPost(post) {
      this.posts.pop();
      if (this.posts.find((item) => item.id == post.id)) {
        return;
      }

      this.posts = [post, ...this.posts];
    },
    syncPost(post) {
      this.posts.find((item) => item.id == post.id).body = post.body;
    },

    async deletePost(postId) {
      try {
        const response = await axios.delete(`api/posts/${postId}`);

        this.removePostFromStore(postId);
      } catch (error) {
        console.error(error);
      }
    },
    removePostFromStore(postId) {
      this.posts = this.posts.filter((post) => post.id !== postId);
    },
  },
});
