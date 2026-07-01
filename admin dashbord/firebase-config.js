
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyC5-PIbVJSGruEvP7wtR2-DcdQtofC1TdE",
  authDomain: "hrdashbord.firebaseapp.com",
  projectId: "hrdashbord",
  storageBucket: "hrdashbord.firebasestorage.app",
  messagingSenderId: "682969264211",
  appId: "1:682969264211:web:dea6ee3062b3f1e807d6a6"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };