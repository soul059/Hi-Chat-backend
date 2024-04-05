let ulr = "https://hi-chat-t4sd.onrender.com";
// let ulr = "http://localhost:8000";

(async function currentUser() {
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
            let utcTimestamp = user.createdAt;
            let time = new Date(utcTimestamp).toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
            document.getElementById("Username").innerText = user.userName;
            document.getElementById("email").innerText = user.email;
            document.getElementById("joined").innerText = time;
            utcTimestamp = user.updatedAt;
            time = new Date(utcTimestamp).toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
            document.getElementById("update").innerText ="updated: " + time;
        })
        .catch((err) => {
              alert(err);
            
            throw new Error(err);
        })
})();
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
                        window.location.href = "./index.html"
                    })
                    .catch((err) => {
                        alert(err,"or username might be taken");
                        window.location.href = "./index.html"
                        throw new Error("username might be taken")
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
                            window.location.href = "./index.html"
                        })
                        .catch((err) => {
                            alert(err,"or username might be taken");
                            window.location.href = "./index.html"
                            throw new Error("username might be taken")
                            
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
        window.location.href = "./index.html"
    })