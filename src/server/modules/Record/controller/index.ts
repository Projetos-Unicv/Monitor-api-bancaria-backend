import * as getAll from './getRecordController';
import * as listRecord from './listRecordController';
export const recordController = {
  ...getAll,
  ...listRecord,
};
