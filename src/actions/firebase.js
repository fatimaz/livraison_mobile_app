
import * as firebase from 'firebase';

import { initializeApp } from "firebase/app";


 const firebaseConfig = {
  apiKey: "AIzaSyD-2g0lGIYC-Wl1fN0GAo9JnHba7RKvO5w",
  authDomain: "bread-cf812.firebaseapp.com",
  projectId: "bread-cf812",
  storageBucket: "bread-cf812.appspot.com",
  messagingSenderId: "198817572767",
  appId: "1:198817572767:web:2e631a1e02e48bb88bffaa"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;