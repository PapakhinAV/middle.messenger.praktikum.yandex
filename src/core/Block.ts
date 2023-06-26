import { v4 as makeUUID } from 'uuid';
import EventBus from './eventBus';

class Block<P extends Record<string, any> = any> {
  static EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_CDU: 'flow:component-did-update',
    FLOW_RENDER: 'flow:render',
  };

  public id: string = makeUUID();

  protected props: P;

  protected children: Record<string, Block | Block[]>;

  private eventBus: () => EventBus;

  private _element: HTMLElement | null = null;

  private renderQueue: (() => void)[] = [];

  private rendering: boolean = false;

  private eventListeners: { eventName: string, listener: ()=>{} }[] = [];

  constructor(propsWithChildren: P) {
    const eventBus = new EventBus();
    const { props, children } = this._getChildrenAndProps(propsWithChildren);

    this.children = children;
    this.props = this._makePropsProxy(props);
    this.eventBus = () => eventBus;
    this._registerEvents(eventBus);
    eventBus.emit(Block.EVENTS.INIT);
  }

  _registerEvents(eventBus: EventBus) {
    eventBus.on(Block.EVENTS.INIT, this._init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  _createResources() {
    const tagName = 'div';
    this._element = this._createDocumentElement(tagName);
  }

  private _init() {
    this._createResources();
    this.init();
    this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
  }

  protected init() {}

  _componentDidMount() {
    this.componentDidMount();
  }

  componentDidMount() {} // Может переопределять пользователь, необязательно трогать

  public dispatchComponentDidMount() { this.eventBus().emit(Block.EVENTS.FLOW_CDM); }

  private _componentDidUpdate(oldProps: Record<string, any>, newProps: Record<string, any>) {
    if (this.componentDidUpdate(oldProps, newProps)) {
      this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  protected componentDidUpdate(_oldProps: Record<string, any>, _newProps: Record<string, any>) {
    return true;
  }

  setProps = (nextProps: any) => {
    if (!nextProps) {
      return;
    }

    Object.assign(this.props, nextProps);
  };

  getProps = () => this.props;

  get element() {
    return this._element;
  }

  private _render() {
    if (this.rendering) {
      this.renderQueue.push(() => this._render());
      return;
    }
    this.rendering = true;

    const block = this.render();
    this._removeEvents();
    const newElement = block.firstElementChild as HTMLElement;
    this._element!.replaceWith(newElement);
    this._element! = newElement;
    this._addEvents();

    this.rendering = false;

    if (this.renderQueue.length > 0) {
      const nextRender = this.renderQueue.shift();
      nextRender?.();
    }
  }

  public get isRendering() {
    return this.rendering;
  }

  protected render(): DocumentFragment {
    return new DocumentFragment();
  }

  getContent() {
    return this.element;
  }

  _makePropsProxy(props: P) {
    // Можно и так передать this
    // Такой способ больше не применяется с приходом ES6+
    const self = this;

    return new Proxy(props, {
      get(target, prop: string) {
        const value = target[prop];
        return (typeof value === 'function') ? value.bind(target) : value;
      },
      set(target, prop: string, value) {
        const oldProps = { ...target[prop] };
        target[prop as keyof P] = value;
        self.eventBus().emit(Block.EVENTS.FLOW_CDU, oldProps, target);
        return true;
      },
      deleteProperty() {
        throw new Error('Нет доступа');
      },
    });
  }

  _createDocumentElement(tagName: string) {
    // Можно сделать метод, который через фрагменты в цикле создаёт сразу несколько блоков
    return document.createElement(tagName);
  }

  private _addEvents() {
    const { events = {} } = this.props;

    Object.keys(events).forEach((eventName: string) => {
      if (typeof events[eventName] === 'function') {
        const listener = events[eventName].bind(this);
        this._element?.addEventListener(eventName, listener);
        this.eventListeners.push({ eventName, listener });
      } else {
        const { searchParam, handler } = events[eventName];
        const listener = handler.bind(this);
        this._element?.querySelector(searchParam)?.addEventListener(eventName, listener);
        this.eventListeners.push({ eventName, listener });
      }
    });
  }

  private _removeEvents() {
    this.eventListeners.forEach(({ eventName, listener }) => {
      this._element?.removeEventListener(eventName, listener);
    });
    this.eventListeners = [];
  }

  private _getChildrenAndProps(childrenAndProps: P): { props: P, children: Record<string, Block>} {
    const props: Record<string, any> = {};
    const children: Record<string, Block> = {};

    Object.entries(childrenAndProps).forEach(([key, value]) => {
      if (value instanceof Block) { children[key] = value; } else { props[key] = value; }
    });

    return { props: props as P, children };
  }

  protected compile(template: (context: any) => string, context: any) {
    const contextAndStubs = { ...context };

    Object.entries(this.children).forEach(([name, component]) => {
      if (Array.isArray(component)) {
        contextAndStubs[name] = component.map((child) => `<div data-id="${child.id}"></div>`);
      } else {
        contextAndStubs[name] = `<div data-id="${component.id}"></div>`;
      }
    });
    const html = template(contextAndStubs);

    const temp = document.createElement('template');

    temp.innerHTML = html;

    const replaceStub = (component: Block) => {
      const stub = temp.content.querySelector(`[data-id="${component.id}"]`);

      if (!stub) {
        return;
      }

      component.getContent()?.append(...Array.from(stub.childNodes));

      stub.replaceWith(component.getContent()!);
    };

    Object.entries(this.children).forEach(([, component]) => {
      if (Array.isArray(component)) {
        component.forEach(replaceStub);
      } else {
        replaceStub(component);
      }
    });

    return temp.content;
  }
}
export default Block;
