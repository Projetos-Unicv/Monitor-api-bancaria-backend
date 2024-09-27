/* eslint-disable @typescript-eslint/no-empty-object-type */
import * as yup from 'yup';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { validation } from '../../../shared/middleware/validation';
//enums
import { TypeRequest } from '../enums/TypeRequest';
import { bankOptions } from '../enums/Banks';
import { FilterTimes } from '../enums/FilterTimes';

interface IQueryProps {
  filter?: FilterTimes;
}
interface IParamsProps {
  bank: bankOptions;
  type: TypeRequest;
}

export const getRecordsValidation = validation((getSchema) => ({
  query: getSchema<IQueryProps>(
    yup.object().shape({
      filter: yup
        .mixed<FilterTimes>()
        .oneOf(Object.values(FilterTimes))
        .optional(),
    })
  ),
  params: getSchema<IParamsProps>(
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

export const getRecords = async (
  req: Request<{}, {}, {}, IQueryProps>, // passando na 4º posição pois é para deixar o req.query usando como padrão de interface o IQueryProps
  res: Response
) => {
  console.log(req.params);
  console.log(req.query);

  return res.status(StatusCodes.OK).json([
    {
      message: 'Aprovado',
    },
  ]);
};
