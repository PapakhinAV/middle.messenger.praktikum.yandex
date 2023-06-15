import { ChatInfo } from '../../api/chatsApi';
import Block from '../../core/Block';
import template from './chats.hbs';
import styles from './chatStyles.module.pcss';
import { withStore } from '../../core/Store';

interface ChatProps extends ChatInfo{
  selectedChat: ChatInfo;
  events: {
    click: () => void;
  }
}

class ChatBase extends Block<ChatProps> {
  constructor(props: ChatProps) {
    super(props);
    this.element?.addEventListener('click', () => {
    });
  }

  private isSelected() {
    return this.props.id === this.props.selectedChat?.id;
  }

  render() {
    return this.compile(template, { ...this.props, styles, isSelected: this.isSelected() });
  }
}

export const withChat = withStore((state) => ({ selectedChat: state?.selectedChat }));
const Chat = withChat(ChatBase) as typeof Block;

export default Chat;
