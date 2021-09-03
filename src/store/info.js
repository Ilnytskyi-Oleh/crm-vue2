import { getDatabase,ref,onValue} from "firebase/database";
import { getAuth } from "firebase/auth";

export default {
  state: {
    info: {}
  },
  mutations: {
    setInfo(state, info){
      state.info = info;
    },
    clearInfo(state){
      state.info = {} // удаляем инфо при logout
    },
  },
  actions: {
    async fetchInfo({dispatch, commit}, ) {
      try{
        const db = getDatabase();
        const auth = getAuth();
        const userId = auth.currentUser.uid;

        const starCountRef = ref(db, `users/${userId}/info`);
        onValue(starCountRef, (snapshot) => {
          const info = snapshot.val();
          commit('setInfo', info)
        });
      } catch (e){
        throw e;
      }
    }
  },
  getters: {
    info: s => s.info,
  }
}
