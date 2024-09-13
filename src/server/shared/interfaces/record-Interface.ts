import { Bank } from "../database/entities/Bank";

export interface recordInterface {
  id: number;
  type: string;
  status_code: string;
  id_bank: Bank;
  date_created: Date;
  status: string;
  request_time: number;
  payload_response: object;
}
