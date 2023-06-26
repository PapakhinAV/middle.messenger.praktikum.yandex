export type Indexed<T = any> = {
  [key in string]: T | Indexed<T>;
};

export function merge(lhs: Indexed<any>, rhs: Indexed<any>): Indexed<any> {
  // eslint-disable-next-line no-restricted-syntax
  for (const key in lhs) {
    if (lhs[key] && typeof lhs[key] === 'object' && !Array.isArray(lhs[key])) {
      lhs[key] = merge(lhs[key], {});
    }
  }

  // eslint-disable-next-line no-restricted-syntax
  for (const key in rhs) {
    if (rhs[key]) {
      if (lhs[key] && typeof lhs[key] === 'object' && typeof rhs[key] === 'object' && !Array.isArray(rhs[key])) {
        lhs[key] = merge(lhs[key], rhs[key]);
      } else {
        lhs[key] = rhs[key];
      }
    }
  }

  return lhs;
}

