importScripts('https://www.gstatic.com/firebasejs/8.2.7/firebase-app.js')
importScripts('https://www.gstatic.com/firebasejs/8.2.7/firebase-messaging.js')

const firebaseConfig = {
  apiKey: 'AIzaSyD_ZrZc4C00ymbP2LYYmwpGTjg9fif9B5o',
  authDomain: 'ibbil-trans.firebaseapp.com',
  projectId: 'ibbil-trans',
  storageBucket: 'ibbil-trans.appspot.com',
  messagingSenderId: '795173871588',
  appId: '1:795173871588:web:40d6f537f271debfa531f1',
  measurementId: 'G-G5NGW71CYF'
}
// const app = firebase.initializeApp(firebaseConfig)
firebase.initializeApp(firebaseConfig)

// Retrieve firebase messaging
const messaging = firebase.messaging()

messaging.onBackgroundMessage(function (payload) {
  console.log('Received background message ', payload)

  const notificationTitle = payload.notification.title
  const notificationOptions = {
    body: payload.notification.body
  }

  self.registration.showNotification(notificationTitle,
    notificationOptions)
})
// app.messaging().getToken({ vapidKey: 'BJd0e9hbVksQwvFstS4nkapVyHMFMtdqV0Lf2s1nqnSZhp2LjL14S-abrNI9ivR8I33TdSRbAUyUCeDlD5w2gqM' }).then((currentToken) => {
//   console.log('cu')
//   if (currentToken) {
//     console.log('client token', currentToken)
//   } else {
//     console.log('No registration token available. Request permission to generate one.')
//   }
// }).catch((err) => {
//   console.log('An error occurred while retrieving token. ', err)
// })
