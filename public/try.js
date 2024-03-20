const body = document.body;
// const Uname = document.getElementById("Uname");

function makeRoom(name, discription, id) {
    const div = document.createElement("div")
    div.classList.add("flex", "flex-col", "gap-2", "w-60", "bg-slate-300", "text-center", "rounded-lg", "h-fit");
    div.innerHTML = `<span>${name}</span>
    <hr>
    <p>${discription}</p>
    <hr>
    <div id="${id}" class="roomb flex flex-row gap-2 items-center justify-center mb-2">
        <button class="bg-[#1da1f2] text-white rounded-lg w-40 p-1 hover:bg-violet-800" >Chat</button>
        <button><img src="delete-svgrepo-com.svg" class="w-8" alt="D"></button>
    </div>`

    const section = document.getElementById("room")
    section.appendChild(div)
    // section.appendChild(div, section.firstChild);
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

// for user name in nav bar

// (function currentUser(){
//     getRoom("https://hi-chat-t4sd.onrender.com/api","GET")
//     .then((res)=>{Uname.innerText = res.userName})
//     .catch((err)=>{
//         alert(err);
//     })
// })();

async function postData(url, data, me) {
    const response = await fetch(url, {
        method: me, // *GET, POST, PUT, DELETE, etc.
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

    if (response.ok) {

        return response.json(); // parses JSON response into native JavaScript objects

    }
    else {
        // console.log(response.status);
        // errmass.innerText = "Wrong password Or user dose not exist";
        console.log("hi");
        
        throw new Error(response.statusText);
    }
}

//for making new massage in chat box

function makeChat(){
    let dee = document.getElementById("room");
    dee.remove();
    dee = document.getElementById("nav");
    dee.remove();
    dee = document.getElementById("creatR")
    dee.remove();
    const nav = document.createElement("nav")
    const section = document.createElement("section");
    const send = document.createElement("section")
    section.classList.add("mt-10","grid","grid-cols-1","gap-5","ml-10","mr-10","massage")
    nav.classList.add("flex","justify-around","flex-row","w-screen")
    send.classList.add("gap-2","justify-center","flex","w-screen","z-10","bottom-4","fixed","send")
    nav.innerHTML =`<div><a href="./try.html" ><img src="back-square-svgrepo-com.svg" alt="Back" class="w-10"></a></div>
    <ul class="flex justify-center items-center">
        <li class="flex items-center">
          <img src="emoji-grin-squint-svgrepo-com.svg" alt="" class="w-8">
          <span>Username</span>
      </li>
      <li class="ml-4"><img src="logout-svgrepo-com.svg" alt="Home" class="w-5 bg-red-200 rounded-lg"></li>
    </ul>`;
    send.innerHTML=`<input type="text" id="text" name="text"  class="ml-10 hover:border-dashed rounded-lg w-full h-10 bg-slate-200 placeholder:text-gray-400 p-1" placeholder=" Massage....">
    <img src="send-svgrepo-com.svg" id="send" class="w-8 mr-10 bg-purple-200 rounded-lg" alt="Send">`
    body.appendChild(nav);
    body.appendChild(section);
    body.appendChild(send);
}
//sendin massage to databace
function sendMassage(roomid){
    const mas = document.querySelector("#text").value;
    console.log(mas);
    console.log("hi");
    if (mas == ""){
        alert("Please write something!");
    }
    else{
        const data = {
            text:mas
        }
        postData(`https://hi-chat-t4sd.onrender.com/api/caht/${roomid}`, data, "POST")
        .then((res)=>{
            senderMassage(res.text,res.ownerName)
        })
    }
    document.querySelector("#text").value = "";
    
}
// sender massage sowcase
function senderMassage(text, user) {
    const section = document.getElementsByClassName("massage")
    const div = document.createElement( 'div' );
    div.classList.add("bg-red-200","justify-self-end","w-fit","rounded-lg","p-1");
    div.innerHTML = `<span class="block w-fit text-xs"> ${user}</span><hr>
    <span>${text}</span>`
    section[0].appendChild(div);
    
}
//resiving massage socase
function recieverMessage(text,user){
    const section = document.getElementsByClassName("massage")
    // console.log(section[0]);
    
    const div = document.createElement( 'div' );
    div.classList.add("bg-red-200","justify-self-start","w-fit","rounded-lg","p-1");
    div.innerHTML = `<span class="block w-fit text-xs"> ${user}</span><hr>
    <span>${text}</span>`
    section[0].appendChild(div);
}



getRoom("https://hi-chat-t4sd.onrender.com/api/room", "GET").then((data) => {
    console.log(data.data);
    const arr = data.data[0]
    let room;
    const usename = document.getElementById("Uname")
    usename.innerText = data.data[1]
    arr.forEach(element => {
        const name = element.name
        const discription = element.discription;

        makeRoom(name, discription, element._id)
    });
    const btn = document.querySelectorAll(".roomb");

    btn.forEach((chat) => {
        // console.log("hi");
        chat.addEventListener("click", (e) => {
            e.stopPropagation();
            console.log(e.target.parentElement.id);
            room = e.target.parentElement.id;

            getRoom(`https://hi-chat-t4sd.onrender.com/api/chat/${e.target.parentElement.id}`,"GET")

                .then((res) => {
                    console.log(res);
                    makeChat();
                    res.data[0].forEach((data)=>{
                        const text = data.text
                        const owner = data.ownerName
                        if(owner == res.data[1]) 
                            senderMassage(text,owner);
                        recieverMessage(text,owner);
                        
                    })
                    const send = document.querySelector("#send")
                    send.addEventListener('click',()=>{
                        sendMassage(room);

                    })
                    // const section = document.getElementsByClassName("massage")
                })
        })
    })
})

const makeNewRoom = document.getElementById("creat")
makeNewRoom.addEventListener('click', (event) => {
    event.stopPropagation();
    const section = document.createElement("section")
    section.classList.add("flex", "flex-col", "w-screen", "h-screen", "top-0", "bg-opacity-90", "bg-slate-300", "ml-auto", "mr-auto", "justify-center", "items-center", "absolute", "z-20", "rounded-lg");
    section.innerHTML = `<h1 class="text-3xl font-bold text-orange-400">Hi chat</h1>
        <span class="mb-4">Creat Room</span>
    <span class="mb-4" id="err"></span>
    <form>
    
    <input type="text" id="name" name="name"  class="  mt-2 hover:border-dashed rounded-lg bg-slate-200 placeholder:text-gray-400 w-64 p-1" placeholder=" Room Name...."><br>
    <input type="text" id="discreption" name="discreption"  class=" mt-2 hover:border-dashed rounded-lg bg-slate-200 placeholder:text-gray-400 w-64 p-1" placeholder=" Discreption..."><br>
    </form>
    <div class="mt-4 flex  flex-row justify-center items-center w-full gap-3">
    <button id="creatROOM" class="bg-[#1da1f2] text-white rounded-lg w-32 p-1 hover:bg-violet-800">Creat</button>
    <button id="back" class="bg-[#1da1f2] text-white rounded-lg w-32 p-1 hover:bg-violet-800">Back</button>
    </div>`

    document.body.appendChild(section)

    const creatR = document.getElementById("creatROOM");
    const back = document.getElementById("back");
    console.log("in creating room");

    

    creatR.addEventListener("click", (e) => {
        e.stopPropagation()
        // e.preventDefault()
        console.log("your in creat button");

        const name = document.getElementById("name").value;
        const dis = document.getElementById("discreption").value;
        if (!name) {
            document.getElementById("err").innerText = "Please write the room's name";
        }
        console.log(name);

        const data = {
            name,
            discription: dis
        }

        postData("https://hi-chat-t4sd.onrender.com/api/room/create", data, "POST")
            .then(() => {
                location.reload()
            })
            .catch((error) => {
                // document.getElementById("err").innerText = error.statusText;
                // console.log(error);
                
            });

    })
    back.addEventListener("click", (e) => {
        console.log("your backed");
        e.stopPropagation()
        section.remove()
    })
})

const logout = document.getElementById("logout")
logout.addEventListener('click',(e)=>{
    e.stopPropagation()
    postData("https://hi-chat-t4sd.onrender.com/api/user/logout", data, "POST")
    .then(()=>{
        window.location.href = "./login.html"
    })
    .catch((err)=>{
        alert(err);
    })
})