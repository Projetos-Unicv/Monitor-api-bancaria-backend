import { Bank } from '../database/entities/Bank';
// interface de tipagem para a criação da entidade tabela
export interface recordInterface {
  id: number;
  type: string;
  codeResponse: string;
  bank: Bank;
  dateCreated: Date;
  status: string;
  timeRequest: number;
  payloadResponse: object;
  detailing: string;
  responseStatus: string;
}
