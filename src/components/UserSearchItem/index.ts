import Block from '../../core/Block';
import template from './userSearchItem.hbs';
import styles from './userSearchItemStyles.module.pcss';
import { Button } from '../index';
import ChatsController from '../../controllers/ChatsController';

interface IUserSearchItemProps {
  chatId: number
  userId: number
  login: string
  first_name: string
  second_name: string
  isAdded?: boolean
}
class UserSearchItem extends Block<IUserSearchItemProps> {
  constructor(props: IUserSearchItemProps) {
    super(props);
  }

  init() {
    this.children.actionButton = new Button({
      size: 'small',
      text: this.props.isAdded ? 'Удалить' : 'Добавить',
      type: 'button',
      events: {
        click: () => {
          const { userId, chatId } = this.props;
          if (this.props.isAdded) {
            ChatsController.removeUserFromChat({ users: [userId], chatId })
          } else {
            ChatsController.addUserToChat({ users: [userId], chatId });
          }
        },
      },
    });
  }

  render() {
    return this.compile(template, { ...this.props, styles });
  }
}

export default UserSearchItem;
