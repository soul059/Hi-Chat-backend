const body = document.body;
let count = 0;
// const Uname = document.getElementById("Uname");
// let ulr = "https://hi-chat-t4sd.onrender.com"
let ulr = "http://localhost:8000"

let room;
let user;
// let inroom = true;

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

// function roomrelode(){
//     if(inroom){
//         location.reload();
//     }
// }

const sidebar = document.getElementById("sidebar")
sidebar.addEventListener("click", (e) => {
    e.stopPropagation()
    console.log("hi");
    const sideme = document.getElementById("sideme")
    sideme.style.display = "block"
    document.getElementById("manual").addEventListener("click", (e) => {
        e.stopPropagation()
        window.location.href = "./usermanual.html"
    })
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
    const close = document.getElementById("close")
    close.addEventListener("click", (e) => {
        e.stopPropagation()
        sideme.style.display = "none"
    })
    const home = document.getElementById("home")
    home.addEventListener('click', (e) => {
        e.stopPropagation()
        location.reload()
    })
})



function makeRoom(name, discription, id, owner) {
    const div = document.createElement("div")
    div.classList.add("roomb", "md:w-need", "w-full", "md:self-center", "self-start", "grid", "grid-rows-1", "grid-cols-4", "items-center", "gap-2", "text-center", "h-fit");
    div.id = id;
    div.innerHTML = `<svg  class="rounded-full w-10 col-start-1 row-span-2 justify-self-end" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M16 6C14.3432 6 13 7.34315 13 9C13 10.6569 14.3432 12 16 12C17.6569 12 19 10.6569 19 9C19 7.34315 17.6569 6 16 6ZM11 9C11 6.23858 13.2386 4 16 4C18.7614 4 21 6.23858 21 9C21 10.3193 20.489 11.5193 19.6542 12.4128C21.4951 13.0124 22.9176 14.1993 23.8264 15.5329C24.1374 15.9893 24.0195 16.6114 23.5631 16.9224C23.1068 17.2334 22.4846 17.1155 22.1736 16.6591C21.1979 15.2273 19.4178 14 17 14C13.166 14 11 17.0742 11 19C11 19.5523 10.5523 20 10 20C9.44773 20 9.00001 19.5523 9.00001 19C9.00001 18.308 9.15848 17.57 9.46082 16.8425C9.38379 16.7931 9.3123 16.7323 9.24889 16.6602C8.42804 15.7262 7.15417 15 5.50001 15C3.84585 15 2.57199 15.7262 1.75114 16.6602C1.38655 17.075 0.754692 17.1157 0.339855 16.7511C-0.0749807 16.3865 -0.115709 15.7547 0.248886 15.3398C0.809035 14.7025 1.51784 14.1364 2.35725 13.7207C1.51989 12.9035 1.00001 11.7625 1.00001 10.5C1.00001 8.01472 3.01473 6 5.50001 6C7.98529 6 10 8.01472 10 10.5C10 11.7625 9.48013 12.9035 8.64278 13.7207C9.36518 14.0785 9.99085 14.5476 10.5083 15.0777C11.152 14.2659 11.9886 13.5382 12.9922 12.9945C11.7822 12.0819 11 10.6323 11 9ZM3.00001 10.5C3.00001 9.11929 4.1193 8 5.50001 8C6.88072 8 8.00001 9.11929 8.00001 10.5C8.00001 11.8807 6.88072 13 5.50001 13C4.1193 13 3.00001 11.8807 3.00001 10.5Z" fill="#000000"></path> </g></svg>
    <span class="col-start-2 col-span-2">${name}</span>
    <p class="text-sm col-start-2 col-span-2">${discription}</p>
    `
    if (owner === user._id) {
        // console.log(user , owner);

        div.innerHTML += `
        <img src="./edit.svg" alt="edit" class="edit w-6 col-start-4 row-span-2 row-start-1 justify-self-start relative -left-2">
        <img src="delet.svg" alt="delete" class="delete w-6 col-start-4 row-span-2 row-start-1 justify-self-center ">`
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

    document.getElementById("chatmaker").style.display = "block";
    document.getElementById("typing").style.display = "flex";
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
    div.classList.add("mx-4", "mt-1", "flex-col", "justify-self-end", "w-fit", "p-1", "sender", "Chat");
    div.innerHTML = `<p class="text-wrap max-w-72 ml-2 bg-cyan-950 text-white rounded-lg rounded-br-none p-1">${text}</p>
    <span class="text-xs self-end  mx-3"> ${time}</span>`
    // console.log(section[0]);

    section[0].appendChild(div);
    scrollY = section[0].scrollHeight;
    section[0].scrollTo(0, scrollY);
    // console.log(section[0].scrollHeight);


}
//resiving massage socase
function recieverMessage(text, user, id, time) {
    const section = document.getElementsByClassName("massage")
    // console.log(section[0]);

    const div = document.createElement('div');
    div.id = id;
    div.classList.add('mx-4', 'mt-1', 'grid', 'grid-rows-2', 'grid-flow-col', 'grid-cols-chat', 'justify-self-start', 'w-fit', 'rounded-lg', "p-1", "Chat");
    div.innerHTML = `<span class="w-fit text-s h-10 justify-self-start rounded-full row-span-2 text-center bg-slate-300 p-2">${user}</span>
    <p class="text-wrap max-w-72 ml-2 text-base col-start-2 row-start-1 justify-self-start">${text}</p>
    <span class="text-xs self-end  mx-3 col-start-2 row-start-2">${time}</span>`
    section[0].appendChild(div);
    scrollY = section[0].scrollHeight;
    section[0].scrollTo(0, scrollY);
}


function remakechat() {
    let allchat = document.querySelectorAll(".Chat")
    getRoom(`${ulr}/api/chat/${room}`, "GET")


        .then((res) => {
            let index = [];
            if (allchat.length > res.data[0].length) {
                for (let i = 0; i < allchat.length; i++) {
                    if (!(res.data[0][i])) {
                        index.push(i)
                        // console.log(index);
                    }
                    index.forEach((i) => {
                        allchat[i].remove()
                        count--;
                    })
                }
            }
            if (allchat.length == res.data[0].length) {
                for (let i = 0; i < count; i++) {
                    const data = res.data[0][i]
                    const text = data.text
                    let mas
                    allchat[i].classList.contains("sender") ? mas = allchat[i].children[0].innerText : mas = allchat[i].children[1].innerText

                    if (mas != text) {
                        allchat[i].classList.contains("sender") ? allchat[i].children[0].innerText = text : allchat[i].children[1].innerText = text
                    }
                }
            }


            // console.log(count);
            for (let i = count; i < res.data[0].length; i++) {
                // console.log("hi");

                const data = res.data[0][i]
                // console.log(data)
                const text = data.text
                const owner = data.ownerName
                const ownerID = data.owner
                const utcTimestamp = data.createdAt;
                const time = new Date(utcTimestamp).toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
                if (data._id && document.getElementById(data._id) ? 0 : 1) {
                    count++;

                    if (ownerID == res.data[2])
                        senderMassage(text, owner, data._id, time);
                    else
                        recieverMessage(text, owner, data._id, time);
                }

            }
        })

    // .then((res) => {
    //     // this code is not efficient for usage
    //     res.data[0].forEach((data) => {
    //         const text = data.text
    //         const owner = data.ownerName
    //         const utcTimestamp = data.createdAt;
    //         const time = new Date(utcTimestamp).toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
    //         // console.log(istTime);
    //         console.log(data._id,document.getElementById(data._id));

    //         if (document.getElementById(data._id) ? 0 : 1) {

    //             if (owner == res.data[1])
    //                 senderMassage(text, owner, data._id, time);
    //             else
    //                 recieverMessage(text, owner, data._id, time);
    //         }
    //         else if(!document.getElementById(data._id)) {
    //             console.log("hi")
    //         }

    //     })
    // })
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
    section.classList.add("flex", "flex-col", "w-screen", "h-screen", "top-0", "bg-opacity-90", "bg-slate-300", "ml-auto", "mr-auto", "justify-center", "items-center", "absolute", "z-50", "rounded-lg");
    section.innerHTML = `<div class="flex justify-center flex-col items-center rounded-xl bg-slate-100 p-9">
    <h1 class="text-3xl font-bold text-orange-400">Hi chat</h1>
        <span class="mb-4">Edit Room</span>
        <div class="mb-4" id="err">
        </div>
    <form>
    
    <input type="text" id="name" name="name"  class="  mt-2 hover:border-dashed rounded-lg bg-slate-200 placeholder:text-gray-400 w-64 p-1" value=" ${name}"><br>
    <input type="text" id="discreption" name="discreption"  class=" mt-2 hover:border-dashed rounded-lg bg-slate-200 placeholder:text-gray-400 w-64 p-1" value=" ${discreption}"><br>
    </form>
    <div class="mt-4 flex  flex-row justify-center items-center w-full gap-3">
    <button id="edited" class="py-2.5 px-5 me-2 mb-2 font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-red-400 dark:text-red-800 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">done</button>
    <button id="closecreat" class="py-2.5 px-5 me-2 mb-2 font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Back</button>
    </div>
    </div>`

    document.body.appendChild(section)

    const back = document.getElementById("closecreat");
    const edited = document.getElementById("edited");

    back.addEventListener("click", (e) => {
        console.log("your backed");
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
    let dee = document.getElementById("roomdisplay");
    dee.style.display = "none";
    dee = document.getElementById("nav");
    dee.style.display = "none";
    dee = document.getElementById("creatroom")
    dee.style.display = "none";
}

function chatget(room) {
    getRoom(`${ulr}/api/chat/${room}`, "GET")

        .then(async (res) => {
            // console.log(res);
            // inroom = false;
            removeRoom();
            makeChat();
            const back = document.getElementById("back")
            back.addEventListener("click", (e) => {
                e.stopPropagation()
                location.reload()
            })
            const home = document.getElementById("home")
            home.addEventListener("click", (e) => {
                e.stopPropagation()
                location.reload()
            })
            await getRoom(`${ulr}/api/room/${room}`, "GET")
                .then((res) => {
                    // console.log(res);

                    const usename = document.getElementById("roomname")
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

                const time = new Date(utcTimestamp).toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
                count++;
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
        })
}



await getRoom(`${ulr}/api/room`, "GET")
    .then((data) => {
        // console.log(data.data);
        const arr = data.data[0]
        arr.forEach(element => {
            const name = element.name
            const discription = element.discription;
            // console.log(element._id);

            makeRoom(name, discription, element._id, element.owner)
        });
        // setInterval(roomrelode,10000);
        const btn = document.querySelectorAll(".roomb");
        const del = document.querySelectorAll(".delete");
        const edit = document.querySelectorAll(".edit");

        del.forEach((del) => {
            del.addEventListener("click", (e) => {
                e.stopPropagation();
                const id = e.target.parentElement.id
                // console.log(id);



                deleteRoom(id);


            })
        })
        edit.forEach((edit) => {
            edit.addEventListener("click", (e) => {
                e.stopPropagation();
                const id = e.target.parentElement.id
                // console.log(id);

                const name = e.target.parentElement.children[1].innerText
                const discription = e.target.parentElement.children[2].innerText
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
                if (e.target.element == "div") {
                    room = e.target.id;
                }
                else
                    room = e.target.parentElement.id;

                chatget(room);

            })
        })
    })

const creatroom = document.getElementById("creatroom")
creatroom.addEventListener("click", (e) => {
    e.stopPropagation()
    window.location.href = "./new creatroom.html"
})
// const makeNewRoom = document.getElementById("creat")
// makeNewRoom.addEventListener('click', (event) => {
//     event.stopPropagation();
//     const section = document.createElement("section")
//     section.classList.add("flex", "flex-col", "w-screen", "h-screen", "top-0", "bg-opacity-90", "bg-slate-300", "ml-auto", "mr-auto", "justify-center", "items-center", "absolute", "z-20", "rounded-lg");
//     section.innerHTML = `<div class="flex justify-center flex-col items-center rounded-xl bg-slate-100 p-9">
//     <h1 class="text-3xl font-bold text-orange-400">Hi chat</h1>
//         <span class="mb-4">Creat Room</span>
//         <div class="mb-4" id="err">
//         </div>
//     <form>

//     <input type="text" id="name" name="name"  class="  mt-2 hover:border-dashed rounded-lg bg-slate-200 placeholder:text-gray-400 w-64 p-1" placeholder=" Room Name...."><br>
//     <input type="text" id="discreption" name="discreption"  class=" mt-2 hover:border-dashed rounded-lg bg-slate-200 placeholder:text-gray-400 w-64 p-1" placeholder=" Discreption..."><br>
//     </form>
//     <div class="mt-4 flex  flex-row justify-center items-center w-full gap-3">
//     <button id="back" class="bg-[#1da1f2] text-white rounded-lg w-32 p-1 hover:bg-violet-800">Back</button>
//     <button id="creatROOM" class="bg-[#1da1f2] text-white rounded-lg w-32 p-1 hover:bg-violet-800">Creat</button>
//     </div>
//     </div>`

//     document.body.appendChild(section)

//     const creatR = document.getElementById("creatROOM");
//     const back = document.getElementById("back");
//     // console.log("in creating room");



//     creatR.addEventListener("click", (e) => {
//         e.stopPropagation()
//         // e.preventDefault()
//         // console.log("your in creat button");

//         const name = document.getElementById("name").value;
//         const dis = document.getElementById("discreption").value;
//         if (!name) {
//             error("Please write the room's name");
//             throw new Error("Please write the room's name");
//         }
//         if (!dis) {
//             error("Please write the room's discription");
//             throw new Error("Please write the room's discription");
//         }
//         // console.log(name);

//         const data = {
//             name,
//             discription: dis
//         }

//         postData(`${ulr}/api/room/create`, data, "POST")
//             .then(() => {
//                 location.reload()
//             })
//             .catch((error) => {
//                 // document.getElementById("err").innerText = error.statusText;
//                 // console.log(error);
//                 alert(error);

//             });

//     })
//     back.addEventListener("click", (e) => {
//         console.log("your backed");
//         e.stopPropagation()
//         section.remove()
//     })
// })

const profile = document.getElementById("profile")
profile.addEventListener('click', (e) => {
    e.stopPropagation()
    window.location.href = "./profile.html"
})
// profile.addEventListener('click', (e) => {
//     e.stopPropagation()
//     const nameX = user.userName
//     const email = user.email
//     const section = document.createElement("section")
//     section.classList.add("flex", "flex-col", "w-screen", "h-screen", "top-0", "bg-opacity-90", "bg-slate-300", "ml-auto", "mr-auto", "justify-center", "items-center", "absolute", "z-20", "rounded-lg");
//     section.innerHTML = `<div class="flex justify-center flex-col items-center rounded-xl bg-slate-100 p-9">
//     <img id="back" src="close.svg" alt="back" class="w-8 cursor-pointer relative -right-32 -top-4">
//     <h1 class="text-3xl font-bold text-orange-400">Hi chat</h1>
//     <span class="mb-4">${nameX}'s Profile</span>
//     <img src="emoji-grin-squint-svgrepo-com.svg" alt="Emogi" class="w-8">
//     <p class="mb-4">user Name :
//     ${nameX}</p>
//     <p class="mb-4">Email :
//     ${email}</p>
// <div class="mt-4 flex  flex-row justify-center items-center w-full gap-3">
// <button id="DELETE" class="bg-red-400 text-white rounded-lg w-32 p-1 hover:bg-red-600">DELETE</button>
// <button id="Edit" class="bg-[#1da1f2] text-white rounded-lg w-32 p-1 hover:bg-violet-800">Edit</button>
// </div>
// </div>`

//     document.body.appendChild(section)
//     const back = document.getElementById("back");
//     const deleteuser = document.getElementById("DELETE");
//     const edit = document.getElementById("Edit");

//     edit.addEventListener("click", (e) => {
//         e.stopPropagation()
//         const sendx = document.createElement("section")
//         sendx.classList.add("allchat", "gap-2", "bg-slate-500", "bg-opacity-55", "h-16", "items-center", "justify-center", "flex", "w-screen", "z-20", "bottom-0", "fixed", "send")
//         sendx.innerHTML = `<input type="text" id="edittext" name="text" autofocus class="ml-10 hover:border-dashed rounded-lg w-full h-10 bg-slate-200 placeholder:text-gray-400 p-1" value=" ${nameX}">
//                         <img src="check.svg" id="doneedit" class="w-8 mr-10 bg-purple-200 rounded-lg" alt="Send">`

//         document.body.appendChild(sendx)

//         const edited = document.getElementById("doneedit");
//         const editedtext = document.getElementById("edittext");
//         edited.addEventListener("click", (e) => {
//             e.stopPropagation()

//             // alert("Are you sure you want to delete your account?");
//             if (confirm("Are you sure you want to edit your account?")) {
//                 const text = document.getElementById("edittext").value;
//                 if (!text) {
//                     error("Please write the user Name text");
//                     throw new Error("Please write the user Name text");
//                 }
//                 // console.log(name);

//                 const data = {
//                     userName: text
//                 }
//                 postData(`${ulr}/api/user/edit`, data, "PUT")
//                     .then(() => {
//                         location.reload()
//                     })
//                     .catch((err) => {
//                         alert(err,"or username might be taken");
//                         location.reload()
//                         throw new Error("username might be taken")
//                     })
//             }
//         })
//         editedtext.addEventListener("keypress", (e) => {
//             // console.log(e.key);

//             if (e.key === "Enter") {
//                 if (confirm("Are you sure you want to edit your account?")) {
//                     e.stopPropagation()
//                     const text = document.getElementById("edittext").value;
//                     if (!text) {
//                         error("Please write the user Name text");
//                         throw new Error("Please write the user Name text");
//                     }
//                     // console.log(name);

//                     const data = {
//                         userName: text
//                     }
//                     postData(`${ulr}/api/user/edit`, data, "PUT")
//                         .then(() => {
//                             location.reload()
//                         })
//                         .catch((err) => {
//                             alert(err);
//                             location.reload()
//                         })
//                 }

//             }
//         })
//     })

//     deleteuser.addEventListener("click", (e) => {
//         e.stopPropagation()
//         // alert("Are you sure you want to delete your account?");
//         if (confirm("Are you sure you want to delete your account?")) {

//             const data = {}
//             postData(`${ulr}/api/user/delete`, data, "DELETE")
//                 .then(() => {
//                     window.location.href = "./login.html"
//                 })
//                 .catch((err) => {
//                     alert(err);
//                 })
//         }
//     })


//     back.addEventListener("click", (e) => {
//         console.log("your backed");
//         e.stopPropagation()
//         section.remove()
//     })
// })



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
                send.parentElement.scrollTop = send.parentElement.scrollHeight;

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
                    const text = send.children[0].innerText
                    const presend = document.getElementById("typing")
                    if (presend) {
                        presend.style.display = "none"
                    }
                    const sendx = document.createElement("section")
                    sendx.classList.add('fixed', 'flex', 'flex-row', 'gap-4', 'justify-center', 'items-center', 'h-33', 'bottom-0', '-z-10', 'w-full', 'bg-cyan-950', 'p-2')
                    sendx.innerHTML = `<input type="text" id="edittext" name="text" autofocus class="w-need rounded-lg p-1 mt-5 bg-cyan-800 text-gray-100" value=" ${text}">
                    <svg id="doneedit" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" class="w-6 mt-5">
  <path fill-rule="evenodd" d="M19.916 4.626a.75.75 0 0 1 .208 1.04l-9 13.5a.75.75 0 0 1-1.154.114l-6-6a.75.75 0 0 1 1.06-1.06l5.353 5.353 8.493-12.74a.75.75 0 0 1 1.04-.207Z" clip-rule="evenodd" />
</svg>`

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
                                //    console.log("changed");
                                sendx.remove()
                                presend.style.display = "flex"

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

                                    sendx.remove()
                                    presend.style.display = "flex"
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




