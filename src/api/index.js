import { db } from './firebase'
import { collection, query, where, getDocs, addDoc } from 'firebase/firestore'

const boardsRef = collection(db, 'boards')
const listsRef = collection(db, 'lists')
const tasksRef = collection(db, 'tasks')

export default {
  async getBoardsByUser (userId) {
    const request = query(boardsRef, where('owner', '==', userId))
    const data = await getDocs(request)

    const response = []
    data.forEach((doc) => {
      const dat = doc.data()
      response.push({
        id: doc.id,
        name: dat.name,
        owner: dat.owner
      })
    })

    return response
  },
  async postBoard (name, owner = 1) {
    const board = { name, owner }
    const docRef = await addDoc(boardsRef, board)
    Object.assign(board, { id: docRef.id })

    return board
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
