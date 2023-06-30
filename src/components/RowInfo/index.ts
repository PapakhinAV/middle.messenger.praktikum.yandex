import Block from '../../core/Block';
import template from './rowInfo.hbs';
import styles from './rowInfoStyles.module.pcss';

interface IRowInfoProps {
    label: string
    value: string
}
class RowInfo extends Block<IRowInfoProps> {
  constructor(props: IRowInfoProps) {
    super(props);
  }

  render() {
    return this.compile(template, { ...this.props, styles });
  }
}

export default RowInfo;
