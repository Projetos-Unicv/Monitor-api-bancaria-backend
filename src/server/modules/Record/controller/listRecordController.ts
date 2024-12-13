/* eslint-disable @typescript-eslint/no-empty-interface */
import * as yup from 'yup'; // lib de validação
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { validation } from '../../../shared/middleware/validation';
// enums
import { TypeRequest } from '../enums/TypeRequest';
import { bankOptions } from '../../Bank/enums/Banks';
import { StateType } from '../enums/StateType';

// service
import { listRecordService } from '../service/listRecordService';
// interfaces - Schemas - erros
import { IParamsSchema } from '../schemas/IParamsSchema';
import AppError from '../../../shared/errors/AppError';
import { IBodyListSchema } from '../schemas/IBodyListSchema';

// Validador das requisições de registro
export const listRecordValidation = validation((getSchema) => ({
  // Faz uma validação dos campos recebidos com os campos que são requeridos no Params
  body: getSchema<IBodyListSchema>(
    yup.object().shape({
      status: yup.mixed<StateType>().oneOf(Object.values(StateType)).optional(),
      type: yup
        .mixed<TypeRequest>()
        .oneOf(Object.values(TypeRequest))
        .required(),
      startDate: yup
        .string()
        .required('startDate é obrigatório')
        .matches(
          /^(?:\d{4}-\d{2}-\d{2}|\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2})$/,
          'startDate deve ser no formato YYYY-MM-DD ou YYYY-MM-DDTHH:mm:ss.'
        )
        .test(
          'is-valid-date',
          'startDate deve ser uma data válida.',
          (value) => {
            // Tenta criar uma data e verificar se é válida
            const date = new Date(value);
            return !isNaN(date.getTime());
          }
        ),
      endDate: yup
        .string()
        .required('endDate é obrigatório')
        .matches(
          /^(?:\d{4}-\d{2}-\d{2}|\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2})$/,
          'endDate deve ser no formato YYYY-MM-DD ou YYYY-MM-DDTHH:mm:ss.'
        )
        .test('is-valid-date', 'endDate deve ser uma data válida.', (value) => {
          // Tenta criar uma data e verificar se é válida
          const date = new Date(value);
          return !isNaN(date.getTime());
        }),
      bank: yup
        .mixed<bankOptions>()
        .oneOf(Object.values(bankOptions))
        .required(),
    })
  ),
}));

// Controlador para buscar registros
export const listRecords = async (req: Request, res: Response) => {
  const { startDate, endDate, status, type, bank } = req.body; // Parâmetros de busca
  const service = new listRecordService(); // Declarando service
  try {
    const result = await service.execute(
      bank,
      type,
      startDate,
      endDate,
      status
    );
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
