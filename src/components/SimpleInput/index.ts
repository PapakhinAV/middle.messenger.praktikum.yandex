import Block from '../../core/Block'
import template from './simpleInput.hbs'

interface ISimpleInputProps {
    name: string
    type: string
    value: string
    label?: string
    events?: {
        focusin?: (event: PointerEvent)=>void
        focusout?: (event: PointerEvent)=>void
        click?: (event: PointerEvent)=>void
    }
}
 class SimpleInput extends Block<ISimpleInputProps> {
    constructor(props: ISimpleInputProps) {
        super('div', props);
        this.element?.classList.add("simpleInput__wrapper")
    }

    render(){
        return this.compile(template, this.props)
    }

}

export default SimpleInput
