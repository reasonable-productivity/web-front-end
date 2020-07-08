import axios from 'axios'

const API_URL = 'http://localhost:8000'

export const state = () => ({
  projects: []
})

export const actions = {
  async getProjects ({ commit }) {
    const { data } = await axios.get(`${API_URL}/projects`)
    commit('setProjects', data)
  }
}

export const mutations = {
  setProjects (state, payload) {
    state.projects = payload
  }
}
