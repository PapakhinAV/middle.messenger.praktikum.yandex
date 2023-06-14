import Block from '../Block';

function isEqual(lhs: string, rhs: string): boolean {
  return lhs === rhs;
}

function render(query: string, block: Block) {
  const root = document.querySelector(query);
  if (root === null) {
    throw new Error(`root not found by selector "${query}"`);
  }

  root.innerHTML = '';

  root.append(block.getContent()!);

  return root;
}

class Route {
  private _pathname: string;

  private readonly _blockClass: typeof Block;

  private readonly _query: Record<string, string>;

  private _block: Block | null;

  constructor(pathname: string, blockClass: typeof Block, query: Record<string, string>) {
    this._pathname = pathname;
    this._blockClass = blockClass;
    this._block = null;
    this._query = query;
  }

  navigate(pathname: string) {
    if (this.match(pathname)) {
      this._pathname = pathname;
      this.render();
    }
  }

  leave() {
    this._block = null;
  }

  match(pathname: string) {
    return isEqual(pathname, this._pathname);
  }

  render() {
    if (!this._block) {
      this._block = new this._blockClass({});
      render(this._query.rootQuery, this._block);
    }
  }
}

export default Route;
