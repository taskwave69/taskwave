import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth";

import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBegCBtPOGlTK0nF6zjGgoX7VJZ2afstcE",
  authDomain: "taskwave-e6e6e.firebaseapp.com",
  projectId: "taskwave-e6e6e",
  storageBucket: "taskwave-e6e6e.firebasestorage.app",
  messagingSenderId: "846147808382",
  appId: "1:846147808382:web:5511ecac57849f935c7c2f",
  measurementId: "G-BJVPGR9S4Z"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const db = getFirestore(app);