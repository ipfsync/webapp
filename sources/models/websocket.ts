import {peers} from "models/peers";

export default class WSClient {
	private socket: WebSocket;
	private readonly url: string;
	private readonly autoReconnectInterval: number;

	constructor(url: string) {
		this.url = url;
		this.autoReconnectInterval = 5 * 1000;
	}

	public open() {
		this.socket = new WebSocket(this.url);
		this.socket.addEventListener('open', (e) => {
			console.log("WSClient: connected.")
		});

		this.socket.addEventListener('message', (e) => {
			let msg = JSON.parse(e.data);

			console.log('WSClient: message from server ', msg);

			WSClient.onMessage(msg)
		});

		this.socket.addEventListener('close', (e) => {
			if (e.code !== 1000) {
				this.reconnect(e);
			} else {
				console.log("WSClient: closed");
			}
		});

		this.socket.addEventListener('error', (e) => {
			console.error("WSClient error:", e);
		});
	}

	private static onMessage(msg) {
		switch (msg.Event) {
			case 'peers':
				let peersinfo = msg.Data.peers;

				for (let [idx, p] of peersinfo.entries()) {
					peersinfo[idx]['id'] = p['Address']
				}

				peers.clearAll(true);
				peers.parse(peersinfo, 'json')
		}
	}

	private reconnect(e: CloseEvent) {
		console.log(`WSClient: retry in ${this.autoReconnectInterval}ms`, e);
		let that = this;
		setTimeout(function () {
			console.log("WSClient: reconnecting...");
			that.open();
		}, this.autoReconnectInterval);
	}

}

