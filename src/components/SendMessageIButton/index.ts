import Block from '../../core/Block'
import template from './sendMessageIButton.hbs'



export interface ISendMessageIButtonProps {

    iconPath: string;
    events?: {
        click?: (e: Event)=> void;
    };

}
 class SendMessageIButton extends Block<ISendMessageIButtonProps> {
    constructor(props: ISendMessageIButtonProps) {
        super( props);
    }

    render(){
        return this.compile(template, this.props)
    }
}

export default SendMessageIButton
