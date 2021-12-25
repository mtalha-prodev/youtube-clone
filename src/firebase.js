import firebase from "firebase/compat/app";
import "firebase/compat/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA0I2223cfD2EWLebSKH8E6Ibo4fDEYIpM",
  authDomain: "youtub-clone-1.firebaseapp.com",
  projectId: "youtub-clone-1",
  storageBucket: "youtub-clone-1.appspot.com",
  messagingSenderId: "967992115296",
  appId: "1:967992115296:web:72148846d6df5a9eb08305",
};

firebase.initializeApp(firebaseConfig);

export default firebase.auth();
