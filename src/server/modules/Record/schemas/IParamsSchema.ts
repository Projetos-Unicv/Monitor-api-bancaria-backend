import { bankOptions } from '../../Bank/enums/Banks';
import { TypeRequest } from '../enums/TypeRequest';

// interface para usar no params da requisição
export interface IParamsSchema {
  bank: bankOptions;
  type: TypeRequest;
}
