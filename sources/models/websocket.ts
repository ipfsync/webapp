import {peers} from "models/peers";

export default class WSClient {
	private readonly socket: WebSocket;
	constructor() {
		this.socket = new WebSocket('ws://localhost:8080/ws');
		this.socket.addEventListener('open', function (event) {
			console.log("Websocket connected.")
		});

		this.socket.addEventListener('message', function (event) {
			let msg = JSON.parse(event.data);

			console.log('Message from server ', msg);

			switch (msg.Event) {
				case 'peers':
					let peersinfo = msg.Data.peers;

					for (let [idx, p] of peersinfo.entries()) {
						peersinfo[idx]['id'] = p['Address']
					}

					peers.clearAll(true);
					peers.parse(peersinfo, 'json')
			}

		});
	}

}

