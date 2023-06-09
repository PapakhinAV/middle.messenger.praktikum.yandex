import queryStringify from '../utils/queryStringify';

export type TOptions = {
    data?: any;
    timeout?: number
    headers?: Record<string, string>
};

type HTTPMethod = <Response>(url: string, options?: TOptions) => Promise<Response>;

class HTTPTransport {
  protected API_URL = 'https://ya-praktikum.tech/api/v2';

  protected endpoint: string;

  constructor(endpoint: string, API_URL?: string) {
    if (API_URL) this.API_URL = API_URL;
    this.endpoint = `${this.API_URL}${endpoint}`;
  }

  public get: HTTPMethod = (url, options) => this.request(
    (this.endpoint + url).concat(queryStringify(options?.data)),
    { ...options, method: this.METHODS.GET },
    options?.timeout,
  );

  public post: HTTPMethod = (url, options) => this.request((this.endpoint + url), { ...options, method: this.METHODS.POST }, options?.timeout);

  public put: HTTPMethod = (url, options) => this.request((this.endpoint + url), { ...options, method: this.METHODS.PUT }, options?.timeout);

  public delete: HTTPMethod = (url, options) => this.request((this.endpoint + url), { ...options, method: this.METHODS.DELETE }, options?.timeout);

  private METHODS = {
    GET: 'GET', POST: 'POST', PUT: 'PUT', DELETE: 'DELETE',
  };

  private request<Response>(url: string, options: TOptions & { method: string}, timeout = 5000): Promise<Response> {
    const { method, data, headers } = options;

    return new Promise((resolve, reject) => {
      if (!method) {
        reject('No method');
        return;
      }

      const xhr = new XMLHttpRequest();

      xhr.open(method, url);

      xhr.withCredentials = true;
      xhr.responseType = 'json';

      if (headers) {
        Object.entries(headers)?.forEach(([header, value]) => {
          xhr.setRequestHeader(header, value);
        });
      }

      xhr.onreadystatechange = () => {
        if (xhr.readyState === XMLHttpRequest.DONE) {
          if (xhr.status < 400) {
            resolve(xhr.response);
          } else {
            reject(xhr.response);
          }
        }
      };

      xhr.onabort = reject;
      xhr.onerror = reject;

      xhr.timeout = timeout;
      xhr.ontimeout = reject;

      if (method === this.METHODS.GET || !data) {
        xhr.send();
      } else if (data instanceof FormData) {
        xhr.send(data);
      } else {
        xhr.send(JSON.stringify(data));
      }
    });
  }
}

export default HTTPTransport;
