import * as http from "http";

import Server from "./server";

class ServerStarter
{
	private server : Server;
	private httpServer : http.Server;
	private port : string;

	private constructor()
	{
		this.server = Server.create();
		this.port = process.env.PORT || "3000";

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
		console.log("Listening on http://localhost:" + starter.port);
	}

	private onError(starter : ServerStarter, error : Error) : void
	{
		throw error;
	}

	public static start() : void
	{
		var starter : ServerStarter = new ServerStarter();

		starter.start();

		console.log("Connecting to the backend");
		let options : http.RequestOptions = {
			socketPath: "/opt/common/ipc.socket" // TODO: magic
		};
		http.request(options, (response) => {
			console.log("Received IPC response");
			console.log(response);
		});
	}
}

ServerStarter.start();