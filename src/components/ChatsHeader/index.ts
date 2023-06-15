import Block from '../../core/Block';
import template from './chatsHeader.hbs';
import styles from './chatsHeaderStyles.module.pcss';
import { withStore } from '../../core/Store';
import { Button, SimpleInput } from '../index';
import LinkButton from '../LinkButton';
import { ERoutes } from '../../core/Router';
import arrowRightBase from '../../assets/svg/arrowRightBase.svg';
import addChat from '../../assets/svg/addChat.svg';
import { submitValidator } from '../../utils/submitValidator';
import ChatsController from '../../controllers/ChatsController';
import { getFormValue } from '../../utils/getFormValue';
import { isICreateChat } from '../../ typeGuards/isICreateChat';
import { isBlock } from '../../ typeGuards/isBlock';

export interface IChatsHeaderProps {
  toggler: 'none' | 'flex'
}
class ChatsHeaderBase extends Block<IChatsHeaderProps> {
  constructor(props: IChatsHeaderProps) {
    super(props);
  }

  init() {
    this.props.toggler = 'none';
    this.children.lkButton = new LinkButton({
      text: 'Профиль',
      link: ERoutes.PROFILE,
      iconPath: arrowRightBase,
    });
    this.children.newChatButton = new Button({
      img: addChat,
      type: 'text',
      logoSize: 20,
      size: 'small',
      events: {
        click: () => {
          if (this.props.toggler === 'none') {
            this.setProps({ toggler: 'flex' });
          } else {
            this.setProps({ toggler: 'none' });
          }
        },
      },
    });
    this.children.newChatTitle = new SimpleInput({
      type: 'text',
      name: 'title',
      required: true,
      value: '',
      label: 'Название нового чата',
      events: {
        change: (e) => {
          if (isBlock(this.children.newChatTitle)) {
            this.children.newChatTitle.setProps({ value: (e.target as HTMLInputElement)?.value });
          }
        },
      },
    });
    this.children.addNewChatButton = new Button({
      size: 'small',
      text: '+',
      type: 'button',
      events: {
        click: (e) => {
          e.preventDefault();

          const currentFieldsNames = ['newChatTitle'];
          const currentFields = Object.fromEntries(
            Object.entries(this.children).filter(([key]) => currentFieldsNames.includes(key)),
          );

          const errors = submitValidator(currentFields);
          if (!errors) {
            const value = getFormValue(currentFields);
            if (isICreateChat(value)) {
              ChatsController.createChat(value);
              this.setProps({ toggler: 'none' });
              if (isBlock(this.children.newChatTitle)) {
                this.children.newChatTitle.setProps({ value: '' });
              }
            }
          }
        },
      },
    });
  }

  render() {
    return this.compile(template, { ...this.props, styles });
  }
}

const withUser = withStore<IChatsHeaderProps>((state) => ({ ...state.user }));

const ChatsHeader = withUser(ChatsHeaderBase) as typeof Block;

export default ChatsHeader;
