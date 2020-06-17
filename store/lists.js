import axios from 'axios'

const API_URL = 'http://localhost:8000'

export const state = {
  lists: []
}

export const actions = {
  async getAllLists ({ commit }) {
    const { data } = await axios.get(`${API_URL}/lists`)
    commit('set', data)
  },
  async postNewList ({ commit }, payload) {
    const { data } = await axios.post(`${API_URL}/lists/`, payload)
    commit('addList', data)
  },
  async patchList ({ commit }, payload) {
    const { data, listId } = payload
    await axios.patch(`${API_URL}/lists/${listId}/`, data)
    commit('editList', payload)
  }
}

export const mutations = {
  set (state, payload) {
    state.lists = payload
  },
  addList (state, payload) {
    state.lists.push(payload)
  },
  editList (state, payload) {
    const index = state.lists.findIndex((list) => {
      return list.id === payload.listId
    })
    const updatedList = {
      ...state.lists[index],
      name: payload.data.name
    }
    state.lists.splice(index, 1, updatedList)
  }
}
