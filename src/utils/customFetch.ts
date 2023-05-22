enum METHOD {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    PATCH = 'PATCH',
    DELETE = 'DELETE'
};

type Options = {
    method: METHOD;
    data?: any;
};

type OptionsWithoutMethod = Omit<Options, 'method'>;

class HTTPTransport {
    get(url: string, options: OptionsWithoutMethod = {}): Promise<XMLHttpRequest> {
        return this.request(url, {...options, method: METHOD.GET});
    };


    request(url: string, options: Options = { method: METHOD.GET }): Promise<XMLHttpRequest> {
        const {method, data} = options;

        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open(method, url);

            xhr.onload = function() {
                resolve(xhr);
            };

            xhr.onabort = reject;
            xhr.onerror = reject;
            xhr.ontimeout = reject;

            if (method === METHOD.GET || !data) {
                xhr.send();
            } else {
                xhr.send(data);
            }
        });
    };
}


// class HTTPTransport {
//
//     get = (url, options = {}) =>  this.request(url.concat(this.queryStringify(options.data)), {...options, method: this.METHODS.GET}, options.timeout);
//
//     post = (url, options = {}) =>  this.request(url, {...options, method: this.METHODS.POST}, options.timeout);
//
//     put = (url, options = {}) =>  this.request(url, {...options, method: this.METHODS.PUT}, options.timeout);
//
//     delete = (url, options = {}) => this.request(url, {...options, method: this.METHODS.DELETE}, options.timeout);
//
//     METHODS =  { GET: 'GET', POST: 'POST', PUT: 'PUT', DELETE: 'DELETE' }
//
//     queryStringify = (data) => {
//         if (typeof data !== 'object') throw new Error('Data must be object');
//
//         return Object.keys(data)?.reduce((str, el)=>str+=`${el}=${data[el].toString()}&`, '?').slice(0,-1)
//     }
//
//     request = (url, options = {}, timeout = 5000) => {
//
//         const {method, data, headers} = options;
//
//         return new Promise((resolve, reject) => {
//
//             if (!method) {
//                 reject('No method');
//                 return;
//             }
//
//             const xhr = new XMLHttpRequest();
//
//             xhr.open(method, url);
//
//             if(headers){Object.assign(headers)?.forEach(([header, value])=>{
//                 console.log({header, value})
//                 xhr.setRequestHeader(header, value)
//             })}
//
//             xhr.onload = function() {
//                 resolve(xhr);
//             };
//
//             xhr.onabort = reject;
//             xhr.onerror = reject;
//
//             xhr.timeout = timeout;
//             xhr.ontimeout = reject;
//
//             if (method === this.METHODS.GET || !data) {
//                 xhr.send();
//             } else {
//                 xhr.send(data);
//             }
//         });
//     };
// }


// function fetchWithRetry(url, options = {}) {
//
//     const {method = "GET", data, headers, retries} = options;
//     let retriesLeft = retries - 1;
//
//     const handlerError = (error) => {
//         if (!retriesLeft) throw err;
//         return fetchWithRetry(url, {...options, retries: retriesLeft});
//     }
//
//
//     return new Promise((resolve, reject) => {
//
//         const xhr = new XMLHttpRequest();
//
//         xhr.open(method, url);
//
//         if(headers){Object.assign(headers)?.forEach(([header, value])=>{
//             console.log({header, value})
//             xhr.setRequestHeader(header, value)
//         })}
//
//         xhr.onload = function() {
//             resolve(xhr);
//         };
//
//         xhr.onabort = reject;
//         xhr.onerror = reject;
//
//
//         if (method === "GET" || !data) {
//             xhr.send();
//         } else {
//             xhr.send(data);
//         }
//     }).catch(handlerError)
// }
