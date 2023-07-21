// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use


// const firebaseConfig = {
//   apiKey: "AIzaSyAWGoc2ZSW6GrOAeo72IsmNhFEgOJnMX2Q",
//   authDomain: "sirwishany.firebaseapp.com",
//   projectId: "sirwishany",
//   storageBucket: "sirwishany.appspot.com",
//   messagingSenderId: "297131878174",
//   appId: "1:297131878174:web:e20516066651cf26518b0f"
// };

const firebaseConfig = {
  apiKey: "AIzaSyBYB416lZ1_HfhCuS0lO4UbR944pvXpNHA",
  authDomain: "shashanksproject-83c44.firebaseapp.com",
  projectId: "shashanksproject-83c44",
  storageBucket: "shashanksproject-83c44.appspot.com",
  messagingSenderId: "208934089156",
  appId: "1:208934089156:web:acbffe1df3bce8577a7491"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)