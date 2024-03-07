// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDA93cCFbeJ094X33-XhnBX1oUVwB4UfgM",
  authDomain: "pet-keeper-5a7de.firebaseapp.com",
  databaseURL: "https://pet-keeper-5a7de-default-rtdb.firebaseio.com",
  projectId: "pet-keeper-5a7de",
  storageBucket: "pet-keeper-5a7de.appspot.com",
  messagingSenderId: "335721411584",
  appId: "1:335721411584:web:f070760a62361cf90ed4e5",
  measurementId: "G-X87PR89VF8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export default app;
export {database};