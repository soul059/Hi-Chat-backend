const body = document.body;
let count = 0;
// const Uname = document.getElementById("Uname");
let ulr = "https://hi-chat-t4sd.onrender.com"
// let ulr = "http://localhost:8000"

let room;
let user;

await(async function currentUser() {
    await fetch(`${ulr}/api/user/current`, {
        method: "GET",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    })
        .then((res) => {
            return res.json()

            //    console.log(user.userName);

        })
        .then((res) => {
            user = res.data;
        })
        .catch((err) => {
            //   alert(err);
            window.location.href = "./login.html"
            throw new Error(err);
        })
})();

document.getElementById("manual").addEventListener("click", (e) => {
    e.stopPropagation()
    window.location.href = "./usermanual.html"
})

function makeRoom(name, discription, id, owner) {
    const div = document.createElement("div")
    div.classList.add("flex", "flex-col", "gap-2", "w-60", "bg-slate-300", "text-center", "rounded-lg", "h-fit");
    div.innerHTML = `<span>${name}</span>
    <hr>
    <p>${discription}</p>
    <hr>
    <div id="${id}" class="elegible flex flex-row gap-2 items-center justify-center mb-2">
        <button class="roomb bg-[#1da1f2] text-white rounded-lg w-40 p-1 hover:bg-violet-800" >Chat</button>
    </div>`
    if (owner === user._id) {
        // console.log(user , owner);

        const del = document.createElement("button")
        const edit = document.createElement("button")
        edit.classList.add("edit")
        del.classList.add("delete")
        del.innerHTML = `<img src="delete-svgrepo-com.svg" class="w-8" alt="D">`
        edit.innerHTML = `<img src="edit.svg" class="w-6" alt="E">`
        const btn = div.querySelector(".elegible")
        btn.appendChild(edit)
        btn.appendChild(del)
    }
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
        // console.log("not");
        alert(response.statusText);

    }
}

async function postData(url, data, me) {
    const response = await fetch(url, {
        method: me,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
    });
    // console.log(response);

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
function error(mas) {
    let err = document.getElementById("err")
    if (document.getElementById("error") ? 0 : 1) {

        let span = document.createElement("span")
        span.style.color = "red"
        span.id = "error"
        err.appendChild(span)
    }
    let span = document.getElementById("error")
    span.innerText = mas
}
//for making new massage in chat box

function makeChat() {

    const nav = document.createElement("nav")
    const section = document.createElement("section");
    const send = document.createElement("section")
    send.id = "sendmassage"
    section.classList.add("allchat", "mt-10", "grid", "grid-cols-1", "gap-5", "ml-10", "mb-20", "mr-10", "massage")
    nav.classList.add("allchat", "flex", "justify-around", "flex-row", "w-screen")
    send.classList.add("allchat", "gap-2", "bg-slate-500", "bg-opacity-55", "h-16", "items-center", "justify-center", "flex", "w-screen", "z-10", "bottom-0", "fixed", "send")
    nav.innerHTML = `<div><a href="./index.html" ><img src="back-square-svgrepo-com.svg" alt="Back" class="w-10"></a></div>
    <ul class="flex justify-center items-center">
        <li class="flex items-center">
          <img src="room.svg" alt="" class="w-8">
          <span id="Uname">Username</span>
      </li>
    </ul>`;
    send.innerHTML = `<input type="text" id="text" name="text"  class="ml-10 hover:border-dashed rounded-lg w-full h-10 bg-slate-200 placeholder:text-gray-400 p-1" placeholder=" Massage....">
    <img src="send-svgrepo-com.svg" id="send" class="w-8 mr-10 bg-purple-200 rounded-lg" alt="Send">`
    document.getElementById("header").appendChild(nav);
    body.appendChild(section);
    body.appendChild(send);
}
//sendin massage to databace
function sendMassage(roomid) {
    const mas = document.querySelector("#text").value;
    const badWords = []; // Add your list of bad words here

    if (badWords.some(word => mas.toLowerCase().includes(word))) {
        alert("Please refrain from using inappropriate language.");
    } else {
        // Proceed with sending the message

        // console.log(mas);
        // console.log(roomid);

        // console.log("hi");
        if (mas == "") {
            alert("Please write something!");
        }
        else {
            const data = {
                text: mas
            }

            fetch(`${ulr}/api/chat/${roomid}`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data),
            })
                .then((res) => res.json())
                .then((res) => {
                    // console.log(res.data);
                    const utcTimestamp = res.data.createdAt;
                    const time = new Date(utcTimestamp).toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
                    count++;
                    senderMassage(res.data.text, res.data.ownerName, res.data._id, time);
                })
        }
    }
    chatoption()
    document.querySelector("#text").value = "";

}
// sender massage sowcase
function senderMassage(text, user, id, time) {
    const section = document.getElementsByClassName("massage")
    const div = document.createElement('div');
    div.id = id;
    div.classList.add("bg-orange-200", "flex", "flex-col", "justify-self-end", "w-fit", "rounded-lg", "p-1", "sender", "Chat");
    div.innerHTML = `<span class="block w-fit text-xs"> ${user}</span><hr>
    <p class="text-wrap">${text}</p>
    <span class="text-xs self-end ">${time}</span>`
    section[0].appendChild(div);
    scrollY = section[0].scrollHeight;
    window.scrollTo(0, scrollY);
    // console.log(section[0].scrollHeight);


}
//resiving massage socase
function recieverMessage(text, user, id, time) {
    const section = document.getElementsByClassName("massage")
    // console.log(section[0]);

    const div = document.createElement('div');
    div.id = id;
    div.classList.add("bg-red-200", "flex", "flex-col", "justify-self-start", "w-fit", "rounded-lg", "p-1", "Chat");
    div.innerHTML = `<span class="block w-fit text-xs"> ${user}</span><hr>
    <p class="text-wrap">${text}</p>
    <span class="text-xs self-end ">${time}</span>`
    section[0].appendChild(div);
    scrollY = section[0].scrollHeight;
    window.scrollTo(0, scrollY);
}

