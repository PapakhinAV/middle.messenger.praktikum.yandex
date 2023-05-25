import Block from '../../core/Block'
import template from './linkButton.hbs'

interface ILinkButtonProps {
    link: string
    text: string
    iconPath?: string
}
 class LinkButton extends Block<ILinkButtonProps> {
    constructor(props: ILinkButtonProps) {
        super(props);
    }

    render(){
        return this.compile(template, this.props)
    }

}

export default LinkButton
