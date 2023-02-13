import * as firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyABLAQWMD1G3zC_LAFefLCt9h1L1E3AqaU",
    authDomain: "bread-3a570.firebaseapp.com",
    projectId: "bread-3a570",
    storageBucket: "bread-3a570.appspot.com",
    messagingSenderId: "127508606317",
    appId: "1:127508606317:web:7c2fa863ab97091c887e64"
  };
  
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

//   export default firebase;
const db = firebase.firestore();
export { db };
