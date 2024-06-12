import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { GoogleAuthProvider, getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyAEAB4s96FURm2B5DpCVzbng6oaF-4EX_E',
  authDomain: 'club-ecommerce-clothes.firebaseapp.com',
  projectId: 'club-ecommerce-clothes',
  storageBucket: 'club-ecommerce-clothes.appspot.com',
  messagingSenderId: '62136121407',
  appId: '1:62136121407:web:560211a3158e8c3ef5a08a'
}

export const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
export const auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider()
