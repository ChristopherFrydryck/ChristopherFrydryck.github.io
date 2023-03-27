import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from "react-router-dom";
import { disableReactDevTools } from '@fvilers/disable-react-devtools';
import reportWebVitals from './reportWebVitals';

import firebase from 'firebase/compat/app';

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

 firebase.initializeApp(firebaseConfig)

 if (process.env.NODE_ENV === 'production') {
  disableReactDevTools();
}


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
