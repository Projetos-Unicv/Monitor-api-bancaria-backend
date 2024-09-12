import { Router } from "express";
// import { StatusCodes } from "http-status-codes";

export const registroRouter = Router();

registroRouter.get("/"); // get All
registroRouter.get("/:banco"); /// get unique
