const path = require("path");
const express = require("express");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server, { path: "/socket" });
const PORT = process.env.PORT || 5000;
const cors = require("cors");
const apiRouter = require("./api");
const corsOptions = {
	origin: process.env.DOMAIN || "http://localhost:8080",
};
const SocketManager = require("./classes/SocketManager");

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api", apiRouter);
app.use(express.static(path.resolve("dist")));
app.get("/", (req, res) => {
	res.sendFile("index.html", {
		root: path.resolve("./dist"),
	});
});

io.on("connection", (socket) => {
	const socketManager = new SocketManager(io, socket);
	socketManager.on();
});

server.listen(PORT);
