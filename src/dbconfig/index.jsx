import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCOwO1cR1tWkWY9VCycq5_XDyZG0tEh4FA",
  authDomain: "attendance-eb666.firebaseapp.com",
  databaseURL: "https://attendance-eb666-default-rtdb.firebaseio.com",
  projectId: "attendance-eb666",
  storageBucket: "attendance-eb666.firebasestorage.app",
  messagingSenderId: "684430422762",
  appId: "1:684430422762:web:4c5f0df010fafdb9f71d93"
};

// Initialize Firebase
const dbconfig = initializeApp(firebaseConfig);

export default dbconfig;