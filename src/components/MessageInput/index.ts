import Block from '../../core/Block'
import template from './messageInput.hbs'



export interface ISendMessageProps {
    required: boolean,
    placeholder?: string
    value: string
    error?: string
    events?: {
        focusout?: (event: PointerEvent)=>void
        change?: (e: InputEvent)=>void
   }

}
 class MessageInput extends Block<ISendMessageProps> {
    constructor(props: ISendMessageProps) {
        super( props);
    }

    render(){
        return this.compile(template, this.props)
    }
}

export default MessageInput
