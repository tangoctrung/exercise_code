// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getStorage, ref } from "firebase/storage";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDyMJz9Dz2qhrR6UlWRQI6Il5-PL7awWj4",
  authDomain: "clinics-b3ea5.firebaseapp.com",
  projectId: "clinics-b3ea5",
  storageBucket: "clinics-b3ea5.appspot.com",
  messagingSenderId: "1046342180029",
  appId: "1:1046342180029:web:26a01509cb67394f5d2bd4",
  measurementId: "G-K41WSXHJM5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const storage = getStorage(app);
const storageRef = ref(storage);

export {
    storage, storageRef
}