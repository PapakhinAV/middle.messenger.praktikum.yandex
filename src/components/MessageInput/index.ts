import Block from '../../core/Block';
import template from './messageInput.hbs';
import styles from './messageInputStyles.module.pcss';

export interface ISendMessageProps {
    required: boolean,
    placeholder?: string
    value: string
    error?: string
    events?: {
        change?: {
          searchParam: string
          handler: (e: InputEvent)=>void }
        blur?: {
          searchParam: string
          handler: (event: PointerEvent)=>void
        }
        keydown: (e:KeyboardEvent)=>void
   }

}
class MessageInput extends Block<ISendMessageProps> {
  constructor(props: ISendMessageProps) {
    super(props);
  }

  render() {
    return this.compile(template, { ...this.props, styles });
  }
}
export default MessageInput;
