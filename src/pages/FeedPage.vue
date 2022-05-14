<template>
  <q-page padding class="flex flex-top">
    <nav>
      <router-link to="/"> Home | </router-link>
      <router-link to="/feed"> Feed | </router-link>
      <router-link to="/register"> Register | </router-link>
      <router-link to="/sign-in"> Login | </router-link>

      <button @click="handleSignOut">Logout</button>
    </nav>

    <h4>Feed (Protected Area)</h4>
  </q-page>
</template>

<script>
import { onMounted, ref } from "vue";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { useRouter } from "vue-router";
import { useCounterStore } from "stores/counter";

const isLoggedIn = ref(false);

export default {
  setup() {
    const router = useRouter();
    const auth = getAuth();
    const store = useCounterStore();

    onMounted(() => {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          isLoggedIn.value = true;
        } else {
          isLoggedIn.value = false;
        }
      });
    });

    const handleSignOut = () => {
      signOut(auth).then(() => {
        isLoggedIn.value = false;
        store.user = null;
        router.push("/");
      });
    };

    return { isLoggedIn, handleSignOut };
  },
};
</script>
