import axios from "axios";
import { ref } from "vue";

export default function usePost() {
  const posts = ref({});

  const fetchPosts = async () => {
    try {
      let response = await axios.get("api/posts");

      posts.value = response.data;
    } catch (error) {
      console.error(error);
    }
  };

  return { posts, fetchPosts };
}
