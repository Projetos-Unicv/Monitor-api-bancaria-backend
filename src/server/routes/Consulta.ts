import { Router } from "express";
// import { StatusCodes } from "http-status-codes";

export const consultaRouter = Router();

consultaRouter.get("/"); // get all
consultaRouter.get("/:banco"); // get unique
