export interface recordInterface {
  id: number;
  type: string;
  status_code: string;
  cod_banco: number;
  date_created: Date;
  status: string;
  request_time: number;
  payload_response: JSON;
}
