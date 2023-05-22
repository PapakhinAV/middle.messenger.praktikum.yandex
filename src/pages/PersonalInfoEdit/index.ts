import Block from '../../core/Block'
import template from './personalInfoEdit.hbs'
import {Button, Avatar, FileInput, LinkButton} from "../../components";
import photo from '../../assets/svg/photo.svg'
import RowInput from "../../components/RowInput";
import {ERoutes} from "../../ERoutes";
class Authorization extends Block {
    constructor() {
        super('main', {});
        this.element?.classList.add("personalInfoEdit__wrapper")
    }

    init(){
        this.children.avatar = new Avatar({
            text: 'Иван',
            iconPath: photo,
        })
        this.children.fileInput = new FileInput({
            text: 'Обновить фото',
            name: 'avatar',
        })
        this.children.email = new RowInput({
            placeholder: 'Почта',
            name: 'email',
            value: 'pochta@yandex.ru',
            type: 'email'
        })
        this.children.login = new RowInput({
            placeholder: 'Логин',
            value: 'ivanivanov',
            name: 'login',
            type: 'text'
        })
        this.children.firstName = new RowInput({
            placeholder: 'Имя',
            value: 'Иван',
            name: 'first_name',
            type: 'text'
        })
        this.children.secondName = new RowInput({
            placeholder: 'Фамилия',
            value: 'Иванов',
            name: 'second_name',
            type: 'text'
        })
        this.children.chatName = new RowInput({
            placeholder: 'Имя в чате',
            value: 'Иван',
            name: 'display_name',
            type: 'text'
        })
        this.children.phone = new RowInput({
            placeholder: 'Телефон',
            value: '+7 (909) 967 30 30',
            name: 'phone',
            type: 'tel'
        })

        this.children.oldPassword = new RowInput({
            placeholder: 'Пароль',
            value: '+7 (909) 967 30 30',
            name: 'oldPassword',
            type: 'password'
        })
        this.children.newPassword = new RowInput({
            value: '+7 (909) 967 30 30',
            name: 'newPassword',
            type: 'password'
        })
        this.children.saveButton = new Button({
            text: 'Сохранить',
            type: 'submit',
        })
        this.children.backButton = new LinkButton({
            text: 'Назад',
            link: ERoutes.PROFILE,
        })
    }

    render(){
        return this.compile(template, this.props)
    }
}

export default Authorization
