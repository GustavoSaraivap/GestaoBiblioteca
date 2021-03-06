import express from "express";
import { Request, Response } from "express";
import {router} from "./config/routes";
import cors from "cors";
import {mongoose} from "./config/database";
const app = express();
const db = mongoose;

globalThis.ENVIRONMENT = "";
app.use(cors()); 
app.use(express.json());

app.use(router);

app.listen(3000, function(){   
    console.log("O servidor esta rodando...");
});