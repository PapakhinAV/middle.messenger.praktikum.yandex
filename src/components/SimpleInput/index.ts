import Block from '../../core/Block';
import template from './simpleInput.hbs';
import styles from './simpleInputStyles.module.pcss';

interface ISimpleInputProps {
    name: string
    type: string
    value: string
    label?: string
    error?: string
    required?: boolean
    events?: {
        focusout?: (event: PointerEvent)=>void
        change?: (e: InputEvent)=>void
        keydown?: (e:KeyboardEvent)=>void
    }
}
class SimpleInput extends Block<ISimpleInputProps> {
  constructor({ required = false, ...otherProps }: ISimpleInputProps) {
    super({ required, ...otherProps });
  }

  render() {
    return this.compile(template, { ...this.props, styles });
  }
}

export default SimpleInput;
