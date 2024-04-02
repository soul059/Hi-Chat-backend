let email;
let password;
const login = document.getElementById("login")
let ulr = "https://hi-chat-t4sd.onrender.com"
// let ulr = "http://localhost:8000"

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
login.addEventListener("click", () => {

  email = document.getElementById("email").value
  password = document.getElementById("password").value
  const data = {
    email,
    password
  }
  

  postData(`${ulr}/api/user/login`, data)
  .then((data) => {
    console.log(data); // JSON data parsed by `data.json()` call

    if (data.statusCode == 200){
      // console.log(data.accassToken)
      // document.cookie = `accessToken=${data.accessToken}; path=/`;
      window.location.href = "./index.html"
    }
  })
  .catch((err)=>{
    console.log(err);
    
  })

})


async function postData(url, data) {
  const response = await fetch(url, {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  });
  console.log(response);
  
if(response.ok){

  return response.json(); // parses JSON response into native JavaScript objects
  
}
else{
  // console.log(response.status);
  error("Wrong password Or user dose not exist")
  throw new Error(response.statusText);
}
}

