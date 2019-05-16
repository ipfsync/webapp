import {JetView} from "webix-jet";
import {ui} from "webix";
import baseview = ui.baseview;
import {peers} from "models/peers"
import datatable = ui.datatable;

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
				header: false,
				columns: [
					{id: "Address", header: "MultiAddr", fillspace: true}
				]
			}
		}
	}

	init(): void {
		(<datatable>this.$$('dtable')).sync(peers, null, null)
	}

	showWindow(): any {
		(<baseview>this.getRoot()).show();
	}
}