import * as express from "express";
import Model from "../model";

export default class IndexRoute
{
	private router : express.Router;
	private model : Model;

	public constructor(model : Model)
	{
		this.router = express.Router();
		this.model = model;
		this.router.get("/test-message",
			(request : express.Request, response : express.Response, next : express.NextFunction) =>
				this.testMessage(model, request, response, next));
		this.router.get("/",
			(request : express.Request, response : express.Response, next : express.NextFunction) =>
				this.handler(model, request, response, next));
	}

	private handler(model : Model, request : express.Request, response : express.Response, next : express.NextFunction) : void
	{
		console.log("Handling Index route request");
		response.render("index", {title: "Express"});
	}

	private testMessage(model : Model, request : express.Request, response : express.Response, next : express.NextFunction) : void
	{
		response.setHeader("Access-Control-Allow-Origin", "*");
		response.setHeader("content-type", "text/plain");
		response.setHeader("Cache-Control", "no-store");
		response.send("Hello world!");
	}

	public getRouter() : express.Router
	{
		return this.router;
	}
}