//node server here...
const io = require("socket.io")(8000); //requiring socket.io


const users = {};

io.on("connection", (socket) => {
  console.log("usermane");
  socket.on("join", (name) => {
    console.log("usermane", name);
    users[socket.id] = name;
    socket.broadcast.emit("joined", name);
  });

  socket.on("send", (message) => {
    socket.broadcast.emit("received", {
      message: message,
      name: users[socket.id],
    });
  });

  socket.on("disconnect", (mess) => {
    socket.broadcast.emit("disconnected", users[socket.id]);
    delete users[socket.id];
  });
});
