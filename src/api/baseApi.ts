import HTTPTransport from '../core/HTTPTransport';

export class BaseAPI {
  protected http: HTTPTransport;

  protected constructor(endpoint: string) {
    this.http = new HTTPTransport(endpoint);
  }

  create() { throw new Error('Not implemented'); }

  request() { throw new Error('Not implemented'); }

  update() { throw new Error('Not implemented'); }

  delete() { throw new Error('Not implemented'); }
}
