const sign = document.querySelector(".sign");
const title = document.querySelector(".title");
const input2 = document.querySelector(".inpts2");
const log = document.querySelector(".log");
const submitbtn = document.querySelector(".submit");
const email = document.querySelector(".email");
const password = document.querySelector(".password");
const mess = document.querySelector(".mess");

submitbtn.addEventListener("click", () => {
  console.log(email.value, password.value);
  if (!email.value || !password.value) {
    mess.style.backgroundColor = "#441711";
    mess.style.color = "#cd7c74";
    mess.style.display = "flex";
    mess.innerText = "Please fill all fields";
    setTimeout(() => {
      mess.style.display = "none";
    }, 3500);
    return false;
  }
  const details = {
    email: email.value,
    password: password.value,
  };
  const url = "http://localhost:2502/login";
  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(details),
  })
    .then((resp) => resp.json())
    .then((msg) => {
      // console.log(msg["token"]);
      mess.innerText = msg["message"];
      mess.style.display = "flex";
      setTimeout(() => {
        mess.style.display = "none";
      }, 3500);
      localStorage.setItem("token", msg.token);
      msg.message == "Log in Succesful" ? login.redirect() : "";
    });
});

class auth {
  token = localStorage.getItem("token");
  redirect() {
    this.token
      ? (location.href = "/frontend/next.html")
      : (location.href = "#");
  }
}

const login = new auth();
