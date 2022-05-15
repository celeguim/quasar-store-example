<template>
  <q-page padding class="flex flex-top">
    <nav>
      <router-link to="/"> Home | </router-link>
      <router-link to="/feed"> Feed | </router-link>
      <router-link to="/register"> Register | </router-link>
      <router-link to="/sign-in"> Login </router-link>

      <button @click="handleSignOut">Logout</button>
    </nav>

    <h4>Feed (Protected Area)</h4>

    <div v-if="store.user">
      <h4>User: {{ store.user.displayName }}</h4>

      <q-avatar>
        <img :src="store.user.photoURL" />
      </q-avatar>
    </div>
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
        console.log("onMounted", user);
        if (user) {
          isLoggedIn.value = true;
          user.value = user;
          store.user = user;
        } else {
          isLoggedIn.value = false;
          router.push("/");
        }
      });
    });

    const handleSignOut = () => {
      signOut(auth).then(() => {
        console.log("handleSignOut");

        isLoggedIn.value = false;
        //store.user = null;
        router.push("/");
      });
    };

    return { isLoggedIn, handleSignOut, store };
  },
};
</script>
