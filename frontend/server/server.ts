"use strict";

import * as express from "express";
import * as path from "path";

import Model from "./model";
import IndexRoute from "./routes/index-route";

export default class Server
{
	protected static SERVER_SIDE_VIEWS : boolean = false;

	public express : express.Application;
	public model : Model;

	private constructor()
	{
		console.log("Initializing server");
		this.express = express();
		this.model = new Model();
		this.configure();
	}

	private configure() : void
	{
		if (Server.SERVER_SIDE_VIEWS)
		{
			console.log("Setting up view engine for directory: " + path.join(__dirname, "views"));
			this.express.set("views", path.join(__dirname, "views"));
			this.express.set("view engine", "hbs");
			
			console.log("Setting up routes");
			this.express.use("/", new IndexRoute(this.model).getRouter());
			this.express.use(express.static(path.join(__dirname, "public")));
			this.express.use(this.fallbackHandler);
		}
		else
		{
			console.log("Setting up routes");
			this.express.use(express.static(path.join(__dirname, "public")));
			this.express.use(this.fallbackHandler);
		}
	}

	private fallbackHandler(request : express.Request, response : express.Response, next : express.NextFunction) : void
	{
		response.statusCode = 404;
		response.send("<!DOCTYPE html><html><body>404 - Not found</body></html>");
	}

	public static create() : Server
	{
		return new Server();
	}
}

class HTTPError extends Error
{
	public status : number;
}