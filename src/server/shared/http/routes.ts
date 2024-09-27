import { Router } from 'express';
// import { registroRouter } from "../../routes/Registro";
import { consultaRouter } from '../../modules/Registros/routes/routes';

// import { StatusCodes } from "http-status-codes";

export const router = Router();

router.get('/', (_, res) => {
  //resposta ao conectar
  return res.send('Olá, dev!');
});

// router.use("/registro", registroRouter);
router.use('/', consultaRouter);
