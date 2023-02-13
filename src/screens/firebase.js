// import firebase from "firebase/app"
// import 'firebase/auth';
// import 'firebase/firestore';

// import firebase from 'firebase/app';
import * as firebase from 'firebase'
import 'firebase/firestore';


const firebaseConfig = {
    apiKey: "AIzaSyDXmCgmsYlzmFZV5hoq0K7OPk9qjZEtp94",
    authDomain: "shippy-b080f.firebaseapp.com",
    projectId: "shippy-b080f",
    storageBucket: "shippy-b080f.appspot.com",
    messagingSenderId: "742948576886",
    appId: "1:742948576886:web:de07534ec23b87d4700957"
  };
  


//   app = firebase.initializeApp(firebaseConfig);
// let app;
//   if(firebase.apps.lenght === 0){
//      app = firebase.initializeApp(firebaseConfig);
//    }else{
//       app= firebase.app();
      
//   }
//    const db = app.firestore();

  // Initialize Firebase
//   const app = initializeApp(firebaseConfig);
//   const analytics = getAnalytics(app);

//   export default firebase;
// firebase.initializeApp(firebaseConfig);
// export const db = firebase.firestore();
// export {db};
// let app;

//   if(firebase.apps.length === 0) {
//       app = firebase.initializeApp(firebaseConfig);
//   } else {
//       app = firebase.app();
//   }

//   const db = app.firestore();
//   const auth = firebase.auth();

//   export { db };

//   export default db;

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
export { db };

