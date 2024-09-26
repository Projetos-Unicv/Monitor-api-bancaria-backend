/* eslint-disable @typescript-eslint/no-empty-object-type */
import { Request, Response } from 'express';
// import { StatusCodes } from "http-status-codes";
import * as yup from 'yup';
import { validation } from '../../../shared/middleware/validation';
import { StatusCodes } from 'http-status-codes';

interface IQueryProps {
  filter?: string;
}
interface IParamsProps {
  bank: string;
}

export const getAllValidation = validation((getSchema) => ({
  query: getSchema<IQueryProps>(
    yup.object().shape({
      filter: yup.string().required(),
    })
  ),
  params: getSchema<IParamsProps>(
    yup.object().shape({
      bank: yup.string().required(),
    })
  ),
}));

export const getAll = async (
  req: Request<{}, {}, {}, IQueryProps>, // passando na 4º posição pois é para deixar o req.query usando como padrão de interface o IQueryProps
  res: Response
) => {
  res.setHeader('access-control-expose-headers', 'x-total-count');
  res.setHeader('x-total-count', 1);
  console.log(req.params);
  console.log(req.query);

  return res.status(StatusCodes.OK).json([
    {
      message: 'Aprovado',
    },
  ]);
};
