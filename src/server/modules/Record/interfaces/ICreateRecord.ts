import { TypeRequest } from '../enums/TypeRequest';

export interface ICreateRecord {
  timeReq: number;
  type: TypeRequest;
  codeResponse: string;
  payload: object;
  bancoCode: number;
}
