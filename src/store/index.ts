import { createStore } from 'vuex'
import allUserModule from './modules/alluser-store/allUser'
import loginModule from './modules/login-store/login'

const store = createStore({
  modules: {
    loginModule,
    allUserModule,
  },
})

export default store
