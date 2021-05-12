import firebase from 'firebase/app'
import 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyCmut75ImZDxQevmMq-AP3Ys_KXHnL28Zc',
  authDomain: 'simple-note-app-4fe9c.firebaseapp.com',
  projectId: 'simple-note-app-4fe9c',
  storageBucket: 'simple-note-app-4fe9c.appspot.com',
  messagingSenderId: '473182276559',
  appId: '1:473182276559:web:d1fd4f0cd62792f9fe20ba'
}
// Initialize Firebase
!firebase.apps.length && firebase.initializeApp(firebaseConfig)

export const db = firebase.firestore()
