import { createStore } from 'vuex'
import axios from 'axios'
axios.defaults.withCredentials = true;
const baseUrl = 'http://localhost:8082'

export default createStore({
  state: {
    friends:null,
    loggedIn:false
  },
  getters: {
  },
  mutations: {
    setFriends(state,payload) {
      state.friends = payload
    },
    setLogged(state,payload){
      state.loggedIn = payload
    }
  },
  actions: {
    async addFriend(a,newfriend){
      await axios.post(baseUrl+'/friends',newfriend)
      window.location.reload()
    },

    async getFriends({commit}){
      let {data} = await axios.get(baseUrl+'/friends')
      console.log(data);
      commit('setFriends', data)
      
    },

    async deleteFriend({commit},name){
      console.log(name)
      await axios.delete(baseUrl+'/friends/'+name)
      window.location.reload()
    },
    async editFriend({commit},update){
    await axios.post(baseUrl+'/friends/'+ update.id)
    window.location.reload()
    },
    async registerUser({commit}, newUser){
      console.log(newUser);
      let {data} = await axios.post(baseUrl+'/users',newUser)
      alert(data.msg)
      window.location.reload()
     },
     async loginUser({commit}, user){
      // console.log(user);
      let {data} = await axios.post(baseUrl+'/login',user)
      alert(data.msg)
      commit('setLogged',true)
      // window.location.reload()
     }
  },
  modules: {
    
  },
})
