import Block from '../../core/Block';
import template from './authorization.hbs';
import SimpleInput from '../../components/SimpleInput';
import { LinkButton, Button } from '../../components';
import { ERoutes } from '../../core/Router/ERoutes';
import { validators } from '../../utils/validators';
import { submitValidator } from '../../utils/submitValidator';
import { getFormValue } from '../../utils/getFormValue';
import styles from './authorizationStyles.module.pcss';
import AuthController from '../../controllers/AuthController';
import { SignupData } from '../../api/authApi';
import { isBlock } from '../../ typeGuards/isBlock';
import { escapeHtml } from '../../utils/escapeHtml';

class Authorization extends Block {
  constructor() {
    super({});
  }

  init() {
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
    this.children.registration = new LinkButton({
      text: 'Нет аккаунта?',
      link: ERoutes.REGISTRATION,
    });
    this.children.button = new Button({
      text: 'Войти',
      type: 'submit',
      events: {
        click: (e) => {
          e.preventDefault();
          const errors = submitValidator(this.children);
          if (!errors) {
            AuthController.signin(getFormValue(this.children) as SignupData);
          }
        },
      },
    });
  }

  render() {
    return this.compile(template, { ...this.props, styles });
  }
}

export default Authorization;
