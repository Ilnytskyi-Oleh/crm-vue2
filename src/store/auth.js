import { getAuth, signInWithEmailAndPassword, signOut} from "firebase/auth";


//логика авторизации и регистрации
export default {
  actions: {
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
