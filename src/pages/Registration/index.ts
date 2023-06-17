import Block from '../../core/Block';
import template from './registration.hbs';
import SimpleInput from '../../components/SimpleInput';
import { LinkButton, Button } from '../../components';
import { ERoutes } from '../../core/Router/ERoutes';
import { validators } from '../../utils/validators';
import { submitValidator } from '../../utils/submitValidator';
import { getFormValue } from '../../utils/getFormValue';
import styles from './registrationStyles.module.pcss';
import AuthController from '../../controllers/AuthController';
import { SignupData } from '../../api/authApi';
import { isBlock } from '../../ typeGuards/isBlock';
import { escapeHtml } from '../../utils/escapeHtml';

class Authorization extends Block {
  constructor() {
    super({});
  }

  init() {
    this.children.email = new SimpleInput({
      name: 'email',
      type: 'email',
      label: 'E-mail',
      value: '',
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
    this.children.login = new SimpleInput({
      name: 'login',
      type: 'text',
      label: 'Логин',
      value: '',
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
    this.children.firstName = new SimpleInput({
      name: 'first_name',
      type: 'text',
      label: 'Имя',
      value: '',
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
    this.children.secondName = new SimpleInput({
      name: 'second_name',
      type: 'text',
      label: 'Фамилия',
      value: '',
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
    this.children.phone = new SimpleInput({
      name: 'phone',
      type: 'tel',
      label: 'Телефон',
      value: '',
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
    this.children.password = new SimpleInput({
      name: 'password',
      type: 'password',
      label: 'Пароль',
      value: '',
      required: true,
      events: {
        focusout: (e) => {
          if (isBlock(this.children.password)) validators.password(e, this.children.password);
        },
        change: (e) => {
          if (isBlock(this.children.password)) this.children.password.setProps({ value: escapeHtml((e.target as HTMLInputElement)?.value) });
        },
      },
    });
    this.children.submitButton = new Button({
      text: 'Зарегистрироваться',
      type: 'submit',
      events: {
        click: (e) => {
          e.preventDefault();
          const errors = submitValidator(this.children);
          if (!errors) {
            AuthController.signup(getFormValue(this.children) as SignupData);
          }
        },
      },
    });
    this.children.loginButton = new LinkButton({
      text: 'Войти',
      link: ERoutes.LOGIN,
    });
  }

  render() {
    return this.compile(template, { ...this.props, styles });
  }
}

export default Authorization;
