import { getAuth, signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword } from "firebase/auth";
import { getDatabase,  ref, set } from "firebase/database";

//логика авторизации и регистрации
export default {
  actions: {
    async register({dispatch, commit},{email, password, name}){
      const auth = getAuth();
      await createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          const db = getDatabase();
          set(ref(db, `users/${user.uid}/info`), {
            bill: 10000,
            name
          });
        })
        .catch((e) => {
          throw e;
        });
    },
    async login({dispatch, commit}, {email, password}){
        const auth = getAuth();
        await signInWithEmailAndPassword(auth, email, password)
          .then((userCredential) =>{
            const user = userCredential.user;
            // console.log(user, dispatch, commit); // ESlint...
          })
          .catch((e) => {
            throw e;
          })
    },
    async logout(){
      const auth = getAuth();
      await signOut(auth).then(() =>{
        //Разлогин успешен

      })
        .catch((e) => {
          throw e;
        });
    }
  }
}
