import { validators } from './validators';
import Block from '../core/Block';

const mappedValidatorsNames: Record<string, keyof typeof validators> = {
  password: 'password',
  oldPassword: 'password',
  newPassword: 'password',
  firstName: 'name',
  secondName: 'name',
  chatName: 'name',
  login: 'login',
  avatar: 'avatar',
  email: 'email',
  phone: 'phone',
  messageInput: 'message',
  newChatTitle: 'message',
  searchInput: 'login',
};
export function submitValidator(children: Record<string, Block<any> | Block<any>[]>) {
  const formInputs = Object.entries(children).reduce(
    (acc: { name: string; elements: HTMLInputElement[] }[], [key, value]) => {
      const elements = Array.isArray(value)
        ? value.map((block) => block.element?.querySelector('input')).filter((element): element is HTMLInputElement => element !== null)
        : [value.element?.querySelector('input')].filter((element): element is HTMLInputElement => element !== null);
      if (elements.length > 0) {
        acc.push({ name: key, elements });
      }
      return acc;
    },
    [],
  );

  const errors: string[] = [];
  const avalibleValidators = Object.keys(validators);

  formInputs.forEach(({ name, elements }) => {
    const validatorName = mappedValidatorsNames[name];
    if (avalibleValidators.includes(validatorName)) {
      elements.forEach((element) => {
        const check = validators[validatorName](element.value, children[name] as Block<any>);
        if (check) {
          errors.push(check);
        }
      });
    } else {
      throw new Error(`Нет валидатора для элемента children с именем ${name}`);
    }
  });

  if (errors.length) {
    return errors;
  }
}
