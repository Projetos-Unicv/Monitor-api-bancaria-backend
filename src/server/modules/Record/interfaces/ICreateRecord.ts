import { TypeRequest } from '../enums/TypeRequest';

export interface ICreateRecord {
  timeReq: number;
  type: TypeRequest;
  codeResponse: number;
  payload: object;
  bancoCode: number;
  detailing?: string;
}
