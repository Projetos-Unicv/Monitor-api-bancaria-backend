import { Bank } from '../database/entities/Bank';
export interface recordInterface {
  id: number;
  type: string;
  codeResponse: number;
  bank: Bank;
  dateCreated: Date;
  status: string;
  timeRequest: number;
  payloadResponse: object;
  detailing: string;
  responseStatus: string;
}
