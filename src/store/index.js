import { reactive } from 'vue'

const store = ({
  state: reactive({
    count: null,
    isAuthenticated: false,
    email: null,
    token: null
  }),
  getters: {
    getCount() {
      return store.state.count
    },
    getIsAuthenticated() {
      return store.state.isAuthenticated
    }
  },
  mutations: {
    incrementCount() {
      store.state.count++
    },
    saveLogin(email, token){
      store.state.email = email
      store.state.token = token
      store.state.isAuthenticated = true
    },
    clearLogin(){
      store.state.email = undefined
      store.state.token = undefined
      store.state.isAuthenticated = false
    }
  },
  actions: {
    initializeCount() {
      store.state.count = 0
    }
  }
})

export default store