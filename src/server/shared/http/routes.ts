import { Router } from 'express'; // router do express
import { consultaRouter } from '../../modules/Record/routes/routes'; //
import swaggerUI from 'swagger-ui-express'; // swagger
import path from 'path';
import 'dotenv/config'; // Importando variáveis de ambiente

export const router = Router();

let path_swagger;
// verificação se o projeto é de produção ou desenvolvimento, e com base nisso, achar o swagger
if (process.env.NODE_ENV === 'production') {
  path_swagger = '/server/docs/swagger.js';
} else {
  path_swagger = '../../docs/swagger.json';
}
const swaggerFilePath = path.join(__dirname, path_swagger); // caminho do swagger

// rota da documentação
router.use(
  '/api-docs',
  swaggerUI.serve,
  swaggerUI.setup(require(swaggerFilePath))
);

//rota padrão com resposta
router.get('/', (_, res) => {
  //resposta ao conectar
  return res.send('Olá, dev!');
});

// rota de consultar os registros dos bancos
router.use('/boletos', consultaRouter);
