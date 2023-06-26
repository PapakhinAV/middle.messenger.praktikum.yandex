import sinon from 'sinon';
import { expect } from 'chai';
import { Router } from './index';
import Block from '../Block';

describe('Router', () => {
  global.window.history.back = () => {
    if (typeof window.onpopstate === 'function') {
      window.onpopstate({ currentTarget: window } as unknown as PopStateEvent);
    }
  };
  global.window.history.forward = () => {
    if (typeof window.onpopstate === 'function') {
      window.onpopstate({ currentTarget: window } as unknown as PopStateEvent);
    }
  };

  const getContentFake = sinon.fake.returns(document.createElement('div'));

  const BlockMock = class {
    getContent = getContentFake;
  } as unknown as typeof Block;

  it('Метод use() должен вернуть инстанс Router', () => {
    const result = Router.use('/', BlockMock);

    expect(result).to.eq(Router);
  });

    it('Метод back() рендерит страницу при вызове history.back', () => {
      Router
        .use('/', BlockMock)
        .start();

      Router.back();

      expect(getContentFake.callCount).to.eq(1);
    });

  it('Рендерит страницу при вызове функции start', () => {
    Router
      .use('/', BlockMock)
      .start();

    expect(getContentFake.callCount).to.eq(1);
  });
});
