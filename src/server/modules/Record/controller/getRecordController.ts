/* eslint-disable @typescript-eslint/no-empty-interface */
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

// Validador das requisições de registro
export const getRecordsValidation = validation((getSchema) => ({
  // Faz uma validação dos campos recebidos com os campos que são requeridos no Query
  query: getSchema<IQueryProps>(
    yup.object().shape({
      filter: yup
        .mixed<FilterTimes>()
        .oneOf(Object.values(FilterTimes))
        .optional(),
      status: yup.mixed<StateType>().oneOf(Object.values(StateType)).optional(),
    })
  ),
  // Faz uma validação dos campos recebidos com os campos que são requeridos no Params
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

// Controlador para buscar registros
export const getRecords = async (req: Request, res: Response) => {
  const { type, bank } = req.params; // Parâmetros de busca

  // Tratamento dos filtros opcionais no Query
  const filter: FilterTimes | undefined = req.query.filter
    ? (req.query.filter as FilterTimes)
    : undefined;
  const status: StateType | undefined = req.query.status
    ? (req.query.status as StateType)
    : undefined;
  const service = new GetRecordsService(); // Declarando service

  try {
    const result = await service.execute(bank, type, filter, status);
    return res.status(StatusCodes.OK).json(result); // Retorna os registros
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
