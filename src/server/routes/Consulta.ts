import { Router } from 'express';
import { consultaController } from '../controllers';
export const consultaRouter = Router();

consultaRouter.get('/'); // get all
consultaRouter.get(
  '/:banco',
  consultaController.getAll,
  consultaController.getAll
); // get unique
