export type TOptions = {
    method: string;
    data?: any;
    timeout?: number
    headers?: Record<string, string>
};

class HTTPTransport {
  get = (url: string, options: TOptions) => this.request(
    url.concat(this.queryStringify(options.data)),
    { ...options, method: this.METHODS.GET },
    options.timeout,
  );

  post = (url: string, options: TOptions) => this.request(url, { ...options, method: this.METHODS.POST }, options.timeout);

  put = (url: string, options: TOptions) => this.request(url, { ...options, method: this.METHODS.PUT }, options.timeout);

  delete = (url: string, options: TOptions) => this.request(url, { ...options, method: this.METHODS.DELETE }, options.timeout);

  METHODS = {
    GET: 'GET', POST: 'POST', PUT: 'PUT', DELETE: 'DELETE',
  };

  queryStringify = (data: any) => {
    if (typeof data !== 'object') throw new Error('Data must be object');

    return Object.keys(data)?.reduce((str, el) => `${str}${el}=${data[el].toString()}&`, '?').slice(0, -1);
  };

  request = (url: string, options: TOptions, timeout = 5000) => {
    const { method, data, headers } = options;

    return new Promise((resolve, reject) => {
      if (!method) {
        reject('No method');
        return;
      }

      const xhr = new XMLHttpRequest();

      xhr.open(method, url);

      if (headers) {
        Object.entries(headers)?.forEach(([header, value]) => {
          xhr.setRequestHeader(header, value);
        });
      }

      xhr.onload = function () {
        resolve(xhr);
      };

      xhr.onabort = reject;
      xhr.onerror = reject;

      xhr.timeout = timeout;
      xhr.ontimeout = reject;

      if (method === this.METHODS.GET || !data) {
        xhr.send();
      } else {
        xhr.send(data);
      }
    });
  };
}

export default HTTPTransport;
