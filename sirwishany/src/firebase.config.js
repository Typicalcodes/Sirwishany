// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAWGoc2ZSW6GrOAeo72IsmNhFEgOJnMX2Q",
  authDomain: "sirwishany.firebaseapp.com",
  projectId: "sirwishany",
  storageBucket: "sirwishany.appspot.com",
  messagingSenderId: "297131878174",
  appId: "1:297131878174:web:e20516066651cf26518b0f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)