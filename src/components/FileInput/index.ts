import Block from '../../core/Block';
import template from './fileInput.hbs';
import styles from './fileInputStyles.module.pcss';

interface IFileInputProps {
    text?: string
    logoUrl?: string;
    name: string
    required?: boolean
    error?: string
    events?: {
        focusout?: (event: PointerEvent)=>void
        change?: (e: InputEvent)=>void
    }
}
class FileInput extends Block<IFileInputProps> {
  constructor(props: IFileInputProps) {
    super(props);
  }

  render() {
    return this.compile(template, { ...this.props, styles });
  }
}

export default FileInput;
