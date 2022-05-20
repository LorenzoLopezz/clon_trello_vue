import * as types from './mutations-types'
import API from '@/api'

export default {
  // Hacer fetch via AJAX de los paneles del usuario
  fetchBoards ({ commit }, { user }) {
    commit(types.FETCH_BOARDS_REQUEST)

    API.getBoardsByUser(user)
      .then(snap => commit(types.FETCH_BOARDS_SUCCESS, { boards: snap.val }))
      .catch(error => commit(types.FETCH_BOARDS_FAILURE, { error }))
  },

  // Fetch de las listas asociadas a un panel
  fetchLists ({ commit }, { board }) {
    commit(types.FETCH_LIST_REQUEST)

    API.getListsFromBoard(board)
      .then(snap => commit(types.FETCH_LIST_SUCCESS, { lists: snap.val() }))
      .catch(error => commit(types.FETCH_LIST_FAILURE, { error }))
  },

  // Fetch de las tareas de una listas
  fetchTasks ({ commit }, { list }) {
    commit(types.FETCH_TASKS_REQUEST)

    API.getTasksFromList(list)
      .then(snap => commit(types.FETCH_TASKS_SUCCESS, { tasks: snap.val() }))
      .catch(error => commit(types.FETCH_TASKS_FAILURE, { error }))
  },

  // Añadir un nuevo panel
  addBoard ({ commit }, { name }) {
    API.postBoard(name)
      .then(board => commit(types.ADD_BOARD, { board }))
  },

  // Agregando lista
  addColumn ({ commit }, { board, name }) {
    API.postList(board, name)
      .then(column => commit(types.ADD_COLUMN, { column }))
  },

  // Agregar tarea
  addTask ({ commit }, { list, title }) {
    API.postTask(list, title)
      .then(task => commit(types.ADD_TASK, { task }))
  },

  deleteTask ({ commit }, { taskld }) {
    API.deleteTask(taskld)
      .then(() => commit(types.DELETE_TASK, { taskld }))
  },

  markAsCompleted ({ commit }, { task }) {
    API.completedTask(task)
      .then(() => commit(types.MARK_AS_COMPLETED, { task }))
  }
}
