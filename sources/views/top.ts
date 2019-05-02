import {JetView, plugins} from "webix-jet";
import {ui} from "webix";
import sidebar = ui.sidebar;


export default class TopView extends JetView {
	config() {
		const header = {
			view: "toolbar",
			elements: [
				{view: "label", label: "IPFSync", align: "center"},
			]
		};

		const menu_data = [
			{
				id: "collections", icon: "mdi mdi-file-cabinet", value: "Collections", data: [
					{id: "collections_all", value: "All Collections"},
					{id: "collections_my", value: "My Collections"}
				]
			},
			{
				id: "transfers", icon: "mdi mdi-download-multiple", value: "Transfers", data: [
					{id: "transfers_all", value: "All"},
					{id: "transfers_downloading", value: "Downloading"},
					{id: "transfers_completed", value: "Completed"},
				]
			},
		];

		const sidebar = {
			view: "sidebar",
			localId: "sidebar",
			multipleOpen: true,
			data: menu_data
		};

		const footer = {
			view: "toolbar",
			elements: [
				{view: "label", label: "Ready."},
			]
		};

		return {
			rows: [
				header,
				{
					cols: [
						sidebar,
						{$subview: true}
					]
				},
				footer
			]
		};
	}

	init() {
		(<sidebar>this.$$('sidebar')).openAll()
	}
}