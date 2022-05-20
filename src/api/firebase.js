import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import settings from './settings'

const firebaseApp = initializeApp(settings)
const db = getFirestore(firebaseApp)

export { db, firebaseApp }
