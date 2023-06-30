import { merge } from './merge';

export type Indexed<T = any> = {
  [key in string]: T | Indexed<T>;
};
function isObject(variable: unknown) {
  return typeof variable === 'object' && variable !== null && !Array.isArray(variable);
}

export function set(object: Indexed | unknown, path: string, value: unknown): Indexed | unknown {
  if (typeof path !== 'string') throw Error('path must be string');
  if (!isObject(object)) return object;

  const pathToArr = path.split('.');
  const result = pathToArr.reduceRight<Indexed>((acc, key) => ({ [key]: acc }), value as any);

  merge(object as Indexed, result);
  return object;
}
