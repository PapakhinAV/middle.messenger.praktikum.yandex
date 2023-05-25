import Block from '../../core/Block'
import template from './personalInfoEdit.hbs'
import {Button, Avatar, FileInput, LinkButton} from "../../components";
import photo from '../../assets/svg/photo.svg'
import RowInput from "../../components/RowInput";
import {ERoutes} from "../../ERoutes";
import {submitValidator} from "../../utils/submitValidator";
import {getFormValue} from "../../utils/getFormValue";
import {validators} from "../../utils/validators";
class Authorization extends Block {
    constructor() {
        super({});
    }

    init(){
        this.children.photo = new Avatar({
            text: 'Иван',
            iconPath: photo,
        })
        this.children.avatar = new FileInput({
            text: 'Обновить фото',
            name: 'avatar',
        })
        this.children.email = new RowInput({
            placeholder: 'Почта',
            name: 'email',
            value: 'pochta@yandex.ru',
            type: 'email',
            required: true,
            events: {
                focusout: (e)=>validators.email(e, this.children.email),
                change: (e)=> this.children.email.setProps({value:(e.target as HTMLInputElement)?.value})
            }
        })
        this.children.login = new RowInput({
            placeholder: 'Логин',
            value: 'ivanivanov',
            name: 'login',
            type: 'text',
            required: true,
            events: {
                focusout: (e)=>validators.login(e, this.children.login),
                change: (e)=> this.children.login.setProps({value:(e.target as HTMLInputElement)?.value})
            }
        })
        this.children.firstName = new RowInput({
            placeholder: 'Имя',
            value: 'Иван',
            name: 'first_name',
            type: 'text',
            required: true,
            events: {
                focusout: (e)=>validators.name(e, this.children.firstName),
                change: (e)=> this.children.firstName.setProps({value:(e.target as HTMLInputElement)?.value})
            }
        })
        this.children.secondName = new RowInput({
            placeholder: 'Фамилия',
            value: 'Иванов',
            name: 'second_name',
            type: 'text',
            required: true,
            events: {
                focusout: (e)=>validators.name(e, this.children.secondName),
                change: (e)=> this.children.secondName.setProps({value:(e.target as HTMLInputElement)?.value})
            }
        })
        this.children.chatName = new RowInput({
            placeholder: 'Имя в чате',
            value: 'Иван',
            name: 'display_name',
            type: 'text',
            required: true,
            events: {
                focusout: (e)=>validators.name(e, this.children.chatName),
                change: (e)=> this.children.chatName.setProps({value:(e.target as HTMLInputElement)?.value})
            }
        })
        this.children.phone = new RowInput({
            placeholder: 'Телефон',
            value: '+7 (909) 967 30 30',
            name: 'phone',
            type: 'tel',
            required: true,
            events: {
                focusout: (e)=>validators.phone(e, this.children.phone),
                change: (e)=> this.children.phone.setProps({value:(e.target as HTMLInputElement)?.value})
            }
        })

        this.children.oldPassword = new RowInput({
            placeholder: 'Пароль',
            value: '+7 (909) 967 30 30',
            name: 'oldPassword',
            type: 'password',
            required: true,
            events: {
                focusout: (e)=>validators.password(e, this.children.oldPassword),
                change: (e)=> this.children.oldPassword.setProps({value:(e.target as HTMLInputElement)?.value})
            }
        })
        this.children.newPassword = new RowInput({
            value: '+7 (909) 967 30 30',
            name: 'newPassword',
            type: 'password',
            required: true,
            events: {
                focusout: (e)=>validators.password(e, this.children.newPassword),
                change: (e)=> this.children.newPassword.setProps({value:(e.target as HTMLInputElement)?.value})
            }
        })
        this.children.saveButton = new Button({
            text: 'Сохранить',
            type: 'submit',
            events: {
                click: (e)=> {
                    e.preventDefault()
                    const errors = submitValidator(this.children)
                    if(!errors){
                        console.log(getFormValue(this.children))
                        setTimeout(()=> window.location.pathname = ERoutes.PROFILE, 3000)
                    }
                }
            }
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
