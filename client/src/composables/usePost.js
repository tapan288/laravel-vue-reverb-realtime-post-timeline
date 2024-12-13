import axios from "axios";
import { ref } from "vue";

export default function usePost() {
  const posts = ref([]);
  const page = ref(1);

  const fetchPosts = async (pageNumber = 1) => {
    try {
      let response = await axios.get(`api/posts?page=${pageNumber}`);

      posts.value = [...posts.value, ...response.data.data];
      page.value = response.data.meta.current_page;
    } catch (error) {
      console.error(error);
    }
  };

  const fetchNextPosts = async (pageNumber = 2) => {
    try {
      fetchPosts(page.value + 1);
    } catch (error) {
      console.log(error);
    }
  };

  return { posts, fetchPosts, fetchNextPosts, page };
}
