import { db } from './firebase'
import { collection } from 'firebase/firestore'

const boardsRef = collection(db, 'boards')
const listsRef = collection(db, 'lists')
const tasksRef = collection(db, 'tasks')

export default {
  getBoardsByUser (userId) {
    const query = boardsRef.orderByChild('owner').equalTo(userId)
    return query.once('value')
  },
  postBoard (name, owner = 1) {
    const id = boardsRef.push().key
    const board = { id, name, owner }

    return boardsRef.child(id).set(board)
      .then(() => board)
  },
  getListsFromBoard (boardId) {
    const query = listsRef.orderByChild('board').equalTo(boardId)
    return query.once('value')
  },
  postList (board, name) {
    const id = listsRef.push().key
    const list = { id, name, board }

    return listsRef.child(id).set(list)
      .then(() => list)
  },
  getTasksFromList (listId) {
    const query = tasksRef.orderByChild('list').equalTo(listId)
    return query.once('value')
  },
  postTask (list, title) {
    const id = tasksRef.push().key
    const task = { id, list, title, completed: false }

    return listsRef.child(id).set(task)
      .then(() => task)
  },
  deleteTask (taskId) {
    return tasksRef.child(taskId).remove()
  },
  completedTask (taskId) {
    const query = tasksRef.child(taskId).child('completed')
    return query.once('value')
      .then(snap => snap.val())
      .then(data => query.set(!data))
  }
}
