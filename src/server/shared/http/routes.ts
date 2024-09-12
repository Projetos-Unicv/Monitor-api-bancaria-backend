import { Router } from "express";
import { registroRouter } from "../../routes/Registro";
import { consultaRouter } from "../../routes/Consulta";
// import { StatusCodes } from "http-status-codes";

export const router = Router();

router.get("/", (_, res) => {
  //resposta ao conectar
  return res.send("Olá, dev!");
});

router.use("/registro", registroRouter);
router.use("/consulta", consultaRouter);
