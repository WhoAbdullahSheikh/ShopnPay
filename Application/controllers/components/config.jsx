// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import {getFirestore} from "firebase/firestore";
import firebase from '@react-native-firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCAneIuC6viFHntMIPWiDVkHwOugqBDnZ4",
  authDomain: "shopnpay-1f1ee.firebaseapp.com",
  projectId: "shopnpay-1f1ee",
  storageBucket: "shopnpay-1f1ee.appspot.com",
  messagingSenderId: "693942396461",
  appId: "1:693942396461:web:be7c0184523dcee3583aa4",
  measurementId: "G-T91V52DWZX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);