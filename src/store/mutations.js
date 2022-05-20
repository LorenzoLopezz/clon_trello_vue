import Vue from 'vue'
import * as types from './mutations-types'

export default {
  // Fetch de los paneles creados por el usuario
  [types.FETCH_BOARDS_REQUEST] (state) {
    state.fetchingData = true
    state.error = null
  },
  [types.FETCH_BOARDS_SUCCESS] (state, { boards }) {
    state.fetchingData = false
    state.error = null
    state.boards = { ...boards }
  },
  [types.FETCH_BOARDS_FAILURE] (state, { error }) {
    state.fetchingData = false
    state.error = error
  },
  // Fetch de las listas de un determinado panel
  [types.FETCH_LIST_REQUEST] (state) {
    state.fetchingData = true
    state.error = null
  },
  [types.FETCH_LIST_SUCCESS] (state, { list }) {
    state.fetchingData = true
    state.error = null
    state.list = { ...list }
  },
  [types.FETCH_LIST_FAILURE] (state, { error }) {
    state.fetchingData = false
    state.error = error
  },
  // Fetch de las tareas de determinada lista
  [types.FETCH_TASKS_REQUEST] (state) {
    state.fetchingData = true
    state.error = null
  },
  [types.FETCH_TASKS_SUCCESS] (state, { tasks }) {
    state.fetchingData = true
    state.error = null
    state.tasks = { ...tasks }
  },
  [types.FETCH_TASKS_FAILURE] (state, { error }) {
    state.fetchingData = false
    state.error = error
  },
  // Crear nuevo panel
  [types.ADD_BOARD] (state, { board }) {
    Vue.set(state.boards, board.id, board)
  },
  // Crear nueva lista
  [types.ADD_COLUMN] (state, { column }) {
    Vue.set(state.lists, column.id, column)
  },
  // Crear nueva tarea a lista
  [types.ADD_TASK] (state, { task }) {
    Vue.set(state.tasks, task.id, task)
  },
  // Borrar una tarea
  [types.DELETE_TASK] (state, { taskId }) {
    state.tasks = Object.values(state.tasks)
      .filter(task => task.id !== taskId)
  },
  [types.MARK_AS_COMPLETED] (state, { task }) {
    task.completed = !task.completed
  }
}
