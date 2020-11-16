const express = require("express");
const router = require("../src/server/api");
const request = require("supertest");
const app = express();
const { ROOMS } = require("../src/server/ROOMS");
const Player = require("../src/server/classes/Player");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/api", router);
let server;

beforeAll((done) => {
	server = app.listen(5000, done);
});
afterAll((done) => {
	server.close(done);
});

describe("api", () => {
	it("tests POST /room", async () => {
		const res = await request(app).post("/api/room").type("form").send({
			roomName: "room",
			userName: "wpark",
		});
		expect(res.status).toBe(200);
		expect(res.body.error).toBeUndefined();

		const game = ROOMS.get("room");
		game.addPlayer(new Player("myId", "wpark"));
	});
	it("tests POST /room when user is already in", async () => {
		const res = await request(app).post("/api/room").type("form").send({
			roomName: "room",
			userName: "wpark",
		});
		expect(res.status).toBe(403);
		expect(res.body.error).toBe("Username(wpark) is already taken.");
	});
	it("tests POST /room when room is already exist", async () => {
		const res = await request(app).post("/api/room").type("form").send({
			roomName: "room",
			userName: "toto",
		});
		expect(res.status).toBe(200);
		expect(res.body.error).toBeUndefined();
		const game = ROOMS.get("room");
		game.addPlayer(new Player("otherId1", "toto"));
	});

	it("tests POST /room when room is full (3)", async () => {
		const game = ROOMS.get("room");
		game.addPlayer(new Player("otherId2", "tutu"));

		const res = await request(app).post("/api/room").type("form").send({
			roomName: "room",
			userName: "hehe",
		});
		expect(res.status).toBe(403);
		expect(res.body.error).toBe("Room(room) is full.");
	});
	it("tests GET /room", async () => {
		const game = ROOMS.get("room");
		game.removePlayerById("otherId2");

		const res = await request(app)
			.get("/api/room")
			.query({ roomName: "room", userName: "hihi" });
		expect(res.status).toBe(200);
		expect(res.body.error).toBeUndefined();
	});
	it("tests GET /room when room doens't exist", async () => {
		const res = await request(app)
			.get("/api/room")
			.query({ roomName: "room2", userName: "hihi" });
		expect(res.status).toBe(403);
		expect(res.body.error).toBe("Room(room2) doesn't exist");
	});
	it("tests GET /room when room doens't exist", async () => {
		const res = await request(app)
			.get("/api/room")
			.query({ roomName: "room2", userName: "hihi" });
		expect(res.status).toBe(403);
		expect(res.body.error).toBe("Room(room2) doesn't exist");
	});
	it("tests GET /room when username is already taken", async () => {
		const res = await request(app)
			.get("/api/room")
			.query({ roomName: "room", userName: "wpark" });
		expect(res.status).toBe(403);
		expect(res.body.error).toBe("User(wpark) is already taken.");
	});
	it("tests GET /room when room is full", async () => {
		const game = ROOMS.get("room");
		game.isStarted = true;
		const res = await request(app)
			.get("/api/room")
			.query({ roomName: "room", userName: "hihi" });
		expect(res.status).toBe(403);
		expect(res.body.error).toBe("Room(room) is in game.");
	});
	it("tests GET /room when room is full", async () => {
		const game = ROOMS.get("room");
		game.addPlayer(new Player("otherId2", "tutu"));
		const res = await request(app)
			.get("/api/room")
			.query({ roomName: "room", userName: "hihi" });
		expect(res.status).toBe(403);
		expect(res.body.error).toBe("Room is full.");
	});
});
