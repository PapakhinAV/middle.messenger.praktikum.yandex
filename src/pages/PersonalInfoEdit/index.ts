import Block from '../../core/Block';
import template from './personalInfoEdit.hbs';
import {
  Button, Avatar, FileInput, LinkButton,
} from '../../components';
import RowInput from '../../components/RowInput';
import { submitValidator } from '../../utils/submitValidator';
import { getFormValue } from '../../utils/getFormValue';
import { validators } from '../../utils/validators';
import { withStore } from '../../core/Store';
import { User } from '../../api/authApi';
import AuthController from '../../controllers/AuthController';
import router from '../../core/Router/Router';
import UserController from '../../controllers/UserController';
import { IChangePasswordData, IChangeUserData } from '../../api/userApi';
import styles from './personalInfoEditStyles.module.pcss';
import { isBlock } from '../../ typeGuards/isBlock';
import { escapeHtml } from '../../utils/escapeHtml';

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
      events: {
        change: (e) => {
          const target = e.target as HTMLInputElement;
          if (target.files && target.files.length > 0) {
            const file = target.files[0];
            UserController.updateAvatar(file);
          }
        },
      },
    });
    this.children.email = new RowInput({
      placeholder: 'Почта',
      name: 'email',
      value: this.props.email,
      type: 'email',
      required: true,
      events: {
        focusout: (e) => {
          if (isBlock(this.children.email)) validators.email(e, this.children.email);
        },
        change: (e) => {
          if (isBlock(this.children.email)) this.children.email.setProps({ value: escapeHtml((e.target as HTMLInputElement)?.value) });
        },
      },
    });
    this.children.login = new RowInput({
      placeholder: 'Логин',
      value: this.props.login,
      name: 'login',
      type: 'text',
      required: true,
      events: {
        focusout: (e) => {
          if (isBlock(this.children.login)) validators.login(e, this.children.login);
        },
        change: (e) => {
          if (isBlock(this.children.login)) this.children.login.setProps({ value: escapeHtml((e.target as HTMLInputElement)?.value) });
        },
      },
    });
    this.children.firstName = new RowInput({
      placeholder: 'Имя',
      value: this.props.first_name,
      name: 'first_name',
      type: 'text',
      required: true,
      events: {
        focusout: (e) => {
          if (isBlock(this.children.firstName)) validators.name(e, this.children.firstName);
        },
        change: (e) => {
          if (isBlock(this.children.firstName)) this.children.firstName.setProps({ value: escapeHtml((e.target as HTMLInputElement)?.value) });
        },
      },
    });
    this.children.secondName = new RowInput({
      placeholder: 'Фамилия',
      value: this.props.second_name,
      name: 'second_name',
      type: 'text',
      required: true,
      events: {
        focusout: (e) => {
          if (isBlock(this.children.secondName)) validators.name(e, this.children.secondName);
        },
        change: (e) => {
          if (isBlock(this.children.secondName)) this.children.secondName.setProps({ value: escapeHtml((e.target as HTMLInputElement)?.value) });
        },
      },
    });
    this.children.chatName = new RowInput({
      placeholder: 'Имя в чате',
      value: this.props.display_name || '',
      name: 'display_name',
      type: 'text',
      required: true,
      events: {
        focusout: (e) => {
          if (isBlock(this.children.chatName)) validators.name(e, this.children.chatName);
        },
        change: (e) => {
          if (isBlock(this.children.chatName)) this.children.chatName.setProps({ value: escapeHtml((e.target as HTMLInputElement)?.value) });
        },
      },
    });
    this.children.phone = new RowInput({
      placeholder: 'Телефон',
      value: this.props.phone,
      name: 'phone',
      type: 'tel',
      required: true,
      events: {
        focusout: (e) => {
          if (isBlock(this.children.phone)) validators.phone(e, this.children.phone);
        },
        change: (e) => {
          if (isBlock(this.children.phone)) this.children.phone.setProps({ value: escapeHtml((e.target as HTMLInputElement)?.value) });
        },
      },
    });

    this.children.oldPassword = new RowInput({
      value: '',
      placeholder: 'Текущий пароль',
      name: 'oldPassword',
      type: 'password',
      required: true,
      events: {
        focusout: (e) => {
          if (isBlock(this.children.oldPassword)) validators.password(e, this.children.oldPassword);
        },
        change: (e) => {
          if (isBlock(this.children.oldPassword)) this.children.oldPassword.setProps({ value: escapeHtml((e.target as HTMLInputElement)?.value) });
        },
      },
    });
    this.children.newPassword = new RowInput({
      value: '',
      placeholder: 'Новый пароль',
      name: 'newPassword',
      type: 'password',
      required: true,
      events: {
        focusout: (e) => {
          if (isBlock(this.children.newPassword)) validators.password(e, this.children.newPassword);
        },
        change: (e) => {
          if (isBlock(this.children.newPassword)) this.children.newPassword.setProps({ value: escapeHtml((e.target as HTMLInputElement)?.value) });
        },
      },
    });
    this.children.saveButton = new Button({
      text: 'Сохранить',
      type: 'submit',
      size: 'small',
      events: {
        click: (e) => {
          e.preventDefault();
          const currentFieldsNames = ['email', 'login', 'firstName', 'secondName', 'chatName', 'phone'];
          const currentFields = Object.fromEntries(
            Object.entries(this.children).filter(([key]) => currentFieldsNames.includes(key)),
          );

          const errors = submitValidator(currentFields);
          if (!errors) {
            UserController.updateUser(getFormValue(currentFields) as IChangeUserData);
          }
        },
      },
    });
    this.children.savePasswordButton = new Button({
      text: 'Изменить',
      type: 'submit',
      size: 'small',
      events: {
        click: (e) => {
          e.preventDefault();
          const currentFieldsNames = ['oldPassword', 'newPassword'];
          const currentFields = Object.fromEntries(
            Object.entries(this.children).filter(([key]) => currentFieldsNames.includes(key)),
          );

          const errors = submitValidator(currentFields);
          if (!errors) {
            UserController.updatePassword(getFormValue(currentFields) as IChangePasswordData);
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
    return this.compile(template, { ...this.props, styles });
  }
}

const withUser = withStore<User>((state) => ({ ...state.user }));

const PersonalInfoEdit = withUser(PersonalInfoEditBase) as typeof Block;

export default PersonalInfoEdit;
