// ============================================================
// FIREBASE LOGIN
// ============================================================


import { auth } from "./firebase-config.js";

import {
  signInWithEmailAndPassword,
  setPersistence,
  browserLocalPersistence,
  browserSessionPersistence,
  sendPasswordResetEmail,
  onAuthStateChanged
}
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";



// Elements

const form = document.getElementById("loginForm");

const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");

const emailError = document.getElementById("emailError");
const passwordError = document.getElementById("passwordError");

const statusBanner = document.getElementById("statusBanner");

const loginBtn = document.getElementById("loginBtn");
const loginBtnText = document.getElementById("loginBtnText");
const loginSpinner = document.getElementById("loginSpinner");

const togglePassword = document.getElementById("togglePassword");

const rememberCheckbox = document.getElementById("remember");

const forgotPasswordLink =
document.getElementById("forgotPassword");



// Password toggle

if(togglePassword){

togglePassword.addEventListener("click",()=>{

const hidden = passwordInput.type==="password";


passwordInput.type =
hidden ? "text" : "password";


togglePassword.textContent =
hidden ? "HIDE" : "SHOW";


});

}




function isValidEmail(email){

return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

}



function setLoading(state){

loginBtn.disabled = state;

loginSpinner.style.display =
state ? "inline-block" : "none";


loginBtnText.textContent =
state ? "Signing in..." : "Sign In";

}




function showBanner(msg,type="error"){

statusBanner.textContent = msg;

statusBanner.style.display="block";

statusBanner.classList.toggle(
"success",
type==="success"
);

}



function hideBanner(){

statusBanner.style.display="none";

}





// LOGIN


form.addEventListener("submit",async(e)=>{


e.preventDefault();


hideBanner();


emailError.style.display="none";
passwordError.style.display="none";


let error=false;



if(!isValidEmail(emailInput.value.trim())){


emailError.style.display="block";

error=true;

}



if(!passwordInput.value){


passwordError.style.display="block";

error=true;

}



if(error)return;



login(
emailInput.value.trim(),
passwordInput.value,
rememberCheckbox.checked
);


});





async function login(email,password,remember){


setLoading(true);



try{


await setPersistence(
auth,
remember
?
browserLocalPersistence
:
browserSessionPersistence
);



const result =
await signInWithEmailAndPassword(
auth,
email,
password
);



const user=result.user;



const token =
await user.getIdToken();



localStorage.setItem(
"idToken",
token
);



showBanner(
"Login successful. Redirecting...",
"success"
);



setTimeout(()=>{


window.location.href="dashboard.html";


},600);



}

catch(err){


showBanner(
firebaseError(err.code)
);


}


finally{


setLoading(false);


}


}






// PASSWORD RESET


forgotPasswordLink.addEventListener(
"click",
async(e)=>{


e.preventDefault();



const email =
emailInput.value.trim();



if(!isValidEmail(email)){


showBanner(
"Enter a valid email first"
);


return;

}



try{


await sendPasswordResetEmail(
auth,
email
);


showBanner(
"Reset link sent",
"success"
);


}

catch(err){

showBanner(
firebaseError(err.code)
);

}


});






// KEEP TOKEN UPDATED


onAuthStateChanged(
auth,
async(user)=>{


if(user){


const token =
await user.getIdToken(true);


localStorage.setItem(
"idToken",
token
);


}


});






function firebaseError(code){


switch(code){


case "auth/user-disabled":
return "Account disabled";


case "auth/user-not-found":
case "auth/wrong-password":
case "auth/invalid-credential":
return "Incorrect email or password";


case "auth/too-many-requests":
return "Too many attempts. Try later";


case "auth/network-request-failed":
return "Network error";


case "auth/missing-password":
return "Enter password";


default:
return "Login failed. Try again";

}



}