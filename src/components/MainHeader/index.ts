import Block from '../../core/Block';
import template from './mainHeader.hbs';
import styles from './mainHeaderStyles.module.pcss';
import { withStore } from '../../core/Store';
import rubbishBin from '../../assets/svg/rubbish.svg';
import addUser from '../../assets/svg/addUser.svg';
import { Button } from '../index';
import ChatsrController from '../../controllers/ChatsController';

export interface IMainHeaderProps {
  firstName: string
  rubbishBin: string
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
        click: () => ChatsrController.deleteChat(1),
      },
    });
  }

  render() {
    return this.compile(template, { ...this.props, styles });
  }
}

const withUser = withStore<IMainHeaderProps>((state) => ({ first_name: state.user.first_name }));

const MainHeader = withUser(MainHeaderBase) as typeof Block;

export default MainHeader;
