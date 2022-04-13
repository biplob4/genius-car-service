// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyARW4xmsxbO3Bbqu6ZT9YZAAkuVPctTgy8",
  authDomain: "genius-car-service-67302.firebaseapp.com",
  projectId: "genius-car-service-67302",
  storageBucket: "genius-car-service-67302.appspot.com",
  messagingSenderId: "598852588418",
  appId: "1:598852588418:web:a4d8f2ceca07b48884f59b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export default auth;
