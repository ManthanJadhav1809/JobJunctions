// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import{getFirestore} from"firebase/firestore";
import{getAuth}from"firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDJ2TDtjPHTFIblbgfNkULp8F24-Mx3pFw",
  authDomain: "job-junction-by-mj.firebaseapp.com",
  projectId: "job-junction-by-mj",
  storageBucket: "job-junction-by-mj.appspot.com",
  messagingSenderId: "553535831568",
  appId: "1:553535831568:web:b1db6862f07ba318e71495",
  measurementId: "G-FBW014CV18"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const db=getFirestore(app);
export const auth=getAuth(app);