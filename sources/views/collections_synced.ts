import {IJetApp, JetView} from "webix-jet";

export default class CollectionsSyncedView extends JetView {
	constructor(app: IJetApp, config: any) {
		super(app, config);
	}

	config(): any {
		return {
			view: "tabview",
			tabbar: {
				optionWidth: 200,
			},
			cells: [
				{
					header: "Synced Collections",
					close: false,
					body: {
						view: "datatable",
						columns: [
							{header: "Name", fillspace: 1},
							{header: "Description", fillspace: 3},
						]
					}
				}
			]
		}
	}
}