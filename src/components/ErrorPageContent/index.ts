import Block from '../../core/Block';
import template from './errorPageContent.hbs';
import LinkButton from '../LinkButton';
import styles from './errorPageContentStyles.module.pcss';
import router from '../../core/Router/Router';

interface IErrorPageContentProps {
    title: string
    description: string
    buttonLink: string
    buttonText: string
}
class ErrorPageContent extends Block<IErrorPageContentProps> {
  constructor(props: IErrorPageContentProps) {
    super(props);
  }

  init() {
    this.children.button = new LinkButton({
      text: this.props.buttonText,
      link: this.props.buttonLink,
      events: {
        click: (e) => {
          e.preventDefault();
          router.back();
        },
      },
    });
  }

  render() {
    return this.compile(template, { ...this.props, styles });
  }
}

export default ErrorPageContent;
