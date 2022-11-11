const token = localStorage.getItem("token");
!token ? (location.href = "../index.html") : "";

const url = "http://localhost:2502/assets";
fetch(url, {
  method: "GET",
  headers: {
    token: token,
  },
})
  .then((resp) => resp.json())
  .then((msg) => {
    console.log(msg.message);
    msg.message == "invalid signature" || msg.message == "jwt malformed"
      ? (location.href = "../index.html")
      : "";
  });
