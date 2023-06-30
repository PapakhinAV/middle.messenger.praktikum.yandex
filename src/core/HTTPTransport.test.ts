/* eslint-disable no-unused-expressions */
import sinon, { SinonFakeXMLHttpRequest, SinonFakeXMLHttpRequestStatic } from 'sinon';
import { expect } from 'chai';
import HTTPTransport from './HTTPTransport';

describe('HTTPTransport', () => {
  let xhr: SinonFakeXMLHttpRequestStatic;
  let instance: HTTPTransport;
  const requests: SinonFakeXMLHttpRequest[] = [];

  beforeEach(() => {
    xhr = sinon.useFakeXMLHttpRequest();

    // @ts-ignore
    global.XMLHttpRequest = xhr;

    xhr.onCreate = ((request: SinonFakeXMLHttpRequest) => {
      requests.push(request);
    });

    instance = new HTTPTransport('');
  });

  afterEach(() => {
    requests.length = 0;
  });
  describe('GET', () => {
    it('.get() должен отправить GET-запрос', () => {
      instance.get('/user');

      const [request] = requests;

      expect(request.method).to.eq('GET');
    });

    it('должен разрешить с данными ответа при успешном запросе', async () => {
      const responseData = { id: 1, name: 'John' };

      instance.get('/users').then((response) => {
        expect(response).to.deep.equal(responseData);
      });

      const [request] = requests;

      request.respond(200, { 'Content-Type': 'application/json' }, JSON.stringify(responseData));
    });
    it('должен отклонить с сообщением об ошибке при неудачном запросе', async () => {
      const errorMessage = 'Internal Server Error';

      instance.get('/users').catch((error) => {
        expect(error).to.equal(errorMessage);
      });

      const [request] = requests;

      request.respond(500, { 'Content-Type': 'application/json' }, errorMessage);
    });
    it('должен разрешить с пустым объектом при отсутствии данных в ответе', async () => {
      instance.get('/users').then((response) => {
        expect(response).to.deep.equal({});
      });

      const [request] = requests;

      // @ts-ignore
      request.respond(200, { 'Content-Type': 'application/json' }, null);
    });

    it('должен отправить GET-запрос с правильными заголовками', () => {
      instance.get('/users', { headers: { Authorization: 'Bearer token' } });

      const [request] = requests;

      expect(request.requestHeaders.Authorization).to.equal('Bearer token');
    });
    it('должен установить таймаут для запроса', () => {
      instance.get('/users', { timeout: 5000 });

      const [request] = requests;

      // @ts-ignore
      expect(request.timeout).to.equal(5000);
    });
  });

  describe('POST', () => {
    it('должен отправить POST-запрос с правильным URL и данными', () => {
      const data = { name: 'John', age: 25 };
      instance.post('/users', { data });

      const [request] = requests;

      expect(request.method).to.equal('POST');
      expect(request.url).to.equal('https://ya-praktikum.tech/api/v2/users');
      expect(request.requestBody).to.equal(JSON.stringify(data));
    });
    it('должен отправить POST-запрос с правильным Content-Type заголовком', () => {
      instance.post('/users', { headers: { 'Content-Type': 'application/json' } });

      const [request] = requests;

      const contentType = request.requestHeaders['Content-Type'];

      expect(contentType.startsWith('application/json')).to.be.true;
    });
  });

  describe('PUT', () => {
    it('должен отправить PUT-запрос с правильным URL и данными', () => {
      const data = { name: 'John', age: 25 };
      instance.put('/users/1', { data });

      const [request] = requests;

      expect(request.method).to.equal('PUT');
      expect(request.url).to.equal('https://ya-praktikum.tech/api/v2/users/1');
      expect(request.requestBody).to.equal(JSON.stringify(data));
    });
  });

  describe('DELETE', () => {
    it('должен отправить DELETE-запрос с правильным URL', () => {
      instance.delete('/users/1');

      const [request] = requests;

      expect(request.method).to.equal('DELETE');
      expect(request.url).to.equal('https://ya-praktikum.tech/api/v2/users/1');
    });
  });
});
