import { Bank } from '../database/entities/Bank';

export interface recordInterface {
  id: number;
  type: string;
  codeResponse: string;
  bank: Bank;
  bankId: number;
  dateCreated: Date;
  status: string;
  timeRequest: number;
  payloadResponse: object;
}
