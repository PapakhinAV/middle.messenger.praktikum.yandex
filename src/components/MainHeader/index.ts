import Block from '../../core/Block';
import template from './mainHeader.hbs';
import styles from './mainHeaderStyles.module.pcss';
import { withStore } from '../../core/Store';
import rubbishBin from '../../assets/svg/rubbish.svg';
import addUser from '../../assets/svg/addUser.svg';
import { Button } from '../index';
import ChatsrController from '../../controllers/ChatsController';

export interface IMainHeaderProps {
  title: string
  rubbishBin: string
  selectedChatId: number
}
class MainHeaderBase extends Block<IMainHeaderProps> {
  constructor(props: IMainHeaderProps) {
    super(props);
    this.props.rubbishBin = rubbishBin;
  }

  init() {
    this.children.addUsersButton = new Button({
      img: addUser,
      type: 'text',
      size: 'small',
      logoSize: 20,
    });

    this.children.deleteChatButton = new Button({
      img: rubbishBin,
      type: 'text',
      size: 'small',
      logoSize: 20,
      events: {
        click: () => ChatsrController.deleteChat(this.props.selectedChatId),
      },
    });
  }

  render() {
    return this.compile(template, { ...this.props, styles });
  }
}

const withUser = withStore<IMainHeaderProps>((state) => ({ title: state.selectedChat?.title, selectedChatId: state.selectedChat?.id }));

const MainHeader = withUser(MainHeaderBase) as typeof Block;

export default MainHeader;
