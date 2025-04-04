import { getAnalytics } from 'firebase/analytics';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';




const firebaseConfig = {
  apiKey: "AIzaSyCQrUnx38kPyu0O5D-RmyZXiIMh4A5twD8",
  authDomain: "react-form-441fe.firebaseapp.com",
  projectId: "react-form-441fe",
  storageBucket: "react-form-441fe.firebasestorage.app",
  messagingSenderId: "983136913865",
  appId: "1:983136913865:web:92acacff92d0fc4838c018",
  measurementId: "G-SGTSTRB6FX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export {app,auth}