// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-analytics.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-firestore.js";
// TODO: Add SDKs for Firebase products that you want to use

const firebaseConfig = {
    apiKey: "AIzaSyCUU5H69kUI_XNAjACIqY0LcJf6keukXdg",
    authDomain: "ecxogames-2025.firebaseapp.com",
    databaseURL: "https://ecxogames-2025-default-rtdb.firebaseio.com",
    projectId: "ecxogames-2025",
    storageBucket: "ecxogames-2025.firebasestorage.app",
    messagingSenderId: "1094045713542",
    appId: "1:1094045713542:web:58593c6827e557ee8f7d07",
    measurementId: "G-C620XL89B9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

// Export db for use in other modules
export { app, analytics, db };