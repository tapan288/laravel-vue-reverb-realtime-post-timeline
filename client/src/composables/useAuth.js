import { computed, reactive } from "vue";

const state = reactive({
  name: "John Doe",
});

export default function useAuth() {
  const getName = computed(() => state.name);

  const setName = (name) => {
    state.name = name;
  };

  return { getName, setName };
}
