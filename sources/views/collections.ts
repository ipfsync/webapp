import {IJetApp, JetView} from "webix-jet";

export default class CollectionsView extends JetView {
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
					header: "Collections",
					close: false,
					body: {
						view: "datatable",
						columns: [
							{header: "Name"},
							{header: "Description"},
						]
					}
				}
			]
		}
	}
}