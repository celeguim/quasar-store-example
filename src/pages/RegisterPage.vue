<template>
  <q-page padding>
    <h5 class="text-center">Register</h5>
    <q-input v-model="email" label="Email" type="email" />
    <q-input v-model="password" label="Password" type="password" />
    <q-btn @click="register" label="Register" />
    <q-btn @click="signInWithGoogle" label="Sign in with Google" />
  </q-page>
</template>

<script>
import { useRouter } from "vue-router";
import { defineComponent, ref, onMounted } from "vue";
import {
  getAuth,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";

const email = ref("");
const password = ref("");

export default defineComponent({
  name: "RegisterPage",

  setup() {
    const router = useRouter();

    const register = () => {
      const auth = getAuth();
      // need .value because of ref()
      createUserWithEmailAndPassword(auth, email.value, password.value)
        // we have a Promise here, so we need to use .then()
        .then((data) => {
          console.log("register.data", data);
          console.log("register.auth.currentUser", auth.currentUser);
          router.push("feed");
        })
        .catch((error) => {
          console.log("register.error", error);
          alert(error.message);
        });
    };

    const signInWithGoogle = () => {
      const provider = new GoogleAuthProvider();
      signInWithPopup(getAuth(), provider)
        .then((result) => {
          console.log("signInWithGoogle.result", result);
          console.log(
            "signInWithGoogle.auth.currentUser",
            getAuth().currentUser
          );
          router.push("feed");
        })
        .catch((error) => {
          console.log("signInWithGoogle.error", error);
          alert(error.message);
        });
    };

    return {
      email,
      password,
      register,
      signInWithGoogle,
    };
  },
});
</script>
