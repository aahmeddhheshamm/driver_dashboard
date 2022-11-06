
import firebase from 'firebase/app'
import 'firebase/firebase-messaging'

// import { getMessaging } from 'firebase/messaging'
//
const firebaseConfig = {
  apiKey: 'AIzaSyD_ZrZc4C00ymbP2LYYmwpGTjg9fif9B5o',
  authDomain: 'ibbil-trans.firebaseapp.com',
  projectId: 'ibbil-trans',
  storageBucket: 'ibbil-trans.appspot.com',
  messagingSenderId: '795173871588',
  appId: '1:795173871588:web:40d6f537f271debfa531f1',
  measurementId: 'G-G5NGW71CYF'
}
//
// // Initialize Firebase
// const app = initializeApp(firebaseConfig)

// const analytics = getAnalytics(app)
firebase.initializeApp(firebaseConfig)
export default firebase.messaging()
