import Block from '../../core/Block'
import template from './button.hbs'

interface IButtonProps {
    link?: string
    type: string
    text: string
    events?: {
        click?: (e: Event)=> void;
    };
}
 class Button extends Block<IButtonProps> {
    constructor(props: IButtonProps) {
        super(props);
        this.props.link && this.element?.setAttribute('onclick', `location.href='${this.props.link}'`)
    }

    render(){
        return this.compile(template, this.props)
    }

}

export default Button
