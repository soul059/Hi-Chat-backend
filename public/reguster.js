let userName;
let email;
let password;
const errmass = document.getElementById("err")
const submit = document.querySelector("#submit")
let ulrDev = "http://localhost:8000"
let urlPro = "https://hi-chat-t4sd.onrender.com"

// async function getRoom(url, method) {
//   const response = await fetch(url, {
//       method: method,
//       headers: {
//           "Content-Type": "application/json"
//       }

//   })
//   if (response.ok) {

//       return response.json(); // parses JSON response into native JavaScript objects

//   }
//   else {
//       console.log("not");

//   }
// }
// // chack this ones
// (function currentUser(){
//     getRoom("https://hi-chat-t4sd.onrender.com/api","GET")
//     .then((res)=>{
//       window.location.href = "./try.html"
//     })
//     .catch((err)=>{
      
//     })
// })();

submit.addEventListener("click", () => {

  userName = document.getElementById("name").value
  email = document.getElementById("email").value
  password = document.getElementById("password").value
  const data = {
    userName,
    email,
    password
  }

  postData(`${ulrDev}/api/user/reguster`, data)
  .then((data) => {
    // console.log(data); // JSON data parsed by `data.json()` call

    if (data.statusCode == 200){
      window.location.href = "./login.html"
    }
  })

})


async function postData(url = "", data) {
  const response = await fetch(url, {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, *cors, same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: "error", // manual, *follow, error
    referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  });
  // console.log(response);
  
if(response.ok){

  return response.json(); // parses JSON response into native JavaScript objects
  
}
else{
  // console.log(response.statusText);
  errmass.innerText = "This user name or email arady exist";
  
}
}

