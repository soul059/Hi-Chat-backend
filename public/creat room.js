let ulr = "https://hi-chat-t4sd.onrender.com"
// let ulr = "http://localhost:8000"

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
                location.href = "index.html";
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
        window.location.href = `index.html`;
    })