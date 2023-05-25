import Block from '../../core/Block'
import template from './homePage.hbs'
import LinkButton from "../../components/LinkButton";
import arrowRightBase from '../../assets/svg/arrowRightBase.svg';
import {ERoutes} from "../../ERoutes";
class HomePage extends Block {
    constructor() {
        super( {});
    }
    init(){
        this.children.lkButton = new LinkButton({
            text: 'Профиль',
            link: ERoutes.PROFILE,
            iconPath: arrowRightBase
        });
    }

    render(){
        return this.compile(template, this.props)
    }

}

export default HomePage
