import { Router } from 'express';
import { consultaController } from '../controller';
export const consultaRouter = Router();

consultaRouter.get('/');

consultaRouter.get(
  '/:type/:bank',
  consultaController.getRecordsValidation,
  consultaController.getRecords
);
