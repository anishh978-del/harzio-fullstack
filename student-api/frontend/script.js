const API = "http://localhost:5000/api/employees";


// 📥 GET EMPLOYEES
async function getEmployees() {

  let res = await fetch(API, {
    headers: {
      "Content-Type": "application/json"
    }
  });

  let data = await res.json();

  let table = "";

  data.forEach(emp => {

    table += `
      <tr>
        <td>${emp.name}</td>
        <td>${emp.email}</td>
        <td>${emp.department}</td>
        <td>${emp.salary}</td>

        <td>

        <button onclick="editEmployee(
          '${emp._id}',
          '${emp.name}',
          '${emp.email}',
          '${emp.department}',
          '${emp.salary}'
        )">
        Edit
        </button>

        <button onclick="deleteEmployee('${emp._id}')">
        Delete
        </button>

        </td>
      </tr>
    `;
  });


  document.getElementById("employeeList").innerHTML = table;

}



// ➕ ADD EMPLOYEE

async function addEmployee() {


  let employee = {

    name: document.getElementById("name").value,

    email: document.getElementById("email").value,

    department: document.getElementById("department").value,

    salary: Number(document.getElementById("salary").value)

  };


  let res = await fetch(API, {

    method:"POST",

    headers:{
      "Content-Type":"application/json"
    },

    body: JSON.stringify(employee)

  });


  let data = await res.json();


  if(!res.ok){

    alert(data.message || "Error adding employee");

    return;
  }


  alert("Employee Added ✅");


  getEmployees();


  document.getElementById("name").value="";
  document.getElementById("email").value="";
  document.getElementById("department").value="";
  document.getElementById("salary").value="";

}



// ✏️ EDIT

function editEmployee(id,n,e,d,s){

  document.getElementById("editId").value=id;

  document.getElementById("editName").value=n;

  document.getElementById("editEmail").value=e;

  document.getElementById("editDepartment").value=d;

  document.getElementById("editSalary").value=s;

}



// 🔄 UPDATE

async function updateEmployee(){


let id = document.getElementById("editId").value;


let employee={

name: document.getElementById("editName").value,

email: document.getElementById("editEmail").value,

department: document.getElementById("editDepartment").value,

salary:Number(document.getElementById("editSalary").value)

};



await fetch(`${API}/${id}`,{

method:"PUT",

headers:{

"Content-Type":"application/json"

},

body:JSON.stringify(employee)

});


alert("Employee Updated ✅");


getEmployees();

}




// ❌ DELETE

async function deleteEmployee(id){


await fetch(`${API}/${id}`,{

method:"DELETE"

});


alert("Employee Deleted ❌");


getEmployees();


}



// LOGOUT

function logout(){

    localStorage.removeItem("user");

    console.log(localStorage.getItem("user"));

    window.location.href="login.html";
}



// START

window.onload=function(){

getEmployees();

};