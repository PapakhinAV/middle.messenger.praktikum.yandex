type Indexed<T = unknown> = {
  [key in string]: T;
};

function merge(lhs: Indexed<any>, rhs: Indexed<any>): Indexed {
  const result: Indexed<any> = { ...lhs };

  // eslint-disable-next-line no-restricted-syntax
  for (const key in rhs) {
    if (rhs[key]) {
      if (result[key] && typeof result[key] === 'object' && typeof rhs[key] === 'object') {
        result[key] = merge(result[key], rhs[key]);
      } else {
        result[key] = rhs[key];
      }
    }
  }
  return result;
}

export default merge;
