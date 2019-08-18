import * as http from "http";
import * as io from "socket.io";

import Server from "./server";

class ServerStarter
{
	protected static SOCKET : string = process.env.SOCKET || "/opt/common/ipc.socket";
	//private server : Server;
	private httpServer : http.Server;

	private constructor()
	{
		//this.server = Server.create();

		//this.server.express.set("port", this.port);

		this.httpServer = http.createServer(this.handler);
		this.httpServer.on("listening", () => this.onListening(this));
		this.httpServer.on("connection", () => this.onConnection(this));
		this.httpServer.on("error", (error) => this.onError(this, error));
	}

	private start() : void
	{
		this.httpServer.listen(ServerStarter.SOCKET);
	}

	private handler(request : http.IncomingMessage, response : http.ServerResponse)
	{
		response.end("Goodbye");
	}

	private onListening(starter : ServerStarter) : void
	{
		console.log("Listening on socket " + ServerStarter.SOCKET);
	}

	private onConnection(starter : ServerStarter) : void
	{
		console.log("Someone connected to " + ServerStarter.SOCKET);
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

ServerStarter.start();