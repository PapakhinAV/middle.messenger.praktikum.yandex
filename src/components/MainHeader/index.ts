import Block from '../../core/Block';
import template from './mainHeader.hbs';
import styles from './mainHeaderStyles.module.pcss';
import { withStore } from '../../core/Store';
import rubbishBin from '../../assets/svg/rubbish.svg';
import addUser from '../../assets/svg/addUser.svg';
import chatLogoDefault from '../../assets/svg/chatLogoDefault.svg';
import { Button, FileInput } from '../index';
import ChatsController from '../../controllers/ChatsController';
import { isBlock } from '../../typeGuards/isBlock';

export interface IMainHeaderProps {
  title: string
  selectedChatId: number
  logoUrl?: string
  selectedChat: any
}

class MainHeaderBase extends Block<IMainHeaderProps> {
  constructor(props: IMainHeaderProps) {
    super(props);
  }

  init() {
    this.children.addUsersButton = new Button({
      img: addUser,
      type: 'text',
      size: 'small',
      logoSize: 20,
      events: {
        click: () => {
          ChatsController.showUserSearchByLogin();
        },
      },
    });

    this.children.deleteChatButton = new Button({
      img: rubbishBin,
      type: 'text',
      size: 'small',
      logoSize: 20,
      events: {
        click: () => ChatsController.deleteChat(this.props.selectedChatId),
      },
    });
    this.children.logoButton = new FileInput({
      logoUrl: this.props.logoUrl,
      name: 'logo',
      events: {
        change: (e) => {
          const target = e.target as HTMLInputElement;
          if (target.files && target.files.length > 0) {
            const file = target.files[0];
            ChatsController.updateChatAvatar({ chatId: this.props.selectedChatId, avatar: file });
          }
        },
      },
    });
  }

  // @ts-ignore
  protected componentDidUpdate(oldProps: IMainHeaderProps, newProps: IMainHeaderProps): boolean {
    if (oldProps.logoUrl !== newProps.logoUrl) {
      const props = { ...newProps, logoUrl: newProps.logoUrl === '/' ? undefined : newProps.logoUrl };
      if (isBlock(this.children.logoButton)) this.children.logoButton.setProps(props);
      return true;
    }
    return false;
  }

  render() {
    console.log('logoUrl', this.props.logoUrl)
    return this.compile(template, { ...this.props, styles });
  }
}

const withUser = withStore<IMainHeaderProps>((state) => ({
  title: state.selectedChat?.title,
  selectedChatId: state.selectedChat?.id,
  logoUrl: state.selectedChat?.avatar && state.selectedChat?.avatar !== '/'
    ? `https://ya-praktikum.tech/api/v2/resources/${state.selectedChat?.avatar}`
    : chatLogoDefault,
}));

const MainHeader = withUser(MainHeaderBase) as typeof Block;
export default MainHeader;
