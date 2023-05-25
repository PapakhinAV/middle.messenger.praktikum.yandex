import Block from '../../core/Block'
import ErrorPageContent from "../../components/ErrorPageContent";
import template from './page500.hbs'
import {ERoutes} from "../../ERoutes";
class page404 extends Block {
    constructor() {
        super({});
        this.element?.setAttribute('style', 'height: 100%')
    }

    init(){
        this.children.page500 = new ErrorPageContent({
            title: '500',
            description: 'Скоро починим...',
            buttonLink: ERoutes.HOME,
            buttonText: 'Назад к чатам',
        });
    }

    render(){
        return this.compile(template, this.props)
    }

}

export default page404
