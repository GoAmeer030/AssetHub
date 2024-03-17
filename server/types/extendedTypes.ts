import { Request } from 'express';

import { tokenDecodeType } from './tokenDecodeType';

export interface extendedRequest extends Request {
  user: tokenDecodeType;
}
