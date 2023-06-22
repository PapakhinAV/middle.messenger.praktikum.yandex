import Block from '../core/Block';
import { isBlock } from '../ typeGuards/isBlock';

export function getFormValue(children: Record<string, Block<any> | Block<any>[]>) {
  return Object.keys(children).reduce((acc: Record<string, any>, el:string) => {
    if (isBlock(children[el])) {
      const currElement = (children[el] as Block<any>).element?.querySelector('input');
      const currElementValue = currElement?.value;
      if (currElementValue) acc[currElement.name] = currElementValue;
      return acc;
    }
    (children[el] as Block<any>[]).forEach((element) => {
      const arrElement = element.element?.querySelector('input');
      const arrElementValue = arrElement?.value;
      if (arrElementValue) acc[arrElement.name] = arrElementValue;
    });

    return acc;
  }, {});
}
