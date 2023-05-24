import Block from "../core/Block";

export function getFormValue(children: Record<string, Block<any>>){
    return Object.keys(children).reduce((acc: Record<string, string>, el:string) => {
        const currElementValue = children[el].element?.querySelector('input')?.value
        if(currElementValue) acc[el] = currElementValue
        return acc
    }, {})
}
