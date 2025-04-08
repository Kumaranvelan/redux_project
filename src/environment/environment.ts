import { getAnalytics } from 'firebase/analytics';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';




const firebaseConfig = {
  apiKey: 'AIzaSyDZMjWC16jamRmlC2uJgjRORN5mZpve48c',
  authDomain: 'kabaddi-scores-staging.firebaseapp.com',
  databaseURL: 'https://kabaddi-scores-staging-default-rtdb.firebaseio.com',
  projectId: 'kabaddi-scores-staging',
  storageBucket: 'kabaddi-scores-staging.appspot.com',
  messagingSenderId: '948649737921',
  appId: '1:948649737921:web:4d89c18192392a2f8fde40',
  measurementId: 'G-VVS0DYX4BC',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const storage = getStorage(app);

export { storage };

export {app,auth}