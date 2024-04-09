
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyBVF9w3VJvDIb0tYggiQvo3xBsir1S2WU0",
  authDomain: "chatapps-2024.firebaseapp.com",
  projectId: "chatapps-2024",
  storageBucket: "chatapps-2024.appspot.com",
  messagingSenderId: "455654840792",
  appId: "1:455654840792:web:4bf2eebd5e38783d08faad"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export {auth, app}








// import { initializeApp } from "firebase/app";
//  import * as firebase from 'firebase';
// import '@firebase/firestore'




// const app = initializeApp(config);
//  firebase.initializedApp(config);
//  export const db = firebase.firestore();


// Initialize Firebase
