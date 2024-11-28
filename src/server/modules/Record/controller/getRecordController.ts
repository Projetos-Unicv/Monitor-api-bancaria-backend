/* eslint-disable @typescript-eslint/no-empty-object-type */
import * as yup from 'yup'; // lib de validação
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { validation } from '../../../shared/middleware/validation';
//enums
import { TypeRequest } from '../enums/TypeRequest';
import { bankOptions } from '../../Bank/enums/Banks';
import { FilterTimes } from '../enums/FilterTimes';
import { StateType } from '../enums/StateType';
//service
import { GetRecordsService } from '../service/getRecordService';
//interfaces - Schemas - erros
import { IParamsSchema } from '../schemas/IParamsSchema';
import { IQueryProps } from '../interfaces/IQueryProps';
import AppError from '../../../shared/errors/AppError';

//validador das requisições de registro
export const getRecordsValidation = validation((getSchema) => ({
  // faz uma validação dos campos recebidos com os campos que é requerido no Query
  query: getSchema<IQueryProps>(
    yup.object().shape({
      filter: yup
        .mixed<FilterTimes>()
        .oneOf(Object.values(FilterTimes))
        .optional(),
      status: yup.mixed<StateType>().oneOf(Object.values(StateType)).optional(),
    })
  ),
  // faz uma validação dos campos recebidos com os campos que é requerido no Params
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

// controlador de buscar resgistros
export const getRecords = async (req: Request, res: Response) => {
  const { type, bank } = req.params; // parametros de busca

  // caso o filter exista, ele ser como o tipo "FilterTimes" se não se torna undefined
  const filter: FilterTimes | undefined = req.query.filter // possiveis filtros
    ? (req.query.filter as FilterTimes)
    : undefined;
  const status: StateType | undefined = req.query.status
    ? (req.query.status as StateType)
    : undefined;

  const service = new GetRecordsService(); // declarando service

  try {
    const result = await service.execute(bank, type, filter, status);
    return res.status(StatusCodes.OK).json(result); // retorna os registros

    // caso ocorra erro ao solicitar registros
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
