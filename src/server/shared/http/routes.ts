import { Router } from 'express';
import { consultaRouter } from '../../modules/Record/routes/routes';
import swaggerUI from 'swagger-ui-express';
import path from 'path';

// import { StatusCodes } from "http-status-codes";
const swaggerFilePath = path.join(__dirname, '../../docs/swagger.json');

export const router = Router();

router.get('/', (_, res) => {
  //resposta ao conectar
  return res.send('Olá, dev!');
});

// router.use("/registro", registroRouter);
router.use('/', consultaRouter);

router.use(
  '/api-docs',
  swaggerUI.serve,
  swaggerUI.setup(require(swaggerFilePath))
);
