import { getDatabase,  ref, set, child, push, onValue, get, query, update} from "firebase/database";
import { getAuth } from "firebase/auth";


export default {
  actions:{
    async fetchCategories({commit}){
      try{
        const auth = getAuth();
        const userId = auth.currentUser.uid;

        const dbRef = ref(getDatabase());
        return await get(child(dbRef, 'users/' + userId + '/categories')).then((snapshot) => {
          if (snapshot.exists()) {
            let obj =   snapshot.val() || {};

            //магия JS
            return Object.keys(obj).map(key => ({...obj[key], id: key}));
          } else {
            console.log("No data available");
          }
        }).catch((error) => {
          console.error(error);
        });
      } catch (e){
        commit('setError', e);
        throw e;
      }
    },
    async updateCategory({commit, dispatch}, {title, limit, id}){
      const auth =  getAuth();
      const userId = auth.currentUser.uid;
      const db = getDatabase();
      const updates = {};
      updates[`users/${userId}/categories/${id}`] = {title, limit};
      return await update(ref(db), updates);

    },
    async createCategory({commit, dispatch},{title, limit}){
      try{
        const auth = await getAuth();
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
    },
  }
}
