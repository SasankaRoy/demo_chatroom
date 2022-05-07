//
// getting the elements here...
//
const container = document.getElementById("container");
const left = document.getElementById("left");
const right = document.getElementById("right");
const message = document.getElementById("messageInt");
const submit = document.getElementById("submit");

//
// socket connection...
//
const socket = io("http://localhost:8000", { transports: ["websocket"] });

const userName = prompt("Enter username");

socket.emit("join", userName);

const userjoined = (message, position) => {
  const mess = document.createElement("div");
  mess.innerText = message;
  mess.classList.add("messages");
  mess.classList.add(position);
  container.append(mess);
};

socket.on("joined", (name) => {
  confirm(`${name}  joined `);
});

submit.addEventListener("click", (event) => {
  event.preventDefault();
  const messages = message.value;
  console.log(messages);
  userjoined(`You:${messages}`, "right");
  socket.emit("send", messages);
  message.value = "";
});

socket.on("received", (data) => {
  userjoined(`${data.name}: ${data.message}`, "left");
});
socket.on("disconnected", (data) => {
  confirm(`${data} leave the room`);
});

// ScrollReveal
const sr = ScrollReveal({
  duration: 2500,
  distance: "60px",
});
sr.reveal(".header", { delay: 600 });
sr.reveal(".right", { origin: "right", delay: 600 });
sr.reveal(".left", { origin: "left", delay: 600 });
sr.reveal(".messageInt", { delay: 500 });
sr.reveal(".submit", { delay: 500 });
