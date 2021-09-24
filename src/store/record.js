import { getDatabase,  ref, set, child, push, onValue, get, query, update} from "firebase/database";
import { getAuth } from "firebase/auth";

export default {
  actions:{
    async createRecord({commit, dispatch}, record){
      try{
        const auth = await getAuth();
        const userId = auth.currentUser.uid;
        const db = getDatabase();
        const newRecordKey = push(child(ref(db), `users/${userId}/records`)).key;
        await set(ref(db, `users/${userId}/records/${newRecordKey}`), record);
        return {id:newRecordKey};
      } catch (e){
        //
        commit('setError', e);
        throw e;
      }
    }
  }
}
