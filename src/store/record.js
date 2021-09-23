import { getDatabase,  ref, set, child, push, onValue, get, query, update} from "firebase/database";
import { getAuth } from "firebase/auth";

export default {
  actions:{
    async createRecord({commit, dispatch}, record){
      try{
        const auth = await getAuth();
        const userId = auth.currentUser.uid;
        const db = getDatabase();

      } catch (e){
        //
        commit('setError', e);
        throw e;
      }
    }
  }
}
