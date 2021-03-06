import {JetView} from "webix-jet";
import {ui} from "webix";
import sidebar = ui.sidebar;
import PeersWindowView from "../views/windows/peers"
import {peers} from "models/peers";
import ws from "models/websocket";
import icon = ui.icon;
import NewcollectionWindowView from "views/windows/newcollection";

export default class TopView extends JetView {
	private peer_window: PeersWindowView;

	config() {
		const header = {
			view: "toolbar",
			elements: [
				{view: "label", label: "IPFSync", align: "center"},
				{
					view: "icon", icon: "mdi mdi-link-plus", tooltip: "Add Collection"
				},
				{
					view: "icon", icon: "mdi mdi-file-document-outline", tooltip: "New Collection",
					click: () => {
						let newcollection_window = <NewcollectionWindowView>this.ui(NewcollectionWindowView);
						newcollection_window.showWindow();
					}
				},
			]
		};

		const menu_data = [
			{
				id: "collections", icon: "mdi mdi-file-cabinet", value: "Collections", data: [
					{id: "collections_all", value: "Synced"},
					{id: "collections_my", value: "My"}
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
				{},
				{
					view: "icon", localId: "peersIcon", icon: "mdi mdi-resistor-nodes",
					value: 0,
					tooltip: "#value# peer(s) connected.",
					click: function() {
						this.$scope.peer_window.showWindow(this.$view);
					}
				}
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
		(<sidebar>this.$$('sidebar')).openAll();
		this.peer_window = <PeersWindowView>this.ui(PeersWindowView);

		// Start Websocket
		ws.open();

		// Peers DataCollection event
		let peersIcon = <icon>this.$$('peersIcon');
		peers.attachEvent("onAfterLoad", () => {
			peersIcon.setValue(peers.count().toString())
		})

		// TODO: Request peers info once
	}
}