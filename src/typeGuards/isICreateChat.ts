import { ICreateChat } from '../api/chatsApi';

export function isICreateChat(obj: any): obj is ICreateChat {
  return typeof obj.title === 'string';
}
