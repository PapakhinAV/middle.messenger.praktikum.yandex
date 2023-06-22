import Block from '../../core/Block';
import template from './sendMessageButton.hbs';
import styles from './sendMessageButtonStyles.module.pcss';

export interface ISendMessageButtonProps {

    iconPath: string;
    events?: {
        click?: (e: Event)=> void;
    };

}
class SendMessageButton extends Block<ISendMessageButtonProps> {
  constructor(props: ISendMessageButtonProps) {
    super(props);
  }

  render() {
    return this.compile(template, { ...this.props, styles });
  }
}

export default SendMessageButton;
