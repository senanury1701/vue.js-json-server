import axios from '@/configs/axiosConfigs'

const state = {

}

const mutations = {

}

const actions = {
  async deleteUser({ commit }, id: number) {
    try {
      const response = await axios.delete(`users/${id}`, {
        method: 'DELETE',
      })

      if (response && response.data)

        return null
    }
    catch (error) {
      console.error(error)
    }
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,

}
