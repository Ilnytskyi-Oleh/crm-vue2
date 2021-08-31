import { getAuth, signInWithEmailAndPassword } from "firebase/auth";


//логика авторизации и регистрации
export default {
  actions: {
    async login({dispatch, commit}, {email, password}){
        const auth = getAuth();
        await signInWithEmailAndPassword(auth, email, password)
          .then((userCredential) =>{
            const user = userCredential.user;
            console.log(user, dispatch, commit)
          })
          .catch((e) => {
            throw e;
          })
    }
  }
}
