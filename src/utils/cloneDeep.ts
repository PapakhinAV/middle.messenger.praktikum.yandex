function isSimpleType(value: any): boolean {
  const type = typeof value;
  return (
    type === 'string'
    || type === 'number'
    || type === 'boolean'
    || type === 'symbol'
  );
}

function cloneDeep<T extends object>(obj: T): T {
  if (Array.isArray(obj)) {
    return obj.map((item) => {
      if (isSimpleType(item)) return item;
      return cloneDeep(item);
    }) as unknown as T;
  }
  if (typeof obj === 'object' && obj !== null) {
    return Object.keys(obj).reduce((acc, key) => {
      const value = obj[key as keyof T];
      return {
        ...acc,
        [key]: isSimpleType(value) ? value : cloneDeep(value as unknown as T),
      };
    }, {} as T);
  }
  return obj;
}

export default cloneDeep;
