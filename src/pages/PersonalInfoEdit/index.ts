import Block from '../../core/Block';
import template from './personalInfoEdit.hbs';
import {
  Button, Avatar, FileInput, LinkButton,
} from '../../components';
import RowInput from '../../components/RowInput';
import { ERoutes } from '../../core/Router/ERoutes';
import { submitValidator } from '../../utils/submitValidator';
import { getFormValue } from '../../utils/getFormValue';
import { validators } from '../../utils/validators';
import { withStore } from '../../core/Store';
import { User } from '../../api/authApi';
import AuthController from '../../controllers/AuthController';
import router from '../../core/Router/Router';

class PersonalInfoEditBase extends Block<User> {
  constructor(props:User) {
    super(props);
  }

  init() {
    AuthController.fetchUser();
    this.children.photo = new Avatar({
      name: this.props.first_name,
      iconPath: this.props.avatar,
    });
    this.children.avatar = new FileInput({
      text: 'Обновить фото',
      name: 'avatar',
    });
    this.children.email = new RowInput({
      placeholder: 'Почта',
      name: 'email',
      value: this.props.email,
      type: 'email',
      required: true,
      events: {
        focusout: (e) => validators.email(e, this.children.email),
        change: (e) => this.children.email.setProps({ value: (e.target as HTMLInputElement)?.value }),
      },
    });
    this.children.login = new RowInput({
      placeholder: 'Логин',
      value: this.props.login,
      name: 'login',
      type: 'text',
      required: true,
      events: {
        focusout: (e) => validators.login(e, this.children.login),
        change: (e) => this.children.login.setProps({ value: (e.target as HTMLInputElement)?.value }),
      },
    });
    this.children.firstName = new RowInput({
      placeholder: 'Имя',
      value: this.props.first_name,
      name: 'first_name',
      type: 'text',
      required: true,
      events: {
        focusout: (e) => validators.name(e, this.children.firstName),
        change: (e) => this.children.firstName.setProps({ value: (e.target as HTMLInputElement)?.value }),
      },
    });
    this.children.secondName = new RowInput({
      placeholder: 'Фамилия',
      value: this.props.second_name,
      name: 'second_name',
      type: 'text',
      required: true,
      events: {
        focusout: (e) => validators.name(e, this.children.secondName),
        change: (e) => this.children.secondName.setProps({ value: (e.target as HTMLInputElement)?.value }),
      },
    });
    this.children.chatName = new RowInput({
      placeholder: 'Имя в чате',
      value: this.props.display_name || '',
      name: 'display_name',
      type: 'text',
      required: true,
      events: {
        focusout: (e) => validators.name(e, this.children.chatName),
        change: (e) => this.children.chatName.setProps({ value: (e.target as HTMLInputElement)?.value }),
      },
    });
    this.children.phone = new RowInput({
      placeholder: 'Телефон',
      value: this.props.phone,
      name: 'phone',
      type: 'tel',
      required: true,
      events: {
        focusout: (e) => validators.phone(e, this.children.phone),
        change: (e) => this.children.phone.setProps({ value: (e.target as HTMLInputElement)?.value }),
      },
    });

    this.children.oldPassword = new RowInput({
      placeholder: 'Пароль',
      value: '',
      name: 'oldPassword',
      type: 'password',
      required: true,
      events: {
        focusout: (e) => validators.password(e, this.children.oldPassword),
        change: (e) => this.children.oldPassword.setProps({ value: (e.target as HTMLInputElement)?.value }),
      },
    });
    this.children.newPassword = new RowInput({
      value: '',
      name: 'newPassword',
      type: 'password',
      required: true,
      events: {
        focusout: (e) => validators.password(e, this.children.newPassword),
        change: (e) => this.children.newPassword.setProps({ value: (e.target as HTMLInputElement)?.value }),
      },
    });
    this.children.saveButton = new Button({
      text: 'Сохранить',
      type: 'submit',
      events: {
        click: (e) => {
          e.preventDefault();
          const errors = submitValidator(this.children);
          if (!errors) {
            console.log(getFormValue(this.children));
            setTimeout(() => window.location.pathname = ERoutes.PROFILE, 3000);
          }
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
  }

  render() {
    return this.compile(template, this.props);
  }
}

const withUser = withStore<User>((state) => ({ ...state.user }));

const PersonalInfoEdit = withUser(PersonalInfoEditBase) as typeof Block;

export default PersonalInfoEdit;
