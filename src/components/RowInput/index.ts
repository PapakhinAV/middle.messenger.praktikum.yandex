import Block from '../../core/Block'
import template from './rowInput.hbs'
import {SimpleInput} from "../";

interface IRowInputProps {
    placeholder?: string
    name: string
    type: string
    value: string
    error?: string
    required?: boolean
    events?: {
        focusout?: (event: PointerEvent)=>void
        change?: (e: InputEvent)=>void
    }

}
 class RowInput extends Block<IRowInputProps> {
    constructor(props: IRowInputProps) {
        super('div', props);
        this.element?.classList.add("rowInput")
    }

     init(){
         this.children.input = new SimpleInput({
             name: this.props.name,
             type: this.props.type,
             value: this.props.value,
             required: this.props.required
         });
     }
    render(){
        return this.compile(template, this.props)
    }
}

export default RowInput
