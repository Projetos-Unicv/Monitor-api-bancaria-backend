export interface recordInterface {
  id: number;
  type: string;
  codeResponse: string;
  bankId: number;
  dateCreated: Date;
  status: string;
  timeRequest: number;
  payloadResponse: object;
}
