import Block from '../../core/Block';
import template from './avatar.hbs';
import photo from '../../assets/svg/photo.svg';

interface IAvatarProps {
    name: string
    iconPath?: string
}
class Avatar extends Block<IAvatarProps> {
  constructor(props: IAvatarProps) {
    super(props);
  }

  render() {
    const { name, iconPath } = this.props;
    return this.compile(template, { name, iconPath: iconPath || photo });
  }
}

export default Avatar;
