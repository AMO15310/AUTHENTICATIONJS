const email = document.querySelector(".email");
const userName = document.querySelector(".name");
const password = document.querySelector(".password");
const confpass = document.querySelector(".pass2");
const submitbtn = document.querySelector(".submit");
const mess = document.querySelector(".mess");
const mess2 = document.querySelector(".mess2");

submitbtn.addEventListener("click", () => {
  if (!email.value || !userName.value || !password.value || !confpass.value) {
    mess.innerText = `Fill all fields..`;
    mess.style.display = "flex";
    setTimeout(() => {
      mess.style.display = "none";
    }, 3500);
    return false;
  }
  if (password.value !== confpass.value) {
    mess.innerText = `Passwords must be the same`;
    mess.style.display = "flex";
    setTimeout(() => {
      mess.style.display = "none";
    }, 3500);
    return false;
  }
  const postDetails = () => {
    const newValues = {
      name: userName.value,
      email: email.value,
      password: password.value,
    };
    const url = "http://localhost:2502/signup";
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newValues),
    })
      .then((resp) => resp.json(resp))
      .then((msg) => {
        mess2.style.display = "flex";
        mess2.innerText = msg["message"];
        setTimeout(() => {
          mess2.style.display = "none";
        }, 3500);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  postDetails();
});
