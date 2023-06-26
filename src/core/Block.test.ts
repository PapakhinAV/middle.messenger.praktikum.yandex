/* eslint-disable max-classes-per-file,no-unused-expressions,no-new */
import proxyquire from 'proxyquire';
import sinon from 'sinon';
import { describe } from 'mocha';
import { expect } from 'chai';

let eventBusMock = {
  on: sinon.fake(),
  emit: sinon.fake(),
};

const { default: Block } = proxyquire('./Block.ts', {
  './eventBus.ts': {
    default: class {
      emit = eventBusMock.emit;

      on = eventBusMock.on;
    },
  },
});

describe('Block', () => {
  beforeEach(() => {
    eventBusMock = {
      on: sinon.fake(),
      emit: sinon.fake(),
    };
  });
  class ComponentMock extends Block {
    constructor(prop = {}) {
      super(prop);
    }

    protected render(): DocumentFragment {
      const fragment = new DocumentFragment();
      const div = document.createElement('div');
      div.innerHTML = '<p>Test</p>';
      fragment.appendChild(div);
      return fragment;
    }
  }

  it('Должен вызывать событие init после инициализации', () => {
    new ComponentMock();
    expect(eventBusMock.emit.calledWith(ComponentMock.EVENTS.INIT)).to.be.true;
  });

  it('Корректно утанавливает свойства через setProps', () => {
    const block = new ComponentMock();
    const propD = { propD: 'test' };
    const newProps = {
      propA: 123, propB: 'test', propC: true, propD,
    };
    block.setProps(newProps);
    expect(block.getProps()).to.be.deep.equal(newProps);
  });

  it('После обновления свойств через setProps вызывается событие componentDidUpdate', () => {
    const oldProps = { a: 'test' };
    const newProps = {
      propA: 123, propB: 'test', propC: true,
    };
    const block = new ComponentMock(oldProps);
    block.setProps(newProps);
    expect(eventBusMock.emit.calledWith(ComponentMock.EVENTS.FLOW_CDU)).to.be.true;
  });
});