function remakechat() {
    getRoom(`${ulr}/api/chat/${room}`, "GET")


        // .then((res) => {

        //     // console.log(count);
        //     for (let i = count; i < res.data[0].length; i++) {
        //         // console.log("hi");

        //         const data = res.data[0][i]
        //         // console.log(data)
        //         const text = data.text
        //         const owner = data.ownerName
        //         const ownerID = data.owner
        //         const utcTimestamp = data.createdAt;
        //         const time = new Date(utcTimestamp).toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
        //         if (data._id && document.getElementById(data._id) ? 0 : 1) {
        //             count++;
        //             if (ownerID == res.data[2])
        //                 senderMassage(text, owner, data._id, time);
        //             else
        //                 recieverMessage(text, owner, data._id, time);
        //         }
        //         else {
        //             console.log("hi");
        //         }

        //     }
        // })

        .then((res) => {
            // this code is not efficient for usage
            res.data[0].forEach((data) => {
                const text = data.text
                const owner = data.ownerName
                const utcTimestamp = data.createdAt;
                const time = new Date(utcTimestamp).toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
                // console.log(istTime);
                console.log(data._id,document.getElementById(data._id));

                if (document.getElementById(data._id) ? 0 : 1) {

                    if (owner == res.data[1])
                        senderMassage(text, owner, data._id, time);
                    else
                        recieverMessage(text, owner, data._id, time);
                }
                else if(!document.getElementById(data._id)) {
                    console.log("hi")
                }

            })
        })
        chatoption()


}





function deleteRoom(id) {
    console.log(id);
    if (confirm("Are you sure you want to delete this room ?")) {

        const data = {}
        postData(`${ulr}/api/room/${id}`, data, "DELETE")
            .then((res) => {
                // console.log(res);
                // alert("Room Deleted");
                location.reload()
            })
            .catch((err) => {
                alert(err);
            })
    }
}

