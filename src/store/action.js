import * as types from './mutations-types'
import API from '@/api'

export default {
  // Hacer fetch via AJAX de los paneles del usuario
  fetchBoards ({ commit }, { user }) {
    commit(types.FETCH_BOARDS_REQUEST)

    API.getBoardsByUser(user)
      .then(snap => commit(types.FETCH_BOARDS_SUCCESS, { boards: snap.val }))
      .catch(error => commit(types.FETCH_BOARDS_FAILURE, { error }))
  }

  // Fetch de las listas asociadas a un panel
  }
