import { getDatabase,  ref, set, child, push} from "firebase/database";
import { getAuth } from "firebase/auth";

export default {
  actions:{
    async createCategory({commit, dispatch},{title, limit}){
      try{
        const auth = getAuth();
        const userId = auth.currentUser.uid;
        const db = getDatabase();
        const newCategoryKey = push(child(ref(db), `users/${userId}/categories`)).key;
        await set(ref(db, `users/${userId}/categories/${newCategoryKey}`), {
                title, limit
              });
        return {id:newCategoryKey, title, limit};
      } catch (e){
        commit('setError', e);
        throw e;
      }
    }
  }
}
