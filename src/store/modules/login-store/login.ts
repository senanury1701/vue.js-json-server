import axios from '@/configs/axiosConfigs'

interface User {
  user: {
    [key: string]: string | number
  }
  required: true
  accessToken: string | null
}

const state: User = {
  user: JSON.parse(localStorage.getItem('userData')),
  accessToken: localStorage.getItem('accessToken'),
}

const mutations = {
  clearToken(state) {
    state.accessToken = null
    localStorage.removeItem('access_token')
  },

}

const actions = {
  async loginUser({ commit }, loginData: any) {
    try {
      const response = await axios.post('login', loginData)

      if (response && response.data) {
        const token = response.data.accessToken

        const data = {
          name: response.data.user.name,
          lastName: response.data.user.lastName,
          email: response.data.user.email,
          status: response.data.user.status,
        }

        localStorage.setItem('accessToken', JSON.stringify(token))
        localStorage.setItem('userData', JSON.stringify(data))

        return null
      }
    }
    catch (error) {
      console.error(error)
    }
  },
  logout({ commit }) {
    commit('setUser', null)
    commit('clearToken')
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,

}
