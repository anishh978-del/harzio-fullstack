const API = "http://localhost:5000/api/auth";


// =========================
// 🔐 REGISTER (Node)
// =========================

async function register() {

  const email = document.getElementById("regEmail").value;
  const password = document.getElementById("regPassword").value;


  try {

    const res = await fetch(`${API}/register`, {
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        email,
        password
      })
    });


    const data = await res.json();


    if(res.ok){

      document.getElementById("regResult").innerText =
      "Registered Successfully ✅";


      setTimeout(()=>{
        window.location.href="login.html";
      },1000);


    }else{

      document.getElementById("regResult").innerText =
      data.message;

    }


  }catch(err){

    document.getElementById("regResult").innerText =
    "Server Error ❌";

  }

}



// =========================
// 🔐 LOGIN FIREBASE → JWT
// =========================

window.login = async function(){

try{


const email =
document.getElementById("email").value;


const password =
document.getElementById("password").value;



// Firebase login
const userCred =
await signInWithEmailAndPassword(
auth,
email,
password
);



console.log("Firebase login success");



// Create Node JWT

const response = await fetch(
"http://localhost:5000/api/auth/firebase-login",
{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({

email:userCred.user.email

})

});



const data = await response.json();



localStorage.setItem(
"token",
data.token
);



localStorage.setItem(
"user",
JSON.stringify(userCred.user)
);



alert("Login successful ✅");



window.location.href="../frontend/index.html";



}catch(err){

console.log(err);

document.getElementById("result").innerText =
err.message;

}


}

    