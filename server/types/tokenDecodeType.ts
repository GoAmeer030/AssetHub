import { staffType, studentType } from './usersTypes';

export type tokenDecodeType = {
  user: staffType | studentType;
  iat: number;
  exp: number;
};
