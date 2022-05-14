<template>
  <router-view />
</template>

<script>
import { defineComponent } from "vue";
import { useCounterStore } from "stores/counter";

export default defineComponent({
  name: "App",

  setup() {
    const store = useCounterStore();
    return { store };
  },
});
</script>
