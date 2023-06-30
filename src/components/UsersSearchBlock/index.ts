import Block from '../../core/Block';
import template from './usersSearchBlock.hbs';
import styles from './userSearchBlockStyles.module.pcss';
import UserController, { ISearchUser } from '../../controllers/UserController';
import UserSearchItem from '../UserSearchItem';
import { Button, SimpleInput } from '../index';
import { isBlock } from '../../typeGuards/isBlock';
import { submitValidator } from '../../utils/submitValidator';
import { getFormValue } from '../../utils/getFormValue';
import { isISearchUserByLogin } from '../../typeGuards/isISearchUserByLogin';
import { withStore } from '../../core/Store';
import { EStoreFields } from '../../core/Store/Store';
import isObjectsEqual from '../../utils/isObjectsEqual';
import search from '../../assets/svg/search.svg';
import close from '../../assets/svg/close.svg';
import ChatsController from '../../controllers/ChatsController';
import { User } from '../../api/authApi';
import { escapeHtml } from '../../utils/escapeHtml';

interface IUserSearchBlockProps {
  searchResults?: ISearchUser[]
  chatId?: number
  isVisible?: boolean
  selectedChatUsers?: ISearchUser[]
  user?: User
}
class UserSearchBlockBase extends Block<IUserSearchBlockProps> {
  constructor(props: IUserSearchBlockProps) {
    super(props);
  }

  init() {
    this.children.users = this.createUsers(this.props);
    this.children.searchInput = new SimpleInput({
      type: 'text',
      name: 'login',
      required: true,
      value: '',
      label: 'Введите логин пользователя',
      events: {
        change: (e) => {
          if (isBlock(this.children.searchInput)) this.children.searchInput.setProps({ value: escapeHtml((e.target as HTMLInputElement)?.value) });
        },
      },
    });
    this.children.searchButton = new Button({
      size: 'small',
      img: search,
      type: 'button',
      logoSize: 20,
      events: {
        click: () => {
          const currentFieldsNames = ['searchInput'];
          const currentFields = Object.fromEntries(
            Object.entries(this.children).filter(([key]) => currentFieldsNames.includes(key)),
          );
          const errors = submitValidator(currentFields);
          if (!errors) {
            const value = getFormValue(currentFields);
            if (value && isISearchUserByLogin(value)) {
              UserController.findUsersByLogin(value);
              if (isBlock(this.children.searchInput)) this.children.searchInput.setProps({ value: '' });
            }
          }
        },
      },
    });
    this.children.closeButton = new Button({
      size: 'small',
      img: close,
      type: 'button',
      logoSize: 20,
      events: {
        click: () => {
          ChatsController.hideUserSearchByLogin();
        },
      },
    });
  }

  protected componentDidUpdate(oldProps:IUserSearchBlockProps, newProps: IUserSearchBlockProps): boolean {
    if (!isObjectsEqual(oldProps, newProps)) {
      this.children.users = this.createUsers(newProps);
      return true;
    }
    return false;
  }

  private createUsers({ searchResults, chatId }: IUserSearchBlockProps) {
    if (!chatId) return [];
    const selectedChatUsers = this.props.selectedChatUsers?.filter((el) => el.id !== this.props.user?.id);

    const filteredResults = searchResults?.filter((user) => !selectedChatUsers?.some((chatUser) => chatUser.id === user.id)) || [];

    const newUsers = filteredResults.map((data) => {
      const {
        // eslint-disable-next-line camelcase
        id, first_name, second_name, login,
      } = data;

      const user = new UserSearchItem({
      // eslint-disable-next-line camelcase
        userId: id, chatId, first_name, second_name, login,
      });
      return user;
    });
    const addedUsers = selectedChatUsers?.map((data) => {
      const {
        // eslint-disable-next-line camelcase
        id, first_name, second_name, login,
      } = data;

      const user = new UserSearchItem({
        // eslint-disable-next-line camelcase
        userId: id, chatId, first_name, second_name, login, isAdded: true,
      });
      return user;
    });
    if (addedUsers) {
      return addedUsers.concat(newUsers);
    }
    return newUsers;
  }

  render() {
    return this.compile(template, { ...this.props, styles });
  }
}

const withSearchResults = withStore<IUserSearchBlockProps>((state) => ({
  searchResults: state[EStoreFields.SEARCH]?.usersByLogin,
  chatId: state.selectedChat?.id,
  isVisible: state[EStoreFields.SEARCH]?.isUsersByLoginVisible === 'open',
  selectedChatUsers: state.selectedChatUsers,
  user: state.user,
}));

const UserSearchBlock = withSearchResults(UserSearchBlockBase) as typeof Block;

export default UserSearchBlock;
