const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoutes");
const messagesRoutes = require("./routes/messagesRoute");

const app = express();
require("dotenv").config();

app.use(cors());
app.use(express.json());

app.use("/api/auth", userRoutes);
app.use("/api/messages", messagesRoutes);

mongoose

  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB Connection Successfull");
  })
  .catch((err) => {
    console.log(err.message);
  });

const server = app.listen(process.env.PORT, () => {
  console.log(`Server is running on PORT ${process.env.PORT}`);
});

//--------------SOCEKT IO--------------------
//Connection to Socket.io
// Körs varje gång en klient får en connection till servern
const io = require("socket.io")(server, {
  cors: {
    origin: ["http://localhost:3000"],
    Credentials: true,
  },
});

global.onlineUsers = new Map();

io.on("connection", (socket) => {
  // När det finns en connection sparas userId och current-socket.id i onlineUsers
  socket.on("add-user", (userId) => {
    onlineUsers.set(userId, socket.id);
  });

  //När send-msg emittas
  socket.on("send-msg", (msgData) => {
    const sendUserSocket = onlineUsers.get(msgData.to);

    if (sendUserSocket) {
      socket.to(sendUserSocket).emit("msg-recieve", msgData.message);
    }
  });
});
