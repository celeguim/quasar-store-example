<template>
  <q-page padding>
    <h5 class="text-center">Sign In</h5>
    <q-input v-model="email" label="Email" type="email" />
    <q-input v-model="password" label="Password" type="password" />
    <p v-if="errMsg">{{ errMsg }}</p>

    <p><q-btn @click="login" label="Login" /></p>
    <q-btn @click="signInWithGoogle" label="Sign in with Google" />
  </q-page>
</template>

<script>
import { useCounterStore } from "stores/counter";
import { useRouter } from "vue-router";
import { defineComponent, ref } from "vue";

const user = ref(null);

import {
  getAuth,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";

import { setDoc, doc } from "firebase/firestore/lite";
import useFirebase from "boot/firebaseConnection";

const email = ref("");
const password = ref("");
const errMsg = ref("");

export default defineComponent({
  name: "SignInPage",

  setup() {
    const store = useCounterStore();
    const router = useRouter();
    const firebase = useFirebase();

    const login = () => {
      const auth = getAuth();
      auth.languageCode = "pt-BR";

      // need .value because of ref()
      signInWithEmailAndPassword(auth, email.value, password.value)
        // we have a Promise here, so we need to use .then()
        .then((data) => {
          console.log("register.data", data);
          console.log("register.auth.currentUser", auth.currentUser);
          console.log("Success login");
          store.user = auth.currentUser;

          const userRef = doc(firebase.firebaseDb, "users", "Luiz");
          const setdoc = setDoc(userRef, { name: "Luiz" }, { online: true });
          console.log("setDoc", setdoc);

          router.push("feed");
        })
        .catch((error) => {
          console.log("register.error", error);
          alert(error.message);

          switch (error.code) {
            case "auth/user-not-found":
              errMsg.value = "User not found";
              break;
            case "auth/wrong-password":
              errMsg.value = "Wrong password";
              break;
            default:
              errMsg.value = error.message;
          }
        });
    };

    const signInWithGoogle = () => {
      const provider = new GoogleAuthProvider();
      const auth = getAuth();
      auth.languageCode = "pt-BR";
      signInWithPopup(auth, provider)
        .then((result) => {
          console.log("signInWithGoogle.result", result);
          console.log("signInWithGoogle.auth.currentUser", auth.currentUser);

          user.value = auth.currentUser;
          store.user = auth.currentUser;

          console.log("user", user);
          const userRef = doc(firebase.firebaseDb, "users", user.value.uid);
          const setdoc = setDoc(userRef, {
            name: user.value.displayName,
            phone: user.value.phoneNumber,
            photo: user.value.photoURL,
            online: true,
          });
          console.log("setDoc", setdoc);

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
      login,
      signInWithGoogle,
      errMsg,
    };
  },
});
</script>
