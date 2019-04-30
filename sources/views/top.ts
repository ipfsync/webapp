import {JetView, plugins} from "webix-jet";


export default class TopView extends JetView{
	config(){
		const header = {
			view:"toolbar",
			elements: [
				{ view: "icon", icon: "mdi mdi-menu",
					width: 37, align: "left", click: () => {
						// this.$$("$sidebar1").toggle();
					}
				},
				{ view: "label", label: "My App"},
				{},
				{ view: "icon", width: 45, icon: "mdi mdi-comment",  badge:4},
				{ view: "icon", width: 45, icon: "mdi mdi-bell",  badge:10}
			]
		};

		const menu_data = [
			{id: "collections", icon: "mdi mdi-view-dashboard", value: "Dashboards",  data:[
					{ id: "dashboard1", value: "Dashboard 1"},
					{ id: "dashboard2", value: "Dashboard 2"}
				]},
			{id: "transfers", icon: "mdi mdi-view-column", value:"Layouts", data:[
					{ id: "accordions", value: "Accordions"},
					{ id: "portlets", value: "Portlets"}
				]},
		];

		const sidebar = {

		};

		return {
			rows: [
				header,
				{
					cols: [
						{$subview: true}
					]
				}
			]
		};
	}
	init(){
		// this.use(plugins.Menu, "top:menu");
	}
}