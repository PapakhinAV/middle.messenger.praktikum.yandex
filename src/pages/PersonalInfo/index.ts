import Block from '../../core/Block';
import template from './personalInfo.hbs';
import { Avatar, LinkButton } from '../../components';
import { ERoutes } from '../../core/Router/ERoutes';
import RowInfo from '../../components/RowInfo';
import { withStore } from '../../core/Store';
import AuthController from '../../controllers/AuthController';
import router from '../../core/Router/Router';
import { User } from '../../api/authApi';
import styles from './personalInfoStyles.module.pcss';

class ProfilePageBase extends Block<User> {
  constructor(props:User) {
    super(props);
  }

  init() {
    AuthController.fetchUser();

    this.children.avatar = new Avatar({
      name: this.props.first_name,
      iconPath: this.props.avatar,
    });
    this.children.email = new RowInfo({
      label: 'Почта',
      value: this.props.email,
    });
    this.children.login = new RowInfo({
      label: 'Логин',
      value: this.props.login,
    });
    this.children.firstName = new RowInfo({
      label: 'Имя',
      value: this.props.first_name,
    });
    this.children.secondName = new RowInfo({
      label: 'Фамилия',
      value: this.props.second_name,
    });
    this.children.chatName = new RowInfo({
      label: 'Имя в чате',
      value: this.props?.display_name || '',
    });
    this.children.phone = new RowInfo({
      label: 'Телефон',
      value: this.props.phone,
    });
    this.children.editButton = new LinkButton({
      text: 'Изменить данные',
      events: {
        click: (e) => {
          e.preventDefault();
          router.go(ERoutes.PROFILE_EDIT);
        },
      },
    });
    this.children.backButton = new LinkButton({
      text: 'Назад',
      events: {
        click: (e) => {
          e.preventDefault();
          router.back();
        },
      },
    });
    this.children.exitButton = new LinkButton({
      text: 'Выйти',
      events: {
        click: (e) => {
          e.preventDefault();
          AuthController.logout();
        },
      },
    });
  }

  render() {
    return this.compile(template, { ...this.props, styles });
  }
}

const withUser = withStore<User>((state) => ({ ...state.user }));

const PersonalInfo = withUser(ProfilePageBase) as typeof Block;

export default PersonalInfo;