function editRoom(id, name, discreption) {

    const section = document.createElement("section")
    section.classList.add("flex", "flex-col", "w-screen", "h-screen", "top-0", "bg-opacity-90", "bg-slate-300", "ml-auto", "mr-auto", "justify-center", "items-center", "absolute", "z-20", "rounded-lg");
    section.innerHTML = `<div class="flex justify-center flex-col items-center rounded-xl bg-slate-100 p-9">
    <h1 class="text-3xl font-bold text-orange-400">Hi chat</h1>
        <span class="mb-4">Creat Room</span>
        <div class="mb-4" id="err">
        </div>
    <form>
    
    <input type="text" id="name" name="name"  class="  mt-2 hover:border-dashed rounded-lg bg-slate-200 placeholder:text-gray-400 w-64 p-1" value=" ${name}"><br>
    <input type="text" id="discreption" name="discreption"  class=" mt-2 hover:border-dashed rounded-lg bg-slate-200 placeholder:text-gray-400 w-64 p-1" value=" ${discreption}"><br>
    </form>
    <div class="mt-4 flex  flex-row justify-center items-center w-full gap-3">
    <button id="edited" class="bg-[#1da1f2] text-white rounded-lg w-32 p-1 hover:bg-violet-800">done</button>
    <button id="back" class="bg-[#1da1f2] text-white rounded-lg w-32 p-1 hover:bg-violet-800">Back</button>
    </div>
    </div>`

    document.body.appendChild(section)

    const back = document.getElementById("back");
    const edited = document.getElementById("edited");

    back.addEventListener("click", (e) => {
        // console.log("your backed");
        e.stopPropagation()
        section.remove()
    })

    edited.addEventListener("click", (e) => {
        e.stopPropagation()
        const name = document.getElementById("name").value;
        const dis = document.getElementById("discreption").value;
        if (!name) {
            error("Please write the room's name");
            throw new Error("Please write the room's name");
        }
        if (!dis) {
            error("Please write the room's discreption");
            throw new Error("Please write the room's discreption");
        }
        // console.log(name);

        const data = {
            name,
            discription: dis
        }

        fetch(`${ulr}/api/room/${id}`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
        })
            .then(() => {
                location.reload()
            })
            .catch((error) => {
                // document.getElementById("err").innerText = error.statusText;
                // console.log(error);
                alert(error);
            });

    }
    )
}

function removeRoom() {
    let dee = document.getElementById("room");
    dee.remove();
    dee = document.getElementById("nav");
    dee.remove();
    dee = document.getElementById("creatR")
    dee.remove();
}



