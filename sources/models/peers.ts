import {DataCollection} from "webix";

export const peers = new DataCollection();

peers.parse([
	{id: 1, addr: "test"}
], 'json');