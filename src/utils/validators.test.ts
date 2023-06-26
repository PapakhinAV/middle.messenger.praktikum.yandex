import { expect } from 'chai';
import Block from '../core/Block';
import { validators } from './validators';

describe('Валидаторы', () => {
  class TestBlock extends Block {
    setProps = (props: Object) => {
      this.props = { ...this.props, ...props };
    };
  }

  describe('Валидация логина', () => {
    const block = new TestBlock({ required: true });

    it('должна возвращать сообщение об ошибке, если значение содержит менее 3 символов', () => {
      const result = validators.login('ab', block);
      expect(result).to.include('от 3 до 20 символов');
    });

    it('должна возвращать сообщение об ошибке, если значение содержит более 20 символов', () => {
      const result = validators.login('a'.repeat(21), block);
      expect(result).to.include('от 3 до 20 символов');
    });

    it('должна возвращать сообщение об ошибке, если значение содержит пробелы', () => {
      const result = validators.login('valid login', block);
      expect(result).to.include('не должно содержать пробелы');
    });

    it('должна возвращать сообщение об ошибке, если значение содержит символы, отличные от латинских букв, цифр, "-" и "_"', () => {
      const result = validators.login('invalid$', block);
      expect(result).to.include('допустимы латинские буквы, цифры, "-", "_"');
    });

    it('должна возвращать сообщение об ошибке, если значение состоит только из цифр', () => {
      const result = validators.login('123456789', block);
      expect(result).to.include('не может состоять только из цифр');
    });

    it('должна возвращать сообщение об ошибке, если значение содержит два подряд идущих дефиса или нижних подчёркивания', () => {
      const result = validators.login('invalid__login', block);
      expect(result).to.include('не может содержать два подряд идущих дефиса или нижних подчёркивания');
    });

    it('не должна возвращать сообщение об ошибке для действительного логина', () => {
      const result = validators.login('valid_login', block);
      // eslint-disable-next-line no-unused-expressions
      expect(result).to.be.undefined;
    });
  });
  describe('Валидация пароля', () => {
    const block = new TestBlock({ required: true });

    it('Успешная валидация корректного пароля', () => {
      const result = validators.password('Password123', block);
      // eslint-disable-next-line no-unused-expressions
      expect(result).to.be.undefined;
    });

    it('Ошибка при длине пароля меньше 8 символов', () => {
      const result = validators.password('Pass12', block);
      expect(result).to.include('значение должно быть от 8 до 40 символов');
    });

    it('Ошибка при длине пароля больше 40 символов', () => {
      const result = validators.password('P'.repeat(41), block);
      expect(result).to.include('значение должно быть от 8 до 40 символов');
    });

    it('Ошибка при отсутствии заглавной буквы', () => {
      const result = validators.password('password123', block);
      expect(result).to.include('должно содержать хотя бы одну заглавную букву');
    });

    it('Ошибка при наличии пробелов', () => {
      const result = validators.password('Password 123', block);
      expect(result).to.include('не должно содержать пробелы');
    });
  });

  describe('Валидация имени', () => {
    const block = new TestBlock({ required: true });

    it('Успешная валидация корректного имени', () => {
      const result = validators.name('Ivan', block);
      // eslint-disable-next-line no-unused-expressions
      expect(result).to.be.undefined;
    });

    it('Ошибка при пустом значении', () => {
      const result = validators.name('', block);
      expect(result).to.include('не должно быть пустым');
    });

    it('Ошибка при отсутствии заглавной буквы', () => {
      const result = validators.name('ivan', block);
      expect(result).to.include('должно начинаться с заглавной буквы');
    });

    it('Ошибка при наличии пробелов', () => {
      const result = validators.name('Ivan Ivanov', block);
      expect(result).to.include('не должно содержать пробелы');
    });

    it('Ошибка при наличии недопустимых символов', () => {
      const result = validators.name('Ivan1', block);
      expect(result).to.include('может содержать только латинские или кириллические буквы, а также дефис');
    });
  });

  describe('Валидация телефона', () => {
    const block = new TestBlock({ required: true });

    it('Успешная валидация корректного номера телефона', () => {
      const result = validators.phone('+12345678901', block);
      // eslint-disable-next-line no-unused-expressions
      expect(result).to.be.undefined;
    });

    it('Ошибка при некорректном формате номера', () => {
      const result = validators.phone('123ABC', block);
      expect(result).to.include('может начинаться с +, далее допустимы только цифры');
    });

    it('Ошибка при слишком коротком номере', () => {
      const result = validators.phone('123456789', block);
      expect(result).to.include('значение должно быть от 10 до 15 символов');
    });

    it('Ошибка при слишком длинном номере', () => {
      const result = validators.phone('12345678901234567890', block);
      expect(result).to.include('значение должно быть от 10 до 15 символов');
    });
  });

  describe('Валидация аватара', () => {
    const block = new TestBlock({ required: true });

    it('Успешная валидация корректного файла аватара', () => {
      const result = validators.avatar('image.jpg', block);
      // eslint-disable-next-line no-unused-expressions
      expect(result).to.be.undefined;
    });

    it('Ошибка при недопустимом расширении файла', () => {
      const result = validators.avatar('image.gif', block);
      expect(result).to.include('Допустимые расширения: jpg, jpeg, png');
    });

    it('Ошибка при отсутствии имени файла', () => {
      const result = validators.avatar('', block);
      expect(result).to.include('Необходимо загрузить файл');
    });
  });

  describe('Валидация электронной почты', () => {
    const block = new TestBlock({ required: true });

    it('Успешная валидация корректного email', () => {
      const result = validators.email('example@gmail.com', block);
      // eslint-disable-next-line no-unused-expressions
      expect(result).to.be.undefined;
    });

    it('Ошибка при пустом значении', () => {
      const result = validators.email('', block);
      expect(result).to.include('не должно быть пустым');
    });

    it('Ошибка при некорректном формате электронной почты', () => {
      const result = validators.email('example', block);
      expect(result).to.include('некорректный адрес электронной почты');
    });
  });

  describe('Валидация сообщения', () => {
    const block = new TestBlock({ required: true });

    it('Успешная валидация корректного сообщения', () => {
      const result = validators.message('Hello, World!', block);
      // eslint-disable-next-line no-unused-expressions
      expect(result).to.be.undefined;
    });

    it('Ошибка при пустом значении', () => {
      const result = validators.message('', block);
      expect(result).to.include('не должно быть пустым');
    });
  });
});
