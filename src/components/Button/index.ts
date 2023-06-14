import classNames from 'classnames';
import Block from '../../core/Block';
import template from './button.hbs';
import styles from './buttonStyles.module.pcss';

interface IButtonProps {
    link?: string
    type: string
    text: string
    size?: 'small'
    className?: string
    events?: {
        click?: (e: Event)=> void;
    };
}
class Button extends Block<IButtonProps> {
  constructor(props: IButtonProps) {
    super(props);
    if (this.props?.link) this.element?.setAttribute('onclick', `location.href='${this.props.link}'`);
    this.props.className = classNames(styles.generalButton, {
      [styles.generalButtonSmall]: this.props?.size === 'small',
    });
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}

export default Button;
