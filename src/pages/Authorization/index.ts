import Block from '../../core/Block';
import template from './authorization.hbs';
import SimpleInput from '../../components/SimpleInput';
import { LinkButton, Button } from '../../components';
import { ERoutes } from '../../ERoutes';
import { validators } from '../../utils/validators';
import { submitValidator } from '../../utils/submitValidator';
import { getFormValue } from '../../utils/getFormValue';

class Authorization extends Block {
  constructor() {
    super({});
  }

  init() {
    this.children.login = new SimpleInput({
      name: 'login',
      type: 'text',
      label: 'Логин',
      value: 'ff',
      required: true,
      events: {
        focusout: (e) => validators.login(e, this.children.login),
        change: (e) => this.children.login.setProps({ value: (e.target as HTMLInputElement)?.value }),
      },
    });
    this.children.password = new SimpleInput({
      name: 'password',
      type: 'password',
      label: 'Пароль',
      value: '',
      required: true,
      events: {
        focusout: (e) => validators.password(e, this.children.password),
        change: (e) => this.children.password.setProps({ value: (e.target as HTMLInputElement)?.value }),
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
            console.log(getFormValue(this.children));
            setTimeout(() => window.location.pathname = ERoutes.HOME, 3000);
          }
        },
      },
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}

export default Authorization;
