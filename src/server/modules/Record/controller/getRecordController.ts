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
import { GetRecordsService } from '../service/Record/getRecordService';
interface IQueryProps {
  filter: FilterTimes;
}
interface IParamsSchema {
  bank: bankOptions;
  type: TypeRequest;
}
interface IParamsProps {
  bank: string;
  type: string;
}

export const getRecordsValidation = validation((getSchema) => ({
  query: getSchema<IQueryProps>(
    yup.object().shape({
      filter: yup
        .mixed<FilterTimes>()
        .oneOf(Object.values(FilterTimes))
        .required(),
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
  const filter = req.query.filter;

  const service = new GetRecordsService();
  const result = await service.execute(bank, type, 'DAY');
  return res.json(result).status(StatusCodes.OK);
};
