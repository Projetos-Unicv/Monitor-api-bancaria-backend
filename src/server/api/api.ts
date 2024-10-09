import axios, { AxiosResponse } from 'axios';
import { env } from 'process';

export const api = axios.create({
  baseURL: `${process.env.URL_API}`,
  headers: {
    'cnpj-sh': process.env.CNPJ_SH,
    'token-sh': process.env.TOKEN_SH,
    'cnpj-cedente': process.env.CNPJ_CEDENTE,
    'Content-Type': process.env.CONTENT_TYPE,
  },
});
