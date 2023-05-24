import Block from '../../core/Block'
import template from './button.hbs'

interface IButtonProps {
    link?: string
    type: string
    text: string
    events?: {
        click?: ()=> void;
    };
}
 class Button extends Block<IButtonProps> {
    constructor(props: IButtonProps) {
        super('button', props);
        this.element?.classList.add("generalButton")
        this.props.link && this.element?.setAttribute('onclick', `location.href='${this.props.link}'`)
        this.element?.setAttribute('type', this.props.type)
    }

    render(){
        return this.compile(template, this.props)
    }

}

export default Button
