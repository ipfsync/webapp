import {JetView} from "webix-jet";
import {ui} from "webix";
import baseview = ui.baseview;

export default class PeersWindowView extends JetView {
	config(): any {
		return {
			view: "window",
			head: "Connected Peers",
			close: true,
			move: true,
			position:"center",
			body: {
				view: "datatable",
				columns: [
					{id: "addr", header: "MultiAddr"}
				]
			}
		}
	}

	showWindow(): any {
		(<baseview>this.getRoot()).show();
	}
}