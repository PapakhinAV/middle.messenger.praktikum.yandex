import Block from '../../core/Block'
import template from './messages.hbs'

export interface IMessage {
    id: string
    text: string
    time: string
    type: 'send' | "incoming"
}

export interface IMessagesProps {
    messages: IMessage[]
}
 class Message extends Block<IMessagesProps> {
    constructor(props: IMessagesProps) {
        super( props);
    }

    render(){
        return this.compile(template, this.props)
    }
}

export default Message
