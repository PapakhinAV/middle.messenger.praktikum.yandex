import Block from '../../core/Block';
import template from './avatar.hbs';
import photo from '../../assets/svg/photo.svg';
import styles from './avatarStyles.module.pcss';

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
    return this.compile(template, { name, iconPath: iconPath || photo, styles });
  }
}

export default Avatar;
