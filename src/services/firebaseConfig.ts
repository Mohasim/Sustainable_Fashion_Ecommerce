// firebaseConfig.ts
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getStorage } from "firebase/storage";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB4racx751jFytbohOQRWrR7YrEHGZXFNU",
  authDomain: "sustainable-fashion-e7b6b.firebaseapp.com",
  projectId: "sustainable-fashion-e7b6b",
  storageBucket: "sustainable-fashion-e7b6b.appspot.com",
  messagingSenderId: "268596164916",
  appId: "1:268596164916:web:d2ed8185512b8f3fc64d61",
  measurementId: "G-GQL84Y8ZWJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const fireStorage =getStorage(app);

export { app, analytics, fireStorage };
