import { initializeApp } from "https://www.gstatic.com/firebasejs/12.15.0/firebase-app.js";

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup
} from "https://www.gstatic.com/firebasejs/12.15.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyBbNC4rsvEiDtO7TROvB2F_pHmWWl6QObc",
  authDomain: "harzo2.firebaseapp.com",
  projectId: "harzo2",
  storageBucket: "harzo2.firebasestorage.app",
  messagingSenderId: "583358368515",
  appId: "1:583358368515:web:b04ee8bb210c65af983736",
  measurementId: "G-65HW7JSX96"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

const registerBox = document.getElementById("registerBox");
const loginBox = document.getElementById("loginBox");
const dashboardBox = document.getElementById("dashboardBox");

const registerMessage = document.getElementById("registerMessage");
const loginMessage = document.getElementById("loginMessage");
const employeeEmail = document.getElementById("employeeEmail");

window.showLogin = function () {
  registerBox.classList.add("hidden");
  loginBox.classList.remove("hidden");
  dashboardBox.classList.add("hidden");
  clearMessages();
};

window.showRegister = function () {
  loginBox.classList.add("hidden");
  registerBox.classList.remove("hidden");
  dashboardBox.classList.add("hidden");
  clearMessages();
};

function showDashboard(user) {
  window.location.href = "dash.html";
}

function clearMessages() {
  registerMessage.textContent = "";
  loginMessage.textContent = "";
  registerMessage.classList.remove("success");
  loginMessage.classList.remove("success");
}

window.registerUser = async function () {
  const email = document.getElementById("registerEmail").value;
  const password = document.getElementById("registerPassword").value;

  clearMessages();

  try {
    await createUserWithEmailAndPassword(auth, email, password);
    registerMessage.textContent = "Registration successful!";
    registerMessage.classList.add("success");
  } catch (error) {
    registerMessage.textContent = error.message;
  }
};

window.loginUser = async function () {
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  clearMessages();

  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    loginMessage.textContent = "Invalid email or password";
  }
};

window.loginWithGoogle = async function () {
  clearMessages();

  try {
    await signInWithPopup(auth, googleProvider);
  } catch (error) {
    loginMessage.textContent = error.message;
  }
};

window.logoutUser = async function () {
  await signOut(auth);
  showLogin();
};

onAuthStateChanged(auth, function (user) {
  if (user) {
    showDashboard(user);
  } else {
    showLogin();
  }
});