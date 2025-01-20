// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDCAcgKkMFqW3Y1NpHc8hfX_atNHANeNQQ",
  authDomain: "nossas-memorias-c4e71.firebaseapp.com",
  projectId: "nossas-memorias-c4e71",
  storageBucket: "nossas-memorias-c4e71.firebasestorage.app",
  messagingSenderId: "763696044590",
  appId: "1:763696044590:web:dc70ba0771d3d830725dbf",
  measurementId: "G-NFSY2KQNX3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);