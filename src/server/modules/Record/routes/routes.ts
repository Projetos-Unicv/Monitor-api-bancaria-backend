import { Router } from 'express';
import { consultaController } from '../controller';
export const consultaRouter = Router();

consultaRouter.get('/'); // rota padrão

// rota unica e dinamica do back-end
consultaRouter.get(
  '/:type/:bank',
  consultaController.getRecordsValidation,
  consultaController.getRecords
);
