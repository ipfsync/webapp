import {JetView} from "webix-jet";
import {ui} from "webix";
import baseview = ui.baseview;

export default class NewcollectionWindowView extends JetView {
	config(): any {
		return {
			view: "window",
			head: "New Collection: IPNS",
			close: true,
			move: true,
			position: "center",
			modal: true,
			body: {
				view: "form",
				localId: "dtable",
				elements: [
					{ view: "switch", value: 1, label:"Generate New IPNS" },
				]
			}
		}
	}

	init(): void {
	}

	showWindow(): any {
		(<baseview>this.getRoot()).show();
	}
}