import {JetView} from "webix-jet";
import {ui} from "webix";
import sidebar = ui.sidebar;
import PeersWindowView from "../views/windows/peers"
import {peers} from "models/peers";
import WSClient from "models/websocket";
import icon = ui.icon;

export default class TopView extends JetView {
	private peer_window: PeersWindowView;

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
				{},
				{
					view: "icon", localId: "peersIcon", icon: "mdi mdi-resistor-nodes",
					value: 0,
					tooltip: "#value# peer(s) connected.",
					click: () => {
						this.peer_window.showWindow()
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
		let ws = new WSClient('ws://localhost:8080/ws');
		ws.open();

		// Peers DataCollection event
		let peersIcon = <icon>this.$$('peersIcon');
		peers.attachEvent("onAfterLoad", () => {
			peersIcon.setValue(peers.count().toString())
		})

		// TODO: Request peers info once
	}
}