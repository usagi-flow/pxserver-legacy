import * as http from "http";
import * as redis from "redis";

import Server from "./server";

class ServerStarter
{
	protected static SOCKET : string = process.env.SOCKET || "/opt/common/ipc.socket";

	private server : Server;
	private httpServer : http.Server;
	private port : string;

	private redisIn : redis.RedisClient;
	private redisInReady : boolean = false;
	private redisOut : redis.RedisClient;
	private redisOutReady : boolean = false;

	private constructor()
	{
		this.server = Server.create();
		this.port = process.env.PORT || "3000";

		this.server.express.set("port", this.port);

		this.httpServer = http.createServer(this.server.express);
		this.httpServer.on("listening", () => this.onListening(this));
		this.httpServer.on("error", (error) => this.onError(this, error));

		//this.connectToBackend();
	}

	private connectToBackend()
	{
		console.log("Connecting to the backend");

		this.redisIn = redis.createClient(ServerStarter.SOCKET);

		this.redisIn.on("ready", () => {
			this.redisInReady = true;
			console.log("Subscribing");
			this.redisIn.subscribe("backend-to-frontend:pxserver");
		});
		this.redisIn.on("message", (channel : string, message : string) => {
			console.log("Channel <" + channel + ">: " + message);
		});

		this.redisOut = redis.createClient(ServerStarter.SOCKET);
		this.redisOut.on("ready", () => {
			this.redisOutReady = true;
			setTimeout(() => {
				console.log("Sending a message");
				this.redisOut.publish("frontend-to-backend:pxserver", "Hello from Frontend!");
			}, 3000)
		});
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
	}
}

ServerStarter.start();