// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBVNmlaVfdjQFrPfilh1Xx65faujI-fcFc",
  authDomain: "ai-trip-planner-436815.firebaseapp.com",
  projectId: "ai-trip-planner-436815",
  storageBucket: "ai-trip-planner-436815.appspot.com",
  messagingSenderId: "264447553585",
  appId: "1:264447553585:web:7ceea909e480f2a19a2510",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
