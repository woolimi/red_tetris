const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
	res.send('<h1>Hello world</h1>');
});

io.on('connection', (socket) => {
	console.log(`client "${socket.id}" connected`);
	socket.on('disconnect', () => {
		console.log(`user ${socket.id} disconnected`);
	});
})

server.listen(PORT, () => console.log(`server has started http://localhost:${PORT}`));
