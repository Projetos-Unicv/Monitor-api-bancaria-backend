import { Router } from 'express';
import { consultaController } from '../controller';
export const consultaRouter = Router();

consultaRouter.get('/'); // get all
consultaRouter.get(
  '/api-data-list/:type/:bank',
  consultaController.getRecordsValidation,
  consultaController.getRecords
);
