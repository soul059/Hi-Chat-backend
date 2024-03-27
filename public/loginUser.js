let email;
let password;
const errmass = document.getElementById("err")
const login = document.getElementById("login")
// let ulr = "https://hi-chat-t4sd.onrender.com"
let ulr = "http://localhost:8000"
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
      window.location.href = "./try.html"
    }
  })
  .catch((err)=>{
    console.log(err);
    
  })

})


async function postData(url, data) {
  const response = await fetch(url, {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, *cors, same-origin
    cache: "default", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: "manual", // manual, *follow, error
    referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  });
  console.log(response);
  
if(response.ok){

  return response.json(); // parses JSON response into native JavaScript objects
  
}
else{
  // console.log(response.status);
  errmass.innerText = "Wrong password Or user dose not exist";
  throw new Error(response.statusText);
}
}

