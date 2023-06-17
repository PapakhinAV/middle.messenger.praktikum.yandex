import Block from '../../core/Block';
import template from './chats.hbs';
import { withStore } from '../../core/Store';
import styles from './chatsStyles.module.pcss';
import { ChatInfo } from '../../api/chatsApi';
import Chat, { withChat } from '../Chat';
import ChatsController from '../../controllers/ChatsController';

interface IChatsListProps {
  chats: ChatInfo[];
}

class ChatsBase extends Block<IChatsListProps> {
  constructor(props: IChatsListProps) {
    super(props);
  }

  init() {
    this.children.chats = this.createChats(this.props);
  }

  // @ts-ignore
  protected componentDidUpdate(_, newProps: IChatsListProps): boolean {
    this.children.chats = this.createChats(newProps);
    return true;
  }

  private createChats(props: IChatsListProps) {
    return props.chats?.map((data) => {
      const ChatWithStore = withChat(Chat);
      const chat = new ChatWithStore({
        ...data,
        events: {
          click: () => {
            ChatsController.selectChat(data.id);
            ChatsController.getChatUsers({ chatId: data.id });
          },
        },
      });
      return chat;
    });
  }

  render() {
    return this.compile(template, { ...this.props, styles });
  }
}

const withChats = withStore<IChatsListProps>((state) => ({ chats: [...(state.chats || [])] }));

const Chats = withChats(ChatsBase) as typeof Block;

export default Chats;
