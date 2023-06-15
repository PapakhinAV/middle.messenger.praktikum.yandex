import Block from '../../core/Block';
import template from './homePage.hbs';
import arrowRightBase from '../../assets/svg/arrowRightBase.svg';
import { IMessage } from '../../components/Messages';
import { Messages, MessageInput } from '../../components';
import { validators } from '../../utils/validators';
import { submitValidator } from '../../utils/submitValidator';
import { getFormValue } from '../../utils/getFormValue';
import SendMessageIButton from '../../components/SendMessageIButton';
import Chats from '../../components/ChatsList';
import { withStore } from '../../core/Store';
import AuthController from '../../controllers/AuthController';
import styles from './homePage.module.pcss';
import MainHeader from '../../components/MainHeader';
import { User } from '../../api/authApi';
import ChatsHeader from '../../components/ChatsHeader';
import ChatsController from '../../controllers/ChatsController';

const messages: IMessage[] = [
  {
    id: '1',
    text: 'Привет! Смотри, тут всплыл интересный кусок лунной космической истории — НАСА в какой-то момент попросила Хассельблад адаптировать модель SWC для полетов на Луну. Сейчас мы все знаем что астронавты летали с моделью 500 EL — и к слову говоря, все тушки этих камер все еще находятся на поверхности Луны, так как астронавты с собой забрали только кассеты с пленкой.\n\nХассельблад в итоге адаптировал SWC для космоса, но что-то пошло не так и на ракету они так никогда и не попали. Всего их было произведено 25 штук, одну из них недавно продали на аукционе за 45000 евро.',
    time: '12:00',
    type: 'incoming',
  },
  {
    id: '2',
    text: 'Круто!',
    time: '12:05',
    type: 'send',
  },
];

class HomePageBase extends Block<User> {
  constructor(props:User) {
    super(props);
  }

  init() {
    ChatsController.getChats();
    AuthController.fetchUser();

    this.children.chatsHeader = new ChatsHeader({});
    this.children.chats = new Chats({});
    this.children.messages = new Messages({ messages });
    this.children.messageInput = new MessageInput({
      required: true,
      value: '',
      placeholder: 'Введите сообщение',
      events: {
        blur: {
          searchParam: 'input',
          handler: (e) => {
            validators.message(e, this.children.messageInput);
          },
        },
        change: (e) => {
          this.children.messageInput.setProps({ value: (e.target as HTMLInputElement)?.value });
        },
        keydown: (e) => {
          if (e.key === 'Enter') {
            this.children.messageButton.element?.dispatchEvent(new Event('click'));
          }
        },
      },
    });
    this.children.messageButton = new SendMessageIButton({
      iconPath: arrowRightBase,
      events: {
        click: (e) => {
          e.preventDefault();
          const errors = submitValidator(this.children);
          if (!errors) {
            console.log(getFormValue(this.children));
            this.children.messageInput.setProps({ value: '' });
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

const withUser = withStore<User>((state) => ({ ...state.user }));

const HomePage = withUser(HomePageBase) as typeof Block;

export default HomePage;
