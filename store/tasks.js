import axios from 'axios'

const API_URL = 'http://localhost:8000'

export const state = () => ({
  tasks: []
})

export const actions = {
  async getAllTasks ({ commit }) {
    const { data } = await axios.get(`${API_URL}/tasks/`)
    commit('set', data)
  },
  async postNewTask ({ commit }, payload) {
    const { data } = await axios.post(`${API_URL}/tasks/`, payload)
    commit('add', data)
  },
  async deleteTask ({ commit }, id) {
    await axios.delete(`${API_URL}/tasks/${id}/`)
    commit('remove', id)
  },
  async patchTask ({ commit }, payload) {
    const { id, task } = payload
    await axios.patch(`${API_URL}/tasks/${id}/`, task)
    commit('edit', payload)
  }
}

export const mutations = {
  set (state, tasks) {
    state.tasks = tasks
  },
  add (state, task) {
    state.tasks.push(task)
  },
  edit (state, payload) {
    const { id, task } = payload

    const index = state.tasks.findIndex((task) => {
      return task.id === id
    })
    const updatedTask = {
      ...state.tasks[index],
      ...task
    }
    state.tasks.splice(index, 1, updatedTask)
  },
  remove (state, id) {
    const index = state.tasks.findIndex((task) => {
      return task.id === id
    })
    state.tasks.splice(index, 1)
  }
}
