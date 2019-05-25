import {JetView} from "webix-jet";
import {ui} from "webix";
import baseview = ui.baseview;
import {peers} from "models/peers"
import datatable = ui.datatable;
import ws from "models/websocket";
import popup = ui.popup;

export default class PeersWindowView extends JetView {
	config(): any {
		return {
			view: "popup",
			head: "Connected Peers",
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

	showWindow(widget): any {
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

		(<popup>this.getRoot()).show(widget, {pos: "top"});
	}
}