import Block from '../core/Block';

export function isBlock(obj: any): obj is Block {
  return obj instanceof Block;
}
