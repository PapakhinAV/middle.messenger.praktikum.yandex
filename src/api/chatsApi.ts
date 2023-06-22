import { BaseAPI } from './baseApi';
import { User } from './authApi';

export interface ChatInfo {
  id: number;
  title: string;
  avatar: string;
  unread_count: number;
  last_message: {
    user: User,
    time: string;
    content: string;
  }
}
export interface ICreateChat {
  title: string;
}
export interface IDeleteChat {
  chatId: number;
}
export interface IChatsArchive {
  offset: number;
  limit: number;
  title: string
}
export interface IChatsArchiveById {
  chatId: number;
}

export interface IChatUsers {
  chatId: number;
  offset?: number;
  limit?: number;
  name?: string;
  email?: string;
}

export interface IChatAvatar {
  chatId: number;
  avatar: FormData
}

export interface IUserToChat {
  users: number[],
  chatId: number,
}

export class ChatsAPI extends BaseAPI {
  constructor() {
    super('/chats');
  }

  protected headers = { 'Content-Type': 'application/json' };

  getChats() {
    return this.http.get<ChatInfo[]>('/', { headers: this.headers });
  }

  createChat(data: ICreateChat) {
    return this.http.post('/', { data, headers: this.headers });
  }

  deleteChat(data: IDeleteChat) {
    return this.http.delete('/', { data, headers: this.headers });
  }

  getChatSendFiles(chatId: number) {
    return this.http.get(`/${chatId}/files`, { headers: this.headers });
  }

  getChatsArchive(data: IChatsArchive) {
    return this.http.get('/archive', { data, headers: this.headers });
  }

  getChatsArchiveById(data: IChatsArchiveById) {
    return this.http.post('/archive', { data, headers: this.headers });
  }

  getChatsUnarchiveById(data: IChatsArchiveById) {
    return this.http.post('/unarchive', { data, headers: this.headers });
  }

  /** Get common chat with current chat user (only works for two users chats) */
  getCommonChat(id: number) {
    return this.http.get(`/${id}/common`, { headers: this.headers });
  }

  getChatUsers({ chatId, ...data }: IChatUsers) {
    return this.http.get(`/${chatId}/users`, { data, headers: this.headers });
  }

  getChatNewMessages(chatId: number) {
    return this.http.get(`/new/${chatId}`, { headers: this.headers });
  }

  updateChatAvatar(data: FormData) {
    return this.http.put('/avatar', { data });
  }

  addUserToChat(data: IUserToChat) {
    return this.http.put('/users', { data, headers: this.headers });
  }

  removeUserFromChat(data: IUserToChat) {
    return this.http.delete('/users', { data, headers: this.headers });
  }

  getChatsToken(chatId: number) {
    return this.http.post<Record<'token', string>>(`/token/${chatId}`, { headers: this.headers });
  }
}

export default new ChatsAPI();