await getRoom(`${ulr}/api/room`, "GET")
    .then((data) => {
        // console.log(data.data);
        const arr = data.data[0]
        const usename = document.getElementById("Uname")
        usename.innerText = data.data[1]
        arr.forEach(element => {
            const name = element.name
            const discription = element.discription;
            // console.log(element.owner);

            makeRoom(name, discription, element._id, element.owner)
        });
        const btn = document.querySelectorAll(".roomb");
        const del = document.querySelectorAll(".delete");
        const edit = document.querySelectorAll(".edit");

        del.forEach((del) => {
            del.addEventListener("click", (e) => {
                e.stopPropagation();
                const id = e.target.parentElement.parentElement.id

                deleteRoom(id);

            })
        })
        edit.forEach((edit) => {
            edit.addEventListener("click", (e) => {
                e.stopPropagation();
                const id = e.target.parentElement.parentElement.id
                const name = e.target.parentElement.parentElement.parentElement.children[0].innerText
                const discription = e.target.parentElement.parentElement.parentElement.children[2].innerText
                // console.log(name,discription);


                editRoom(id, name, discription);
                // location.reload()
            })

        })

        btn.forEach((chat) => {
            // console.log("hi");
            chat.addEventListener("click", (e) => {
                e.stopPropagation();
                // console.log(e.target.parentElement.id);
                room = e.target.parentElement.id;

                getRoom(`${ulr}/api/chat/${room}`, "GET")

                    .then(async (res) => {
                        // console.log(res);
                        removeRoom();
                        makeChat();
                        await getRoom(`${ulr}/api/room/${room}`, "GET")
                            .then((res) => {
                                // console.log(res);

                                const usename = document.getElementById("Uname")
                                usename.innerText = res.data.name
                            })
                            .catch((err) => {
                                alert(err);
                            })
                        // console.log(res.data)
                        res.data[0].forEach((data) => {
                            const text = data.text
                            const owner = data.ownerName
                            const ownerID = data.owner
                            const utcTimestamp = data.createdAt;
                            count++;
                            const time = new Date(utcTimestamp).toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
                            // console.log(res.data[2]);
                            // console.log(ownerID);
                            // console.log(data);



                            if (ownerID == res.data[2])
                                senderMassage(text, owner, data._id, time);
                            else
                                recieverMessage(text, owner, data._id, time);

                        })
                        setInterval(remakechat, 1000);
                        const send = document.querySelector("#send")
                        const sendtext = document.querySelector("#text")
                        send.addEventListener('click', () => {

                            sendMassage(room);

                        })

                        sendtext.addEventListener('keypress', (e) => {

                            // console.log(e.key);

                            if (e.key === "Enter") {
                                sendMassage(room);
                            }
                        })
                        chatoption()
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
    section.innerHTML = `<div class="flex justify-center flex-col items-center rounded-xl bg-slate-100 p-9">
    <h1 class="text-3xl font-bold text-orange-400">Hi chat</h1>
        <span class="mb-4">Creat Room</span>
        <div class="mb-4" id="err">
        </div>
    <form>
    
    <input type="text" id="name" name="name"  class="  mt-2 hover:border-dashed rounded-lg bg-slate-200 placeholder:text-gray-400 w-64 p-1" placeholder=" Room Name...."><br>
    <input type="text" id="discreption" name="discreption"  class=" mt-2 hover:border-dashed rounded-lg bg-slate-200 placeholder:text-gray-400 w-64 p-1" placeholder=" Discreption..."><br>
    </form>
    <div class="mt-4 flex  flex-row justify-center items-center w-full gap-3">
    <button id="back" class="bg-[#1da1f2] text-white rounded-lg w-32 p-1 hover:bg-violet-800">Back</button>
    <button id="creatROOM" class="bg-[#1da1f2] text-white rounded-lg w-32 p-1 hover:bg-violet-800">Creat</button>
    </div>
    </div>`

    document.body.appendChild(section)

    const creatR = document.getElementById("creatROOM");
    const back = document.getElementById("back");
    // console.log("in creating room");



    creatR.addEventListener("click", (e) => {
        e.stopPropagation()
        // e.preventDefault()
        // console.log("your in creat button");

        const name = document.getElementById("name").value;
        const dis = document.getElementById("discreption").value;
        if (!name) {
            error("Please write the room's name");
            throw new Error("Please write the room's name");
        }
        if (!dis) {
            error("Please write the room's discription");
            throw new Error("Please write the room's discription");
        }
        // console.log(name);

        const data = {
            name,
            discription: dis
        }

        postData(`${ulr}/api/room/create`, data, "POST")
            .then(() => {
                location.reload()
            })
            .catch((error) => {
                // document.getElementById("err").innerText = error.statusText;
                // console.log(error);
                alert(error);

            });

    })
    back.addEventListener("click", (e) => {
        console.log("your backed");
        e.stopPropagation()
        section.remove()
    })
})

const profile = document.getElementById("profile")
profile.addEventListener('click', (e) => {
    e.stopPropagation()
    const nameX = user.userName
    const email = user.email
    const section = document.createElement("section")
    section.classList.add("flex", "flex-col", "w-screen", "h-screen", "top-0", "bg-opacity-90", "bg-slate-300", "ml-auto", "mr-auto", "justify-center", "items-center", "absolute", "z-20", "rounded-lg");
    section.innerHTML = `<div class="flex justify-center flex-col items-center rounded-xl bg-slate-100 p-9">
    <img id="back" src="close.svg" alt="back" class="w-8 cursor-pointer relative -right-32 -top-4">
    <h1 class="text-3xl font-bold text-orange-400">Hi chat</h1>
    <span class="mb-4">${nameX}'s Profile</span>
    <img src="emoji-grin-squint-svgrepo-com.svg" alt="Emogi" class="w-8">
    <p class="mb-4">user Name :
    ${nameX}</p>
    <p class="mb-4">Email :
    ${email}</p>
<div class="mt-4 flex  flex-row justify-center items-center w-full gap-3">
<button id="DELETE" class="bg-red-400 text-white rounded-lg w-32 p-1 hover:bg-red-600">DELETE</button>
<button id="Edit" class="bg-[#1da1f2] text-white rounded-lg w-32 p-1 hover:bg-violet-800">Edit</button>
</div>
</div>`

    document.body.appendChild(section)
    const back = document.getElementById("back");
    const deleteuser = document.getElementById("DELETE");
    const edit = document.getElementById("Edit");

    edit.addEventListener("click", (e) => {
        e.stopPropagation()
        const sendx = document.createElement("section")
        sendx.classList.add("allchat", "gap-2", "bg-slate-500", "bg-opacity-55", "h-16", "items-center", "justify-center", "flex", "w-screen", "z-20", "bottom-0", "fixed", "send")
        sendx.innerHTML = `<input type="text" id="edittext" name="text" autofocus class="ml-10 hover:border-dashed rounded-lg w-full h-10 bg-slate-200 placeholder:text-gray-400 p-1" value=" ${nameX}">
                        <img src="check.svg" id="doneedit" class="w-8 mr-10 bg-purple-200 rounded-lg" alt="Send">`

        document.body.appendChild(sendx)

        const edited = document.getElementById("doneedit");
        const editedtext = document.getElementById("edittext");
        edited.addEventListener("click", (e) => {
            e.stopPropagation()

            // alert("Are you sure you want to delete your account?");
            if (confirm("Are you sure you want to edit your account?")) {
                const text = document.getElementById("edittext").value;
                if (!text) {
                    error("Please write the user Name text");
                    throw new Error("Please write the user Name text");
                }
                // console.log(name);

                const data = {
                    userName: text
                }
                postData(`${ulr}/api/user/edit`, data, "PUT")
                    .then(() => {
                        location.reload()
                    })
                    .catch((err) => {
                        alert(err);
                        location.reload()
                    })
            }
        })
        editedtext.addEventListener("keypress", (e) => {
            // console.log(e.key);

            if (e.key === "Enter") {
                if (confirm("Are you sure you want to edit your account?")) {
                    e.stopPropagation()
                    const text = document.getElementById("edittext").value;
                    if (!text) {
                        error("Please write the user Name text");
                        throw new Error("Please write the user Name text");
                    }
                    // console.log(name);

                    const data = {
                        userName: text
                    }
                    postData(`${ulr}/api/user/edit`, data, "PUT")
                        .then(() => {
                            location.reload()
                        })
                        .catch((err) => {
                            alert(err);
                            location.reload()
                        })
                }

            }
        })
    })

    deleteuser.addEventListener("click", (e) => {
        e.stopPropagation()
        // alert("Are you sure you want to delete your account?");
        if (confirm("Are you sure you want to delete your account?")) {

            const data = {}
            postData(`${ulr}/api/user/delete`, data, "DELETE")
                .then(() => {
                    window.location.href = "./login.html"
                })
                .catch((err) => {
                    alert(err);
                })
        }
    })


    back.addEventListener("click", (e) => {
        console.log("your backed");
        e.stopPropagation()
        section.remove()
    })
})



let flage = false
function chatoption() {
    let allchatsBySender = document.querySelectorAll(".sender")
    // console.log(allchatsBySender);

    allchatsBySender.forEach((send) => {
        let id;
        // console.log(send);

        send.addEventListener("click", (e) => {
            e.stopPropagation()
            if ((e.target == send || e.target == send.children[0] || e.target == send.children[2]) && !flage) {

                flage = true
                if (e.target == send) { id = e.target.id }
                if (e.target == send.children[0]) { id = e.target.parentElement.id }
                if (e.target == send.children[2]) { id = e.target.parentElement.id }


                /*<div class="flex flex-col text-sm mt-3">
                    <button id="editChat" class="hover:bg-red-400 rounded-lg">Edit</button>
                    <button id="deleteChat" class="hover:bg-red-400 rounded-lg">Delete</button>
                    <button id="backChat" class="hover:bg-blue-400 rounded-lg">back</button>
                </div> */
                const div = document.createElement("div")
                div.classList.add("flex", "flex-col", "justify-center", "items-center", "text-sm", "mt-3");
                div.innerHTML = `<button id="editChat" class="hover:bg-red-400 rounded-lg p-1">Edit</button>
                <button id="deleteChat" class="hover:bg-red-400 rounded-lg p-1">Delete</button>
                <button id="backChat" class="hover:bg-blue-400 rounded-lg p-1">back</button>`
                send.appendChild(div)

                const editChat = document.getElementById("editChat")
                const deleteChat = document.getElementById("deleteChat")
                const backChat = document.getElementById("backChat")

                backChat.addEventListener("click", (e) => {
                    e.stopPropagation()
                    flage = false
                    div.remove()
                })

                // console.log(id);
                deleteChat.addEventListener("click", (e) => {
                    e.stopPropagation()
                    if (confirm("Are you sure you want to delete this chat ?")) {
                        const data = {}
                        postData(`${ulr}/api/chat/${id}`, data, "DELETE")
                            .then((res) => {
                                // console.log(res);
                                // alert("Chat Deleted");
                                // location.reload()
                                const allChat = document.querySelectorAll(".Chat")
                                allChat.forEach((chat) => {
                                    if (chat.id == id) {
                                        chat.remove()
                                    }
                                    flage = false
                                    count--;
                                })
                            })
                            .catch((err) => {
                                alert(err);
                            })
                    }
                    else { flage = false }
                    div.remove()
                })

                editChat.addEventListener("click", (e) => {
                    e.stopPropagation()
                    flage = false
                    div.remove()
                    const text = send.children[2].innerText
                    const presend = document.getElementById("sendmassage")
                    if (presend) {
                        presend.style.display = "none"
                    }
                    const sendx = document.createElement("section")
                    sendx.classList.add("allchat", "gap-2", "bg-slate-500", "bg-opacity-55", "h-16", "items-center", "justify-center", "flex", "w-screen", "z-10", "bottom-0", "fixed", "send")
                    sendx.innerHTML = `<input type="text" id="edittext" name="text" autofocus class="ml-10 hover:border-dashed rounded-lg w-full h-10 bg-slate-200 placeholder:text-gray-400 p-1" value=" ${text}">
                        <img src="check.svg" id="doneedit" class="w-8 mr-10 bg-purple-200 rounded-lg" alt="Send">`

                    document.body.appendChild(sendx)

                    const edited = document.getElementById("doneedit");
                    const editedtext = document.getElementById("edittext");

                    edited.addEventListener("click", (e) => {
                        e.stopPropagation()
                        const text = document.getElementById("edittext").value;
                        if (!text) {
                            error("Please write the chat's text");
                            throw new Error("Please write the chat's text");
                        }
                        // console.log(name);

                        const data = {
                            text
                        }

                        fetch(`${ulr}/api/chat/${id}`, {
                            method: 'PUT',
                            headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify(data),
                        })
                            .then(() => {
                                const allChat = document.querySelectorAll(".Chat")
                                allChat.forEach((chat) => {
                                    if (chat.id == id) {
                                        send.children[2].innerText = text
                                    }
                                    sendx.remove()
                                    presend.style.display = "flex"
                                })
                            })
                            .catch((error) => {
                                // document.getElementById("err").innerText = error.statusText;
                                // console.log(error);
                                alert(error);
                            });
                    })
                    editedtext.addEventListener("keypress", (e) => {
                        // console.log(e.key);

                        if (e.key === "Enter") {
                            e.stopPropagation()
                            const text = document.getElementById("edittext").value;
                            if (!text) {
                                error("Please write the chat's text");
                                throw new Error("Please write the chat's text");
                            }
                            // console.log(name);

                            const data = {
                                text
                            }

                            fetch(`${ulr}/api/chat/${id}`, {
                                method: 'PUT',
                                headers: {
                                    'Accept': 'application/json',
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify(data),
                            })
                                .then(() => {
                                    const allChat = document.querySelectorAll(".Chat")
                                    allChat.forEach((chat) => {
                                        if (chat.id == id) {
                                            send.children[2].innerText = text
                                        }
                                        sendx.remove()
                                        presend.style.display = "flex"
                                    })
                                })
                                .catch((error) => {
                                    // document.getElementById("err").innerText = error.statusText;
                                    // console.log(error);
                                    alert(error);
                                });
                        }
                    })

                })
            }




        })
    })
}




const logout = document.getElementById("logout")
logout.addEventListener('click', (e) => {
    e.stopPropagation()
    const data = {}
    postData(`${ulr}/api/user/logout`, data, "POST")
        .then(() => {
            window.location.href = "./login.html"
        })
        .catch((err) => {
            alert(err);
        })
})