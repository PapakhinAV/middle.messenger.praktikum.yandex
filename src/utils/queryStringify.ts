// type StringIndexed = Record<string, any>;
//
// function queryStringify(data: StringIndexed): string | never {
//   if (typeof data !== 'object' || data === null) {
//     throw new Error('input must be an object');
//   }
//
//   const queryParams = [];
//
//   for (const [key, value] of Object.entries(data)) {
//     if (Array.isArray(value)) {
//       for (let i = 0; i < value.length; i++) {
//         const arrayKey = `${key}[${i}]`;
//         const arrayValue = value[i];
//         if (typeof arrayValue === 'object' && arrayValue !== null) {
//           queryParams.push(queryStringify({ [arrayKey]: arrayValue }));
//         } else {
//           queryParams.push(`${arrayKey}=${arrayValue}`);
//         }
//       }
//     } else if (typeof value === 'object' && value !== null) {
//       Object.entries(value).forEach(([innerKey, innerValue]) => {
//         const objKey = `${key}[${innerKey}]`;
//         if (typeof innerValue === 'object' && innerValue !== null) {
//           queryParams.push(queryStringify({ [objKey]: innerValue }));
//         } else {
//           queryParams.push(`${objKey}=${innerValue}`);
//         }
//       });
//     } else {
//       queryParams.push(`${key}=${value}`);
//     }
//   }
//
//   return queryParams.join('&');
// }
//
// export default queryStringify;
type PlainObject<T = unknown> = {
  [k in string]: T;
};

function isPlainObject(value: unknown): value is PlainObject {
  return typeof value === 'object'
    && value !== null
    && value.constructor === Object
    && Object.prototype.toString.call(value) === '[object Object]';
}

function isArray(value: unknown): value is [] {
  return Array.isArray(value);
}

function isArrayOrObject(value: unknown): value is [] | PlainObject {
  return isPlainObject(value) || isArray(value);
}

function getKey(key: string, parentKey?: string) {
  return parentKey ? `${parentKey}[${key}]` : key;
}

function getParams(data: PlainObject | [], parentKey?: string) {
  const result: [string, string][] = [];

  for (const [key, value] of Object.entries(data)) {
    if (isArrayOrObject(value)) {
      result.push(...getParams(value, getKey(key, parentKey)));
    } else {
      result.push([getKey(key, parentKey), encodeURIComponent(String(value))]);
    }
  }

  return result;
}

function queryString(data: PlainObject) {
  if (!data) return '';
  if (!isPlainObject(data)) {
    throw new Error('input must be an object');
  }

  return getParams(data).map((arr) => arr.join('=')).join('&');
}
export default queryString;
