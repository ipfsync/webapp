import {JetView} from "webix-jet";
import {ui} from "webix";
import baseview = ui.baseview;

export default class NewcollectionWindowView extends JetView {
	config(): any {
		return {
			view: "window",
			head: "New Collection: IPNS",
			close: true,
			position: "top",
			modal: true,
			width: 400,
			body: {
				view: "form",
				localId: "ncform",
				elements: [
					{
						view: "switch",
						localId: "generate",
						value: 1,
						label: "Generate New IPNS?",
						labelWidth: 320,
						align: "right",
						on: {
							'onChange': (newv, oldv) => {
								let addrField = <ui.text>this.$$('addr');
								if (newv == 1) {
									addrField.disable();
								} else {
									addrField.enable();
									addrField.focus();
								}
							}
						}
					},
					{
						view: "text",
						localId: "addr",
						name: "addr",
						label: "IPNS Address",
						disabled: true,
						labelPosition: "top"
					},
					{
						margin: 10,
						cols: [
							{},
							{
								view: "button", width: 100, value: "Cancel", click: () => {
									(<ui.window>this.getRoot()).close();
								}
							},
							{view: "button", type: "form", width: 100, value: "Continue", align: "right"},
						]
					}
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