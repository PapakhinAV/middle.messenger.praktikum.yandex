/* eslint-disable no-unused-expressions */
import { describe } from 'mocha';
import { expect } from 'chai';
import { set } from './set';
import cloneDeep, { isSimpleType } from './cloneDeep';
import trim from './trim';
import { escapeHtml, unescapeHtml } from './escapeHtml';
import isObjectsEqual from './isObjectsEqual';

describe('Utils', () => {
  describe('Функция Set', () => {
    const keypath = 'test';
    const value = 'some value';
    let obj: Record<string, unknown>;

    beforeEach(() => {
      obj = {};
    });

    it('Добавляет переданное значение в объект по указанному пути', () => {
      set(obj, keypath, value);
      expect(obj).to.haveOwnProperty(keypath, value);
    });

    it('Возвращает оригинальный объект', () => {
      const result = set(obj, keypath, value);
      obj.test2 = 'another value';
      expect(result).to.equal(obj);
    });

    it('Возвращает оригинальное значение obj, если был передан не объект', () => {
      const notAnObject = 'string';
      const result = set(notAnObject, keypath, value);
      expect(result).to.eq(notAnObject);
    });

    it('Возвращает ошибку если path не является строкой', () => {
      const keypathNotAString = 10;
      // @ts-ignore
      expect(() => set(obj, keypathNotAString, value)).to.throw(Error);
    });
  });

  describe('Функция cloneDeep', () => {
    it('Создаёт глубокую копию простого объекта', () => {
      const obj = {
        a: 1, b: 'test', c: true, d: Symbol('test'),
      };
      const cloned = cloneDeep(obj);
      expect(cloned).to.deep.equal(obj);
      expect(cloned).to.not.equal(obj);
    });

    it('Создаёт глубокую копию вложенного объекта', () => {
      const obj = { a: 1, b: { c: 'test', d: { e: true } } };
      const cloned = cloneDeep(obj);
      expect(cloned).to.deep.equal(obj);
      expect(cloned).to.not.equal(obj);
      expect(cloned.b).to.not.equal(obj.b);
      expect(cloned.b.d).to.not.equal(obj.b.d);
    });

    it('Создаёт глубокую копию массива', () => {
      const arr = [1, 'test', [true, Symbol('test')]];
      const cloned = cloneDeep(arr);
      expect(cloned).to.deep.equal(arr);
      expect(cloned).to.not.equal(arr);
      expect(cloned[2]).to.not.equal(arr[2]);
    });

    it('Возвращает примитивы "как есть"', () => {
      const values = ['test', 123, true, Symbol('test')];
      values.forEach((value) => {
        // @ts-ignore
        expect(cloneDeep(value)).to.equal(value);
      });
    });

    it('Обрабатывает значения, не являющиеся примитивами, но при этом пройденные функцией isSimpleType', () => {
      const values = ['test', 123, true, Symbol('test')];
      values.forEach((value) => {
        expect(isSimpleType(value)).to.be.true;
        // @ts-ignore
        expect(cloneDeep(value)).to.equal(value);
      });
    });
  });

  describe('Функция trim', () => {
    it('Обрабатывает пробелы в начале и конце строки', () => {
      const str = '   Hello, world!   ';
      const result = trim(str);
      expect(result).to.equal('Hello, world!');
    });

    it('Обрабатывает специальные символы, если они переданы в качестве аргумента', () => {
      const str = '***Hello, world!***';
      const result = trim(str, '*');
      expect(result).to.equal('Hello, world!');
    });

    it('Обрабатывает пустую строку', () => {
      const str = '';
      const result = trim(str);
      expect(result).to.equal('');
    });

    it('Обрабатывает строку, состоящую только из символов для обрезки', () => {
      const str = '     ';
      const result = trim(str);
      expect(result).to.equal('');
    });

    it('Обрабатывает строку без символов для обрезки', () => {
      const str = 'Hello, world!';
      const result = trim(str);
      expect(result).to.equal('Hello, world!');
    });
  });
  describe('Функция escapeHtml', () => {
    it('должна заменять специальные символы HTML на соответствующие сущности', () => {
      const result = escapeHtml('<script>alert("XSS")</script>');
      expect(result).to.equal('&lt;script&gt;alert(&quot;XSS&quot;)&lt;&#x2F;script&gt;');
    });

    it('не должна заменять символы, которые не являются специальными символами HTML', () => {
      const result = escapeHtml('Hello, World!');
      expect(result).to.equal('Hello, World!');
    });
  });

  describe('Функция unescapeHtml', () => {
    it('должна заменять сущности на соответствующие символы HTML', () => {
      const result = unescapeHtml('&lt;script&gt;alert(&quot;XSS&quot;)&lt;/script&gt;');
      expect(result).to.equal('<script>alert("XSS")</script>');
    });

    it('не должна заменять строки без сущностей', () => {
      const result = unescapeHtml('Hello, World!');
      expect(result).to.equal('Hello, World!');
    });
  });

  describe('Функция isObjectsEqual', () => {
    it('Возвращает true для двух пустых объектов', () => {
      const obj1 = {};
      const obj2 = {};
      const result = isObjectsEqual(obj1, obj2);
      expect(result).to.be.true;
    });

    it('Возвращает true для двух одинаковых объектов', () => {
      const obj1 = { name: 'John', age: 30 };
      const obj2 = { name: 'John', age: 30 };
      const result = isObjectsEqual(obj1, obj2);
      expect(result).to.be.true;
    });

    it('Возвращает false для объектов с разными значениями', () => {
      const obj1 = { name: 'John', age: 30 };
      const obj2 = { name: 'John', age: 40 };
      const result = isObjectsEqual(obj1, obj2);
      expect(result).to.be.false;
    });

    it('Возвращает false для объектов с разными ключами', () => {
      const obj1 = { name: 'John', age: 30 };
      const obj2 = { firstName: 'John', age: 30 };
      const result = isObjectsEqual(obj1, obj2);
      expect(result).to.be.false;
    });

    it('Возвращает false для объекта и массива', () => {
      const obj = { name: 'John', age: 30 };
      const arr = [1, 2, 3];
      const result = isObjectsEqual(obj, arr);
      expect(result).to.be.false;
    });

    it('Возвращает true для вложенных объектов с одинаковыми значениями', () => {
      const obj1 = { name: 'John', address: { city: 'New York', country: 'USA' } };
      const obj2 = { name: 'John', address: { city: 'New York', country: 'USA' } };
      const result = isObjectsEqual(obj1, obj2);
      expect(result).to.be.true;
    });

    it('Возвращает false для вложенных объектов с разными значениями', () => {
      const obj1 = { name: 'John', address: { city: 'New York', country: 'USA' } };
      const obj2 = { name: 'John', address: { city: 'Los Angeles', country: 'USA' } };
      const result = isObjectsEqual(obj1, obj2);
      expect(result).to.be.false;
    });
  });
});
