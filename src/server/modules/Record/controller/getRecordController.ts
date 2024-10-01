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
interface IQueryProps {
  filter: FilterTimes;
}
interface IParamsSchema {
  bank: bankOptions;
  type: TypeRequest;
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
  const filter: FilterTimes | undefined = req.query.filter
    ? (req.query.filter as FilterTimes)
    : undefined;

  const service = new GetRecordsService();
  const result = await service.execute(bank, type, filter);
  return res.json(result).status(StatusCodes.OK);
};
