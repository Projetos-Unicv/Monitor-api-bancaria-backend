import { FilterTimes } from '../enums/FilterTimes';
import { StateType } from '../enums/StateType';

// interface para Query da requisição
export interface IQueryProps {
  filter?: FilterTimes;
  state?: StateType;
}
