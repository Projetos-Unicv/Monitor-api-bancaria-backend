import { Router } from 'express';
import { recordController } from '../controller';
export const consultaRouter = Router();

consultaRouter.get('/');

consultaRouter.get(
  '/:type/:bank',
  recordController.getRecordsValidation,
  recordController.getRecords
);

consultaRouter.post(
  '/list-records',
  recordController.listRecordValidation,
  recordController.listRecords
);
