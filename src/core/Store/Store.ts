import { set } from '../../utils/set';
import EventBus from '../eventBus';

export enum StoreEvents {
  Updated = 'updated'
}

export enum EStoreFields {
  USER = 'user',
  SELECTED_CHAT = 'selectedChat',
  SEARCH = 'search',
  CHATS = 'chats',
  MESSAGES = 'messages'
}

export class Store extends EventBus {
  private state: Partial<Record<EStoreFields, any>> = {};

  public set(keypath: string, data: unknown) {
    this.state = set(this.state, keypath, data) as Partial<Record<EStoreFields, any>>;
    this.emit(StoreEvents.Updated, this.getState());
  }

  public getState() {
    return this.state;
  }
}

const store = new Store();

export default store;
