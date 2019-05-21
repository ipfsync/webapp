import {peers} from "models/peers";
import * as uuidv1 from "uuid/v1"
import uuid = require("uuid");

interface MessageCmd {
	id: string,
	cmd: string,
	data?: any,
}

interface MessageError {
	code: number,
	message: string,
}

interface MessageReply {
	id: string,
	ok: boolean,
	data?: any,
	error?: MessageError,
}

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

	public sendCommand(cmd: string, data: any, callback: (msg: MessageReply) => void) {
		let id = uuidv1()

		let msg: MessageCmd = {
			id: id,
			cmd: cmd,
			data: data
		};
		this.socket.send(JSON.stringify(msg))

		// TODO: register callback
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

