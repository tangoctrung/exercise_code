const express = require('express');
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bodyparser = require("body-parser");
const cors = require('cors');
const socketServer = require("./socketServer");

const app = express();

const userRouter = require('./router/userRouter');
const codeRouter = require('./router/codeRouter');
const citizenRouter = require('./router/citizenRouter');
const censusRouter = require('./router/censusRouter');
const postRouter = require('./router/postRouter');
const mailRouter = require('./router/mailRouter');


// config middleware
app.use(cors());
dotenv.config();
app.use(express.json());
// app.use(bodyparser.urlencoded({ extended: true }));
// app.use(bodyparser.json());


// kết nối db
// mongodb+srv://trungtn:tnkg23072001@cluster0.xspgv.mongodb.net/CitizenV?retryWrites=true&w=majority
mongoose
  .connect("mongodb://localhost:27017/CitizenV", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(console.log("MongoDB is connected"))
  .catch((err) => console.error(err));

// Socket
const httpServer = require('http').createServer(app);
const io = require("socket.io")(httpServer, {
  cors: {
    origin: "https://localhost:3000",
  },
});
io.on("connection", (socket) => {
  socketServer(socket);
});

// setup router
app.use("/api", userRouter);
app.use("/api", codeRouter);
app.use("/api", citizenRouter);
app.use("/api", censusRouter);
app.use("/api", postRouter);
app.use("/api", mailRouter);


const PORT = process.env.PORT || 8800;
httpServer.listen(PORT, () => {
  console.log("server is running on port 8800");
});