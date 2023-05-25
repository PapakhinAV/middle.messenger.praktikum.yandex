import Block from '../../core/Block'
import template from './simpleInput.hbs'

interface ISimpleInputProps {
    name: string
    type: string
    value: string
    label?: string
    error?: string
    required?: boolean
    events?: {
        focusout?: (event: PointerEvent)=>void
        change?: (e: InputEvent)=>void
    }
}
 class SimpleInput extends Block<ISimpleInputProps> {
    constructor({required = false, ...otherProps}: ISimpleInputProps) {
        super( {required, ...otherProps});
    }

    render(){
        return this.compile(template, this.props)
    }

}

export default SimpleInput
