import Block from '../../core/Block';
import template from './messages.hbs';
import { withStore } from '../../core/Store';
import { IMessage } from '../../controllers/MessagesController';

export interface IMessageWithRole extends IMessage {
  role: 'receiver' | 'sender'
}

export interface IMessagesProps {
  messages: IMessageWithRole[]
}
class MessageBase extends Block<IMessagesProps> {
  constructor(props: IMessagesProps) {
    super(props);
  }

  render() {
    return this.compile(template, this.props);
  }
}

const withSelectedChat = withStore<IMessagesProps>((state) => {
  const { selectedChat } = state;

  if (!selectedChat?.id) {
    return {
      messages: [],
    };
  }
  return {
    messages: (state.messages || {})[selectedChat.id].map((message: IMessage) => {
      const role = message.user_id === state.user.id ? 'sender' : 'receiver';
      return { ...message, role };
    }) || [],
  };
});

const Message = withSelectedChat(MessageBase) as typeof Block;

export default Message;
