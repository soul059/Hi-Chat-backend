
let ulr = "https://hi-chat-t4sd.onrender.com";
// let ulr = "http://localhost:8000";

let room = window.localStorage.getItem("room");


let user;
let count = 0;

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


async function chatget(room) {
    await getRoom(`${ulr}/api/chat/${room}`, "GET")

        .then(async (res) => {
            // console.log(res);
            // inroom = false;
            
            const back = document.getElementById("back")
            back.addEventListener("click", (e) => {
                e.stopPropagation()
                location.href = `${ulr}/index.html`
            })
            const home = document.getElementById("home")
            home.addEventListener("click", (e) => {
                e.stopPropagation()
                location.href = `${ulr}/index.html`
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
            let index_res = 0;
            if (allchat.length > res.data[0].length) {
                for (let i = 0; i < allchat.length; i++) {
                    if (allchat[i].id != res.data[0][index_res]._id) {
                        allchat[i].remove()
                        count--;
                        index_res++;
                        // console.log(index);
                    }
                    else {
                        index_res++;
                    }
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

chatget(window.localStorage.getItem("room"));


window.onbeforeunload = () =>{
    // window.localStorage.removeItem("room");
}