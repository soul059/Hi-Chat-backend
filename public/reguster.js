let userName;
let email;
let password;
const submit = document.querySelector("#submit")
// let ulr = "https://hi-chat-t4sd.onrender.com"
let ulr = "http://localhost:8000"

function error(mas){
  let err = document.getElementById("err")
  if (document.getElementById("error")?0:1){
    
    let span = document.createElement("span")
    span.style.color = "red"
    span.id = "error"
    err.appendChild(span)
  }
  let span = document.getElementById("error")
  span.innerText = mas
}


async function getRoom(url, method) {
  const response = await fetch(url, {
      method: method,
      headers: {
          "Content-Type": "application/json"
      }

  })
  if (response.ok) {

      return response.json(); // parses JSON response into native JavaScript objects

  }
  else {
      console.log("not");

  }
}


password = document.getElementById("password")

submit.addEventListener("click", () => {

  userName = document.getElementById("name").value
  email = document.getElementById("email").value
  password = document.getElementById("password").value
  if (!password.match(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)) {
    error("Password must contain at least 8 characters and one number")
    return;
  }
  if (!userName.match(/^[a-zA-Z0-9]{3,}$/)) {
    error("User name must contain at least 3 characters")
    return;
  }
  if (!email.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/)) {
    error("Email must be in the form of name@some.com")
  }
  const data = {
    userName,
    email,
    password
  }

  postData(`${ulr}/api/user/reguster`, data)
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
  error("This user name or email arady exist")
  
}
}

