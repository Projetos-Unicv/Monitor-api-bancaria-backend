import { bankOptions } from '../../Bank/enums/Banks';
import { TypeRequest } from '../enums/TypeRequest';

export interface IParamsSchema {
  bank: bankOptions;
  type: TypeRequest;
}
