let ulr = "https://hi-chat-t4sd.onrender.com";
// let ulr = "http://localhost:8000";

let user;
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
            document.getElementById("update").innerText = "updated: " + time;
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
    sendx.classList.add('fixed', 'flex', 'flex-row', 'gap-4', 'justify-center', 'items-center', 'h-33', 'bottom-0', 'z-50', 'w-full', 'bg-cyan-950', 'p-2')
    sendx.innerHTML = `<input type="text" id="edittext" name="text" class="w-need rounded-lg p-1 mt-5 bg-cyan-800 text-gray-100" value=" ${user.userName}">
                    <svg id="doneedit" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" class="w-6 mt-5">
  <path fill-rule="evenodd" d="M19.916 4.626a.75.75 0 0 1 .208 1.04l-9 13.5a.75.75 0 0 1-1.154.114l-6-6a.75.75 0 0 1 1.06-1.06l5.353 5.353 8.493-12.74a.75.75 0 0 1 1.04-.207Z" clip-rule="evenodd" />
</svg>`

    document.getElementById("sec").appendChild(sendx)

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
                    alert(err, "or username might be taken");
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
                        alert(err, "or username might be taken");
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