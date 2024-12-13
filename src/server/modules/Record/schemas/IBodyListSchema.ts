import { bankOptions } from '../../Bank/enums/Banks';
import { StateType } from '../enums/StateType';
import { TypeRequest } from '../enums/TypeRequest';

export interface IBodyListSchema {
  startDate: string;
  endDate: string;
  type: TypeRequest;
  bank: bankOptions;
  status?: StateType;
}
