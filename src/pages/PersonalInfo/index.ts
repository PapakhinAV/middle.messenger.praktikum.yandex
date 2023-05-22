import Block from '../../core/Block'
import template from './personalInfo.hbs'
import {LinkButton, Button, Avatar} from "../../components";
import {ERoutes} from "../../ERoutes";
import photo from '../../assets/svg/photo.svg'
import RowInfo from "../../components/RowInfo";
class Authorization extends Block {
    constructor() {
        super('main', {});
        this.element?.classList.add("personalInfo__wrapper")
    }
    init(){
        this.children.avatar = new Avatar({
            text: 'Иван',
            iconPath: photo,
        })
        this.children.email = new RowInfo({
            label: 'Почта',
            value: 'pochta@yandex.ru',
        })
        this.children.login = new RowInfo({
            label: 'Логин',
            value: 'ivanivanov',
        })
        this.children.firstName = new RowInfo({
            label: 'Имя',
            value: 'Иван',
        })
        this.children.secondName = new RowInfo({
            label: 'Фамилия',
            value: 'Иванов',
        })
        this.children.chatName = new RowInfo({
            label: 'Имя в чате',
            value: 'Иван',
        })
        this.children.phone = new RowInfo({
            label: 'Телефон',
            value: '+7 (909) 967 30 30',
        })
        this.children.editButton = new LinkButton({
            text: 'Изменить данные',
            link: ERoutes.PROFILE_EDIT,
        })
        this.children.exitButton = new LinkButton({
            text: 'Выйти',
            link: ERoutes.LOGIN,
        })
    }

    render(){
        return this.compile(template, this.props)
    }

}

export default Authorization
