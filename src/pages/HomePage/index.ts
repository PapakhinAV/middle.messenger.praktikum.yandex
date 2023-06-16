import Block from '../../core/Block';
import template from './homePage.hbs';
import arrowRightBase from '../../assets/svg/arrowRightBase.svg';
import { Messages, MessageInput } from '../../components';
import { validators } from '../../utils/validators';
import { submitValidator } from '../../utils/submitValidator';
import { getFormValue } from '../../utils/getFormValue';
import SendMessageButton from '../../components/SendMessageButton';
import Chats from '../../components/ChatsList';
import AuthController from '../../controllers/AuthController';
import styles from './homePage.module.pcss';
import MainHeader from '../../components/MainHeader';
import ChatsHeader from '../../components/ChatsHeader';
import ChatsController from '../../controllers/ChatsController';
import { isBlock } from '../../ typeGuards/isBlock';
import MessagesController from '../../controllers/MessagesController';
import { EStoreFields } from '../../core/Store/Store';
import { withStore } from '../../core/Store';

interface IHomePageProps {
  chatId?: number
}
class HomePageBase extends Block<IHomePageProps> {
  constructor(props:IHomePageProps) {
    super(props);
  }

  init() {
    ChatsController.getChats();
    AuthController.fetchUser();

    this.children.chatsHeader = new ChatsHeader({});
    this.children.chats = new Chats({});
    this.children.messages = new Messages({});

    this.children.messageInput = new MessageInput({
      required: true,
      value: '',
      placeholder: 'Введите сообщение',
      events: {
        blur: {
          searchParam: 'input',
          handler: (e) => {
            if (isBlock(this.children.messageInput)) validators.message(e, this.children.messageInput);
          },
        },
        change: {
          searchParam: 'input',
          handler: (e) => {
            if (isBlock(this.children.messageInput)) this.children.messageInput.setProps({ value: (e.target as HTMLInputElement)?.value });
          },

        },
        keydown: (e) => {
          if (e.key === 'Enter') {
            if (isBlock(this.children.messageButton)) this.children.messageButton.element?.dispatchEvent(new Event('click'));
          }
        },
      },
    });
    this.children.messageButton = new SendMessageButton({
      iconPath: arrowRightBase,
      events: {
        click: (e) => {
          e.preventDefault();
          const currentFieldsNames = ['messageInput'];
          const currentFields = Object.fromEntries(
            Object.entries(this.children).filter(([key]) => currentFieldsNames.includes(key)),
          );

          const errors = submitValidator(currentFields);
          if (!errors) {
            const { message } = getFormValue(currentFields);
            const { chatId } = this.props;
            if (chatId && message) MessagesController.sendMessage(chatId, message);
            if (isBlock(this.children.messageInput)) this.children.messageInput.setProps({ value: '' });
          }
        },
      },
    });
    this.children.mainHeader = new MainHeader({});
  }

  render() {
    return this.compile(template, { ...this.props, styles });
  }
}

const withUser = withStore<IHomePageProps>((state) => ({ chatId: state[EStoreFields.SELECTED_CHAT]?.id }));

const HomePage = withUser(HomePageBase) as typeof Block;

export default HomePage;
