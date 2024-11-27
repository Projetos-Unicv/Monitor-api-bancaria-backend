import { TypeRequest } from '../enums/TypeRequest';

// interface de tipagem para criação do registro no banco de dados
export interface ICreateRecord {
  timeReq: number;
  type: TypeRequest;
  codeResponse: string;
  payload: object;
  bancoCode: number;
  detailing?: string;
}
