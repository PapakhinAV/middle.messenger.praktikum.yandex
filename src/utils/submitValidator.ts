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
};
export function submitValidator(children: Record<string, Block<any>>) {
  const formInputs = Object.keys(children).reduce((acc:{name: string, element: HTMLInputElement}[], el: string) => {
    const currElement = children[el].element?.querySelector('input');
    if (currElement) acc.push({ element: currElement, name: el });
    return acc;
  }, []);
  const errors: string[] = [];
  const avalibleValidators = Object.keys(validators);
  formInputs.forEach(({ name, element }) => {
    const validatorName = mappedValidatorsNames[name];
    if (avalibleValidators.includes(validatorName)) {
      const check = validators[validatorName](element.value, children[name]);
      if (check) errors.push(check);
    } else {
      throw Error(`Нет валидатора для элемента children с именем ${name}`);
    }
  });

  if (errors.length) return errors;
}
