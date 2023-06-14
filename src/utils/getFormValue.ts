import Block from '../core/Block';

export function getFormValue(children: Record<string, Block<any>>) {
  return Object.keys(children).reduce((acc: Record<string, any>, el:string) => {
    const currElement = children[el].element?.querySelector('input');
    const currElementValue = currElement?.value;
    if (currElementValue) acc[currElement.name] = currElementValue;
    return acc;
  }, {});
}
