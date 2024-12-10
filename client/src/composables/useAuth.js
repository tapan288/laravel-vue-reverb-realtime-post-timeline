import { computed, reactive } from "vue";
import axios from "axios";

const state = reactive({
  authenticated: false,
  user: {},
});

export default function useAuth() {
  const authenticated = computed(() => state.authenticated);

  const user = computed(() => state.user);

  const setAuthenticated = (value) => {
    state.authenticated = value;
  };

  const setUser = (user) => {
    state.user = user;
  };

  const login = async (credentials) => {
    await axios.get("/sanctum/csrf-cookie");
    try {
      await axios.post("/login", credentials).then((response) => {
        // console.log(response);
      });
    } catch (error) {
      console.error(error);
    }
  };

  return { authenticated, user, login };
}
