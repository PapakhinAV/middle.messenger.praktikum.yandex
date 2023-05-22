import Block from '../../core/Block'
import template from './errorPageContent.hbs'
import LinkButton from "../LinkButton";

interface IErrorPageContentProps {
    title: string
    description: string
    buttonLink: string
    buttonText: string
}
class ErrorPageContent extends Block<IErrorPageContentProps> {
    constructor(props: IErrorPageContentProps) {
        super('div', props);
        this.element?.classList.add("errorPage__wrapper")
    }

    init(){
        this.children.button = new LinkButton({
            text: this.props.buttonText,
            link: this.props.buttonLink,
        });
    }
    render(){
        return this.compile(template, this.props)
    }

}

export default ErrorPageContent
