import Block from '../../core/Block';
import ErrorPageContent from '../../components/ErrorPageContent';
import template from './page404.hbs';
import { ERoutes } from '../../core/Router/ERoutes';

class page404 extends Block {
  constructor() {
    super({});
    this.element?.setAttribute('style', 'height: 100%');
  }

  init() {
    this.children.page404 = new ErrorPageContent({
      title: '404',
      description: 'Не туда попали',
      buttonLink: ERoutes.HOME,
      buttonText: 'Назад',
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}

export default page404;
