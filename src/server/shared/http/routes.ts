import { Router } from 'express';
// import { StatusCodes } from "http-status-codes";
import { consultaRouter } from '../../modules/Record/routes/routes';
import swaggerUI from 'swagger-ui-express';
import path from 'path';
import 'dotenv/config'; // Importando variáveis de ambiente

export const router = Router();

let path_swagger;
if (process.env.NODE_ENV === 'production') {
  path_swagger = '/server/docs/swagger.js';
} else {
  path_swagger = '../../docs/swagger.json';
}
const swaggerFilePath = path.join(__dirname, path_swagger);

router.use(
  '/api-docs',
  swaggerUI.serve,
  swaggerUI.setup(require(swaggerFilePath))
);

router.get('/', (_, res) => {
  //resposta ao conectar
  return res.send('Olá, dev!');
});

router.use('/', consultaRouter);
