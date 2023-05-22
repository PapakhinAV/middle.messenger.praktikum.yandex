import Block from '../../core/Block'
import template from './linkButton.hbs'

interface ILinkButtonProps {
    link: string
    text: string
    iconPath?: string
}
 class LinkButton extends Block<ILinkButtonProps> {
    constructor(props: ILinkButtonProps) {
        super('a', props);
        this.element?.setAttribute('href', this.props.link)
        this.element?.classList.add("linkButton")
    }

    render(){
        return this.compile(template, this.props)
    }

}

export default LinkButton
