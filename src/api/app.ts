import bodyParser from "body-parser";
import compression from "compression";
import express from "express";
import lusca from "lusca";
require("dotenv").config();

// Controllers (route handlers)
import InMemoryGeniallyRepository from "../contexts/core/genially/infrastructure/InMemoryGeniallyRepository";
import CreateGeniallyService from "../contexts/core/genially/application/CreateGeniallyService";
import DeleteGeniallyService from "../contexts/core/genially/application/DeleteGeniallyService";
import RenameGeniallyService from "../contexts/core/genially/application/RenameGeniallyService";
import { GeniallyController } from "./controllers/genially";
import * as healthController from "./controllers/health";

import connectMongoDB from "../contexts/core/genially/infrastructure/connections/mongo";
import MongoGeniallyRepository from "../contexts/core/genially/infrastructure/MongoGeniallyRepository";

// Dependency Injection 
// const geniallyRepository = new InMemoryGeniallyRepository();
const geniallyRepository = new MongoGeniallyRepository();
const createGeniallyService = new CreateGeniallyService(geniallyRepository);
const deleteGeniallyService = new DeleteGeniallyService(geniallyRepository);
const renameGeniallyService = new RenameGeniallyService(geniallyRepository);
const geniallyController = new GeniallyController(
    createGeniallyService, 
    deleteGeniallyService, 
    renameGeniallyService);


// Create Express server
const app = express();

connectMongoDB();

// Express configuration
app.set("port", process.env.PORT || 3000);
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(lusca.xframe("SAMEORIGIN"));
app.use(lusca.xssProtection(true));

// Primary app routes
app.get("/", healthController.check);
app.post("/genially/", (req, res) => geniallyController.create(req, res));
app.delete("/genially/:id", (req, res) => geniallyController.delete(req, res));
app.put("/genially/:id", (req, res) => geniallyController.rename(req, res))

export default app;
