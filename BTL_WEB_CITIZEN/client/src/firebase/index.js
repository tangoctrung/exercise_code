import firebase from 'firebase/app';
import 'firebase/storage';


const firebaseConfig = {
    apiKey: "AIzaSyBX4fgQdBsHDItpaT1ECUwOVWXMTwQBA8A",
    authDomain: "lovedate-6c091.firebaseapp.com",
    projectId: "lovedate-6c091",
    storageBucket: "lovedate-6c091.appspot.com",
    messagingSenderId: "409926423812",
    appId: "1:409926423812:web:3feca4cc6eba6b548b6c51",
    measurementId: "G-Q3CWZ09G5H"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export {
    storage, firebase as default
}