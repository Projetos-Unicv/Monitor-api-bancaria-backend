/* eslint-disable @typescript-eslint/no-empty-object-type */
import * as yup from 'yup';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { validation } from '../../../shared/middleware/validation';
//enums
import { TypeRequest } from '../enums/TypeRequest';
import { bankOptions } from '../../Bank/enums/Banks';
import { FilterTimes } from '../enums/FilterTimes';
//service
import { GetRecordsService } from '../service/getRecordService';
//interfaces - Schemas
import { IParamsSchema } from '../schemas/IParamsSchema';
import { IQueryProps } from '../interfaces/IQueryProps';
import AppError from '../../../shared/errors/AppError';

export const getRecordsValidation = validation((getSchema) => ({
  query: getSchema<IQueryProps>(
    yup.object().shape({
      filter: yup
        .mixed<FilterTimes>()
        .oneOf(Object.values(FilterTimes))
        .optional(),
    })
  ),
  params: getSchema<IParamsSchema>(
    yup.object().shape({
      bank: yup
        .mixed<bankOptions>()
        .oneOf(Object.values(bankOptions))
        .required(),
      type: yup
        .mixed<TypeRequest>()
        .oneOf(Object.values(TypeRequest))
        .required(),
    })
  ),
}));

export const getRecords = async (req: Request, res: Response) => {
  const { type, bank } = req.params;
  const filter: FilterTimes | undefined = req.query.filter
    ? (req.query.filter as FilterTimes)
    : undefined;

  console.log(req.params);
  console.log(req.query);
  const service = new GetRecordsService();
  try {
    const result = await service.execute(bank, type, filter);
    return res.status(StatusCodes.OK).json(result);
  } catch (error) {
    console.error('Erro ao obter registros:', error);
    if (error instanceof AppError) {
      return res.status(error.statusCode).json({ message: error.message });
    } else {
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: 'Erro inesperado ao processar a solicitação.' });
    }
  }
};
