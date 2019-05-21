import {JetView} from "webix-jet";
import {ui} from "webix";
import baseview = ui.baseview;
import {peers} from "models/peers"
import datatable = ui.datatable;
import ws from "models/websocket";

export default class PeersWindowView extends JetView {
	config(): any {
		return {
			view: "window",
			head: "Connected Peers",
			close: true,
			move: true,
			position: "center",
			body: {
				view: "datatable",
				localId: "dtable",
				// autoConfig: true,
				// header: false,
				columns: [
					{id: "Address", header: "MultiAddr", fillspace: true},
					{id: "Latency", header: "Latency"},
				]
			}
		}
	}

	init(): void {
		(<datatable>this.$$('dtable')).sync(peers, null, null)
	}

	showWindow(): any {
		// Request peers once
		ws.sendCommand('peers', null, msg => {
			if (msg.Ok) {
				let peersinfo = msg.Data.peers;

				peersinfo.forEach((p, idx) => {
					peersinfo[idx]['id'] = p['Address']
				});

				peers.clearAll(true);
				peers.parse(peersinfo, 'json')
			} else {
				console.error(msg.Error.Message)
			}
		});

		(<baseview>this.getRoot()).show();
	}
}