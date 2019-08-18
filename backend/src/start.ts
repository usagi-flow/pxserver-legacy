import * as http from "http";

import Server from "./server";
import { AddressInfo } from "net";

class ServerStarter
{
	private server : Server;
	private httpServer : http.Server;
	private port : string;

	private constructor()
	{
		this.server = Server.create();
		this.port = process.env.PORT || "3000"; // TODO: port normalization and configuration

		this.server.express.set("port", this.port);

		this.httpServer = http.createServer(this.server.express);
		this.httpServer.on("listening", () => this.onListening(this));
		this.httpServer.on("error", (error) => this.onError(this, error));
	}

	private start() : void
	{
		this.httpServer.listen(this.port);
	}

	private onListening(starter : ServerStarter) : void
	{
		var bind : string | AddressInfo = starter.httpServer.address();
		console.log("Listening on port " + starter.port);
	}

	private onError(starter : ServerStarter, error : Error) : void
	{
		throw error;
	}

	public static start() : void
	{
		var starter : ServerStarter = new ServerStarter();

		starter.start();
	}
}

class HTTPBind
{
	public port : number;
	public family : string;
	public address : string;
}

ServerStarter.start();