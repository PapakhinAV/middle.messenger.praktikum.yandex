import API, {
  ChatInfo,
  ChatsAPI, IChatUsers, ICreateChat, IUserToChat,
} from '../api/chatsApi';
import { store } from '../core/Store';
import MessagesController from './MessagesController';
import { EStoreFields } from '../core/Store/Store';

class ChatsController {
  private readonly api: ChatsAPI;

  constructor() {
    this.api = API;
  }

  async getChats() {
    try {
      const chats = await this.api.getChats() || [];

      chats.map(async (chat) => {
        const token = await this.getChatsToken(chat.id);
        if (token) await MessagesController.connect(chat.id, token);
      });

      store.set(EStoreFields.CHATS, chats);
    } catch (e: any) {
      console.error(e);
    }
  }

  async createChat(data: ICreateChat) {
    try {
      await this.api.createChat(data);
      await this.getChats();
      // ...
    } catch (e: any) {
      console.error(e.message);
    }
  }

  async deleteChat(chatId: number) {
    try {
      await this.api.deleteChat({ chatId });
      await this.getChats();
    } catch (e: any) {
      console.error(e.message);
    }
  }

  // const user = await this.api.
  // if (user) {
  //   store.set('search.userById', user);
  // }

  async getChatUsers(data: IChatUsers) {
    try {
      const users = await this.api.getChatUsers(data) || [];
      store.set('selectedChatUsers', users);
    } catch (e: any) {
      console.error(e.message);
    }
  }

  async addUserToChat(data: IUserToChat) {
    try {
      await this.api.addUserToChat(data);
      await this.getChatUsers({ chatId: data.chatId });
    } catch (e: any) {
      console.error(e.message);
    }
  }

  async removeUserFromChat(data: IUserToChat) {
    try {
      await this.api.removeUserFromChat(data);
      await this.getChatUsers({ chatId: data.chatId });
    } catch (e: any) {
      console.error(e.message);
    }
  }

  async getChatsToken(chatId: number) {
    try {
      const response = await this.api.getChatsToken(chatId);
      return response?.token;
    } catch (e: any) {
      console.error(e.message);
    }
  }

  async getChatNewMessages(chatId: number) {
    try {
      await this.api.getChatNewMessages(chatId);
      // ...
    } catch (e: any) {
      console.error(e.message);
    }
  }

  async updateChatAvatar({ chatId, avatar }: {chatId: number, avatar: File}) {
    try {
      const formData = new FormData();
      formData.append('avatar', avatar);
      await this.api.updateChatAvatar({ chatId, avatar: formData });
      // ...
    } catch (e: any) {
      console.error(e.message);
    }
  }

  selectChat(id: number) {
    const chat = store.getState().chats?.find((el: ChatInfo) => el.id === id);
    store.set(EStoreFields.SELECTED_CHAT, chat);
    this.getChatUsers({ chatId: id });
  }

  showUserSearchByLogin() {
    store.set(`${EStoreFields.SEARCH}.isUsersByLoginVisible`, 'open');
  }

  hideUserSearchByLogin() {
    store.set(`${EStoreFields.SEARCH}.isUsersByLoginVisible`, 'close');
    store.set(`${EStoreFields.SEARCH}.usersByLogin`, []);
  }
}

export default new ChatsController();
