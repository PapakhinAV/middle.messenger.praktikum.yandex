export type Indexed<T = any> = {
  [key in string]: T | Indexed<T>;
};

export function merge(lhs: Indexed<any>, rhs: Indexed<any>): Indexed<any> {
  const result: Indexed<any> = {};

  // eslint-disable-next-line no-restricted-syntax
  for (const key in lhs) {
    if (lhs[key] && typeof lhs[key] === 'object' && !Array.isArray(lhs[key])) {
      result[key] = merge(lhs[key], {});
    } else {
      result[key] = lhs[key];
    }
  }

  // eslint-disable-next-line no-restricted-syntax
  for (const key in rhs) {
    if (rhs[key]) {
      if (result[key] && typeof result[key] === 'object' && typeof rhs[key] === 'object' && !Array.isArray(rhs[key])) {
        result[key] = merge(result[key], rhs[key]);
      } else {
        result[key] = rhs[key];
      }
    }
  }

  return result;
}
