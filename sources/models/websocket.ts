
export default class WSClient {
	private readonly socket: WebSocket;
	constructor() {
		this.socket = new WebSocket('ws://localhost:8080/ws');
		this.socket.addEventListener('open', function (event) {
			console.log("Websocket connected.")
		});

		this.socket.addEventListener('message', function (event) {
			console.log('Message from server ', event.data)
		});
	}

}

