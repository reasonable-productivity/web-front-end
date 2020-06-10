export const state = () => ({
  list: [{ text: 'Test', done: false }]
})

export const actions = {}

export const mutations = {
  add (state, text) {
    state.list.push({
      text,
      done: false
    })
  },
  edit (state, payload) {
    const { index, text } = payload
    const updatedTask = {
      ...state.list[index],
      text
    }
    state.list.splice(index, 1, updatedTask)
  },
  remove (state, index) {
    state.list.splice(index, 1)
  },
  toggle (state, todo) {
    todo.done = !todo.done
  }
}
