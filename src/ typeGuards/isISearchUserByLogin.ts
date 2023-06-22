import { ISearchUserByLogin } from '../api/userApi';

export function isISearchUserByLogin(obj: any): obj is ISearchUserByLogin {
  return typeof obj.login === 'string';
}
