import {peers} from "models/peers";
import * as uuidv1 from "uuid/v1"

interface MessageCmd {
	Id: string,
	Cmd: string,
	Data?: any,
}

interface MessageError {
	Code: number,
	Message: string,
}

interface MessageReply {
	Id: string,
	Ok: boolean,
	Data?: any,
	Error?: MessageError,
}

type CmdCallback = (msg: MessageReply) => void

class WSClient {
	private socket: WebSocket;
	private readonly url: string;
	private readonly autoReconnectInterval: number;
	private cmdCallbacks: Map<string, CmdCallback> = new Map<string, CmdCallback>();

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

			this.onMessage(msg)
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

	public sendCommand(cmd: string, data: any, callback: CmdCallback) {
		let id = uuidv1();

		let msg: MessageCmd = {
			Id: id,
			Cmd: cmd,
			Data: data
		};
		this.socket.send(JSON.stringify(msg));

		this.cmdCallbacks.set(id, callback);
	}

	private onMessage(msg) {
		if (msg.Id == null) {
			// Broadcast message
			switch (msg.Event) {
				case 'peers':
					let peersinfo = msg.Data.peers;

					peersinfo.forEach((p, idx) => {
						peersinfo[idx]['id'] = p['Address']
					});

					peers.clearAll(true);
					peers.parse(peersinfo, 'json')
			}
		} else {
			// Command reply message
			if (this.cmdCallbacks.has(msg.Id)) {
				this.cmdCallbacks.get(msg.Id)(msg)
			}
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

const ws = new WSClient('ws://localhost:8080/ws');
export default ws;