import {IJetApp, JetView} from "webix-jet";

export default class CollectionEditorView extends JetView {
	constructor(app: IJetApp, config: any) {
		super(app, config);
	}

	config(): any {
		return {
			view: "form",
			elements: [
				{view: "text", label: "Name", name: "name"},
				{view: "textarea", label: "Description", name: "description"},
				{view: "button", value: "Save", inputWidth: 200, align: "right"},
			],
			elementsConfig: {
				labelPosition: "top",
			},
		}
	}
}