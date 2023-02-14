// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCTsb4yoS5KFrlQlxbeKacBHon_fDI-qwg",
  authDomain: "christopherfrydryck-website.firebaseapp.com",
  projectId: "christopherfrydryck-website",
  storageBucket: "christopherfrydryck-website.appspot.com",
  messagingSenderId: "492626129952",
  appId: "1:492626129952:web:e8a7fa3c0b64b51863b845",
  measurementId: "G-3XB3PCXCXD"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);